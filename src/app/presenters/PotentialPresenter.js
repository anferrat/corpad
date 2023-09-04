export class PotentialPresenter {
    constructor() { }

    _getRefCell(id, isPortable, refCellList) {
        return refCellList.find(item => item.id === id && item.isPortable === isPortable) ?? { name: 'Error', rcType: null }
    }

    _getPotentialType(id, potentialTypeList) {
        return potentialTypeList.find(item => item.id === id) ?? { name: 'Error' }
    }

    executeWithList(potentials, potentialTypes, referenceCells, unit) {
        return {
            potentialTypes: potentialTypes.map(pt => ({ ...pt })),
            referenceCells: referenceCells.map(rc => ({ ...rc })),
            unit: unit,
            potentials: potentials.map(({ id, uid, value, referenceCellId, potentialType, isPortableReference, prevValue }) => {
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
                    prevValue: prevValue,
                    valid: true,
                })
            })
        }
    }


    execute(potential, potType, referenceCell) {
        const { id, uid, value, referenceCellId, potentialType, isPortableReference, prevValue } = potential
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
            prevValue: prevValue
        })
    }

    executeWithUpdate(potential, timeModified) {
        return {
            potential: { ...potential },
            timeModified: timeModified,
        }
    }
}