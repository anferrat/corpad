import { Potential } from "../../../../entities/survey/subitems/Potential"

export class ConvertPotentialUnits {
    constructor(unitConverter) {
        this.unitConverter = unitConverter
    }

    _convertValue(value, unit, toDefault) {
        return this.unitConverter.convertVolts(value, toDefault ? unit : Potential.unit, toDefault ? Potential.unit : unit)
    }
    //potentials unit is controlled app wide

    execute(potentials, unit, toDefault = true) {
        return potentials.map(({ id, uid, subitemId, value, potentialType, referenceCellId, isPortableReference, prevValue }) =>
            new Potential(id, uid, subitemId,
                this._convertValue(value, unit, toDefault),
                potentialType, referenceCellId, isPortableReference,
                this._convertValue(prevValue, unit, toDefault)))
    }

    executeSingle(potential, unit, toDefault = true) {
        const { id, uid, subitemId, value, potentialType, referenceCellId, isPortableReference, prevValue } = potential
        return new Potential(id, uid, subitemId,
            this._convertValue(value, unit, toDefault),
            potentialType,
            referenceCellId,
            isPortableReference,
            this._convertValue(prevValue, unit, toDefault))
    }
}