import { Potential } from "../../../../entities/survey/subitems/Potential"

export class UpdatePotentialList {
    constructor(potentialRepo, potentialPresenter, convertPotentialUnits) {
        this.potentialRepo = potentialRepo
        this.potentialPresenter = potentialPresenter
        this.convertPotentialUnits = convertPotentialUnits
    }

    async execute({ potentials, referenceCells, potentialTypes, unit }, subitemId) {
        const newPotentials = potentials.map(({ id, uid, potentialTypeId, isPortable, referenceCellId, value, prevValue }) =>
            new Potential(id, uid, subitemId, value, potentialTypeId, referenceCellId, isPortable, prevValue))
        const convertedPotentials = this.convertPotentialUnits.execute(newPotentials, unit, true)
        const result = await this.potentialRepo.updateList(convertedPotentials, subitemId)
        const convertedToOriginal = this.convertPotentialUnits.execute(result, unit, false)
        return this.potentialPresenter.executeWithList(convertedToOriginal, potentialTypes, referenceCells, unit)
    }
}