import { Potential } from "../../../../entities/survey/subitems/Potential"

export class UpdatePotential {
    constructor(potentialRepo, potentialPresenter, convertPotentialUnits) {
        this.potentialRepo = potentialRepo
        this.potentialPresenter = potentialPresenter
        this.convertPotentialUnits = convertPotentialUnits
    }

    async execute(id, value, unit, isAc) {
        const currentTime = Date.now()
        //Please note that potentialRepo.update can only update potential value, other properties are fixed set
        const potential = new Potential(id, null, null, value, null, null, false, null)
        const convertedPotential = this.convertPotentialUnits.executeSingle(potential, unit, isAc, true)
        return this.potentialPresenter.executeWithUpdate(await this.potentialRepo.update(convertedPotential, currentTime), currentTime)
    }
}