import { ReferenceCell } from "../entities/survey/other/ReferenceCell"

//there are two classes of reference cells - portable reference (ReferenceCell) and Stationary reference (StatReferenceCell).

export class PotentialPresenter {
    constructor () { }

    _getRefCell(id, isPortable, refCellList) {
        const isPortableRef = (item) => item instanceof ReferenceCell
        return refCellList.find(item => item.id === id && isPortableRef(item) === isPortable) ?? { name: 'Error', rcType: null }
    }

    _getPotentialType(id, potentialTypeList) {
        return potentialTypeList.find(item => item.id === id) ?? { name: 'Error' }
    }

    executeWithList(potentials, potentialTypes, referenceCells, unit) {
        return {
            potentialTypes: potentialTypes.map(pt => ({ ...pt })),
            referenceCells: referenceCells.map(rc => ({ ...rc, isPortable: rc instanceof ReferenceCell })),
            unit: unit,
            potentials: potentials.map(({ id, uid, value, referenceCellId, potentialType, isPortableReference }) => {
                const referenceCell = this._getRefCell(referenceCellId, isPortableReference, referenceCells)
                const potType = this._getPotentialType(potentialType, potentialTypes)
                return ({
                    id: id,
                    uid: uid,
                    name: potType.name,
                    potentialTypeId: potentialType,
                    referenceCellId: referenceCellId,
                    referenceCellName: referenceCell.name,
                    referenceCellType: referenceCell.rcType,
                    isPortable: isPortableReference,
                    value: value,
                    valid: true,
                })
            })
        }
    }


    execute(potential, potType, referenceCell) {
        const { id, uid, value, referenceCellId, potentialType, isPortableReference } = potential
        return ({
            id: id,
            uid: uid,
            name: potType.name,
            potentialTypeId: potentialType,
            referenceCellId: referenceCellId,
            referenceCellName: referenceCell.name,
            referenceCellType: referenceCell.rcType,
            isPortable: isPortableReference,
            value: value,
            valid: true,
        })
    }

    executeWithUpdate(potential, timeModified) {
        return {
            potential: { ...potential },
            timeModified: timeModified,
        }
    }
}