import { Potential } from "../../../../entities/survey/subitems/Potential"
import { PotentialUnits } from "../../../../../constants/global"

export class UpdatePotentialList {
    constructor(potentialRepo, unitConverter, potentialPresenter) {
        this.potentialRepo = potentialRepo
        this.unitConverter = unitConverter
        this.potentialPresenter = potentialPresenter
    }

    async execute({ potentials, referenceCells, potentialTypes, unit }, subitemId) {
        const convertedPotentials = potentials.map(({ id, uid, potentialTypeId, isPortable, referenceCellId, value }) => {
            const convertedValue = this.unitConverter.convertVolts(value, unit, PotentialUnits.VOLTS)
            return new Potential(id, uid, subitemId, convertedValue, potentialTypeId, referenceCellId, isPortable)
        })

        const result = await this.potentialRepo.updateList(convertedPotentials, subitemId)

        const convertedToOriginal = result.map(({ id, uid, subitemId, value, referenceCellId, potentialType, isPortableReference }) => {
            const convertedValue = this.unitConverter.convertVolts(value, PotentialUnits.VOLTS, unit)
            return new Potential(id, uid, subitemId, convertedValue, potentialType, referenceCellId, isPortableReference)
        })
        return this.potentialPresenter.executeWithList(convertedToOriginal, potentialTypes, referenceCells, unit)
    }
}