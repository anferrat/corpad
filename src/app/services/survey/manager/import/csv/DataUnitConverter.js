import { Coupon } from "../../../../../entities/survey/subitems/Coupon"
import { Bond } from "../../../../../entities/survey/subitems/Bond"
import { Shunt } from "../../../../../entities/survey/subitems/Shunt"
import { SubitemTypes } from "../../../../../entities/survey/subitems/Subitem"
import { Circuit } from "../../../../../entities/survey/subitems/Circuit"
import { Potential } from "../../../../../entities/survey/subitems/Potential"

export class DataUnitConverter {
    constructor (unitConverter) {
        this.unitConverter = unitConverter
    }

    executeForSubitem(subitemData) {
        const { type } = subitemData
        switch (type) {
            case SubitemTypes.COUPON:
                return {
                    area: this.unitConverter.convertArea(subitemData.area, subitemData.areaUnit, Coupon.areaUnit),
                    current: this.unitConverter.convertAmps(subitemData.current, subitemData.currentUnit, Coupon.currentUnit),
                }
            case SubitemTypes.CIRCUIT:
                return {
                    voltage: this.unitConverter.convertVolts(subitemData.voltage, subitemData.voltageUnit, Circuit.voltageUnit),
                    current: this.unitConverter.convertAmps(subitemData.current, subitemData.currentUnit, Circuit.currentUnit)
                }
            case SubitemTypes.BOND:
                return {
                    current: this.unitConverter.convertAmps(subitemData.current, subitemData.currentUnit, Bond.currentUnit)
                }
            case SubitemTypes.SHUNT:
                return {
                    factor: this.unitConverter.convertFactor(subitemData.factor, subitemData.factorUnit, Shunt.factorUnit)
                }
            default: return {}
        }
    }

    executeForPotential(value, unit) {
        return this.unitConverter.convertVolts(value, unit, Potential.unit)
    }
}