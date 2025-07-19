import { PotentialUnits } from "../../../../../constants/global"
import { Potential } from "../../../../entities/survey/subitems/Potential"

export class ConvertPotentialUnits {
    constructor(unitConverter) {
        this.unitConverter = unitConverter
    }

    _getCorrectedUnit(unit) {
        if (unit === PotentialUnits.NEGATIVE_MILIVOLTS)
            return PotentialUnits.MILIVOLTS
        else if (unit === PotentialUnits.NEGATIVE_VOLTS)
            return PotentialUnits.VOLTS
        else return unit
    }

    _convertValue(value, unit, toDefault, isAc) {
        const correctedUnit = isAc ? this._getCorrectedUnit(unit) : unit
        const inputUnit = toDefault ? correctedUnit : Potential.unit
        const targetUnit = toDefault ? Potential.unit : correctedUnit
        return this.unitConverter.convertVolts(value, inputUnit, targetUnit)
    }
    //potentials unit is controlled app wide

    execute(potentials, unit, acTypeId, toDefault = true) {
        console.log(acTypeId)
        return potentials.map(({ id, uid, subitemId, value, potentialType, referenceCellId, isPortableReference, prevValue }) => {
            const isAc = acTypeId === potentialType
            return new Potential(id, uid, subitemId,
                this._convertValue(value, unit, toDefault, isAc),
                potentialType, referenceCellId, isPortableReference,
                this._convertValue(prevValue, unit, toDefault, isAc))
        })
    }

    executeSingle(potential, unit, isAc, toDefault = true) {
        const { id, uid, subitemId, value, potentialType, referenceCellId, isPortableReference, prevValue } = potential
        return new Potential(id, uid, subitemId,
            this._convertValue(value, unit, toDefault, isAc),
            potentialType,
            referenceCellId,
            isPortableReference,
            this._convertValue(prevValue, unit, toDefault, isAc))
    }
}