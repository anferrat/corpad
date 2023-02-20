import { Potential } from "../../../../entities/survey/subitems/Potential"
import { SubitemTypes } from "../../../../entities/survey/subitems/Subitem"
import { guid } from "../../../../utils/guid"

// first order subitems are getting imported first, to retrive id's for the second order subitems (shunts, bonds etc.)

export class SubitemImport {
    constructor (subitemRepository, potentialRepository, subitemFactory, dataUnitConverter) {
        this.subitemRepository = subitemRepository
        this.potentialRepository = potentialRepository
        this.subitemFactory = subitemFactory
        this.dataUnitConverter = dataUnitConverter
        this.FIRST_ORDER = [SubitemTypes.ANODE, SubitemTypes.CIRCUIT, SubitemTypes.PIPELINE, SubitemTypes.REFERENCE_CELL, SubitemTypes.RISER, SubitemTypes.STRUCTURE, SubitemTypes.TEST_LEAD]
    }

    async execute(subitems, itemId) {
        const firstOrderList = []
        const secondOrderList = []
        const keyMap = new Map()

        subitems.forEach((subitem) => {
            const { type } = subitem
            if (~this.FIRST_ORDER.indexOf(type))
                firstOrderList.push(subitem)
            else secondOrderList.push(subitem)
        })

        return [
            ...(await this.subitemImport(firstOrderList, itemId, keyMap)),
            ...(await this.subitemImport(secondOrderList, itemId, keyMap))
        ]
    }

    async subitemImport(subitems, itemId, keyMap) {
        const warnings = []
        await Promise.all(subitems.map(async subitemData => {
            try {
                const uid = guid()
                const { name, type, key, potentials } = subitemData
                const convertedUnits = this.dataUnitConverter.executeForSubitem(subitemData)
                const convertedKeys = this.convertKeys(subitemData, keyMap)
                const subitem = this.subitemFactory.execute(null, uid, name, type, itemId, { ...subitemData, ...convertedUnits, ...convertedKeys })
                subitem.calculate()
                const { id } = await this.subitemRepository.create(subitem)
                await this.potentialImport(potentials, id)
                keyMap.set(key, id)
                return
            }
            catch (err) {
                warnings.push({
                    type: subitemData?.type,
                    originalValue: subitemData,
                    convertedValue: null,
                    warningCode: 'subitemImport'
                })
                return
            }
        }))
        return warnings
    }

    convertKeys(subitemData, keyMap) {
        const { sideA, sideB, pipelineCardKey } = subitemData
        if (sideA && sideB) {
            const convertSide = (side, keyMap) =>
                side.map(key => keyMap.get(key))
                    .filter(id => id !== undefined)
            return {
                sideA: convertSide(sideA, keyMap),
                sideB: convertSide(sideB, keyMap)
            }
        }
        else if (pipelineCardKey) {
            return {
                pipelineCardId: keyMap.get(pipelineCardKey) ?? null
            }
        }
        else return {}
    }

    async potentialImport(potentials, subitemId) {
        if (!potentials)
            return
        await Promise.all(potentials.map(({ value, unit, potentialTypeId, referenceCellId }) => {
            try {
                const potential = new Potential(null, guid(), subitemId, this.dataUnitConverter.executeForPotential(value, unit), potentialTypeId, referenceCellId, true)
                return this.potentialRepository.create(potential)
            }
            catch (err) {
                return null
            }
        }))
    }
}