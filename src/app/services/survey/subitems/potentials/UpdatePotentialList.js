import { PermanentPotentialTypes } from "../../../../../constants/global"
import { Potential } from "../../../../entities/survey/subitems/Potential"

export class UpdatePotentialList {
    constructor(potentialRepo, potentialPresenter, convertPotentialUnits) {
        this.potentialRepo = potentialRepo
        this.potentialPresenter = potentialPresenter
        this.convertPotentialUnits = convertPotentialUnits
    }

    _getAcTypeId(potentialTypes) {
        const index = potentialTypes.findIndex(({ type }) => type === PermanentPotentialTypes.AC)
        return ~index ? potentialTypes[index].id : null
    }

    async execute({ potentials, referenceCells, potentialTypes, unit }, subitemId) {
        const newPotentials = potentials.map(({ id, uid, potentialTypeId, isPortable, referenceCellId, value, prevValue }) =>
            new Potential(id, uid, subitemId, value, potentialTypeId, referenceCellId, isPortable, prevValue))
        const acTypeId = this._getAcTypeId(potentialTypes)
        const convertedPotentials = this.convertPotentialUnits.execute(newPotentials, unit, acTypeId, true)
        const result = await this.potentialRepo.updateList(convertedPotentials, subitemId)
        const convertedToOriginal = this.convertPotentialUnits.execute(result, unit, acTypeId, false)
        return this.potentialPresenter.executeWithList(convertedToOriginal, potentialTypes, referenceCells, unit)
    }
}