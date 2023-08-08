import { CurrentUnits, MultimeterMeasurementTypes, PotentialUnits } from "../../../../../../../../constants/global";

export class ValueConverter {
    constructor(unitConverter) {
        this.unitConverter = unitConverter
    }

    _roundFloat(number) {
        const num = Math.abs(number)
        if (num < 10)
            return Number(number.toFixed(3))
        else if (num < 100)
            return Number(number.toFixed(2))
        else if (num < 1000)
            return Number(number.toFixed(1))
        else return Math.floor(number)
    }

    _roundMilivolts(number) {
        return Number(number.toFixed(1))
    }

    execute(measurementType, value) {
        switch (measurementType) {
            case MultimeterMeasurementTypes.POTENTIALS:
            case MultimeterMeasurementTypes.CURRENT:
            case MultimeterMeasurementTypes.VOLTAGE:
                return this._roundFloat(value)
            case MultimeterMeasurementTypes.VOLTAGE_DROP:
                return this._roundMilivolts(this.unitConverter.convertVolts(value, PotentialUnits.VOLTS, PotentialUnits.MILIVOLTS))
            case MultimeterMeasurementTypes.COUPON_CURRENT:
                return Math.floor(this.unitConverter.convertAmps(value, CurrentUnits.AMPS, CurrentUnits.MICRO_AMPS))
            default:
                return value
        }
    }
}