import { Potential } from "../../../../entities/survey/subitems/Potential";
import { PotentialUnits } from "../../../../entities/survey/other/properties";

export class UpdatePotentialList {
    constructor (potentialRepo, unitConverter) {
        this.potentialRepo = potentialRepo
        this.unitConverter = unitConverter
    }

    async execute(potentialData, subitemId, unit) {
        const potentials = potentialData.map(({ id, uid, potentialTypeId, isPortable, referenceCellId, value }) => {
            const convertedValue = this.unitConverter.convertVolts(value, unit, PotentialUnits.VOLTS)
            return new Potential(id, uid, subitemId, convertedValue, potentialTypeId, referenceCellId, isPortable)
        })
        await this.potentialRepo.updateList(potentials)
    }
}