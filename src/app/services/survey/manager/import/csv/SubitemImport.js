import { Potential } from "../../../../../entities/survey/subitems/Potential"
import { SubitemTypes } from "../../../../../../constants/global"
import { guid } from "../../../../../utils/guid"

// first order subitems are getting imported first, to retrive id's for the second order subitems (shunts, bonds etc.)

export class SubitemImport {
    constructor(subitemRepository, potentialRepository, subitemFactory, dataUnitConverter) {
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
                //Convert units to standard for the subitem
                //Convert keys to ids of corresponding subitems. Ids are stored in keyMap
                const convertedUnits = this.dataUnitConverter.executeForSubitem(subitemData)
                const convertedKeys = this.convertKeys(subitemData, keyMap)

                //generate subitem from converted data
                const uid = guid()
                const { name, type, anodeMaterial, wireGauge, wireColor, fromAtoB, current, sideA, sideB, ratioCurrent, ratioVoltage, targetMin, targetMax, voltage, voltageDrop, pipelineCardId, couponType, density, area, isolationType, shorted, pipelineId, rcType, nps, factor, factorSelected, description } = { ...subitemData, ...convertedUnits, ...convertedKeys }
                const subitem = this.subitemFactory.execute(null, uid, name, type, itemId, anodeMaterial, wireGauge, wireColor, fromAtoB, current, sideA, sideB, ratioCurrent, ratioVoltage, targetMin, targetMax, voltage, voltageDrop, pipelineCardId, couponType, density, area, isolationType, shorted, pipelineId, rcType, nps, factor, factorSelected, description, null, null)
                subitem.calculate()

                //generate potentails from data and pass down to potentias import
                const { key, potentials } = subitemData
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
                const potential = new Potential(null, guid(), subitemId, this.dataUnitConverter.executeForPotential(value, unit), potentialTypeId, referenceCellId, true, null)
                return this.potentialRepository.create(potential)
            }
            catch (err) {
                return null
            }
        }))
    }
}