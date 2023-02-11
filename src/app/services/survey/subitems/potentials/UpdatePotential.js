import { PotentialUnits } from "../../../../entities/survey/other/properties"
import { Potential } from "../../../../entities/survey/subitems/Potential"

export class UpdatePotential {
    constructor (potentialRepo, unitConverter, potentialPresenter) {
        this.potentialRepo = potentialRepo
        this.unitConverter = unitConverter
        this.potentialPresenter = potentialPresenter
    }

    async execute(id, value, unit) {
        const currentTime = Date.now()
        const convertedValue = this.unitConverter.convertVolts(value, unit, PotentialUnits.VOLTS)
        const potential = new Potential(id, null, null, convertedValue, null, null, false)
        return this.potentialPresenter.executeWithUpdate(await this.potentialRepo.update(potential, currentTime), currentTime)
    }
}