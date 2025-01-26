import { MeasurementPropertyTypes, MultimeterMeasurementTypes, MultimeterReadingTypes, PotentialUnits } from "../../../../../../constants/global"
import { Reading } from "../../../../../entities/survey/multimeter/Reading"

export class ReadingConverter {
    constructor(unitConverter) {
        this.unitConverter = unitConverter
    }

    _getNumberOfDigist(outputUnit, measurementType) {
        switch (measurementType) {
            case MeasurementPropertyTypes.POTENTIAL:
            case MeasurementPropertyTypes.POTENTIAL_AC:
                switch (outputUnit) {
                    case PotentialUnits.VOLTS:
                    case PotentialUnits.NEGATIVE_VOLTS:
                        return 3
                    default:
                        return 0
                }
            case MeasurementPropertyTypes.VOLTAGE:
                switch (outputUnit) {
                    case PotentialUnits.VOLTS:
                    case PotentialUnits.NEGATIVE_VOLTS:
                        return 1
                    default:
                        return 0
                }
            case MeasurementPropertyTypes.VOLTAGE_DROP:
                switch (outputUnit) {
                    case PotentialUnits.VOLTS:
                    case PotentialUnits.NEGATIVE_VOLTS:
                        return 3
                    default:
                        return 1
                }
            case MeasurementPropertyTypes.COUPON_CURRENT:
            case MeasurementPropertyTypes.COUPON_CURRENT_AC:
                return 0
            default:
                return 0

        }

    }

    _convertValue(value, type, inputUnit, outputUnit, measurementType) {
        switch (type) {
            case MultimeterReadingTypes.VOLTAGE:
                return this.unitConverter.convertVolts(value, inputUnit, outputUnit, this._getNumberOfDigist(outputUnit, measurementType))
            case MultimeterReadingTypes.CURRENT:
                return this.unitConverter.convertAmps(value, inputUnit, outputUnit, this._getNumberOfDigist(outputUnit, measurementType))
            default:
                return value
        }
    }


    execute(reading, outputUnit, measurementType) {
        if (reading instanceof Reading) {
            const { id, value, deviceTimestamp, type, unit, flag, isAc, deviceType } = reading
            const newValue = this._convertValue(value, type, unit, outputUnit, measurementType)
            return new Reading(id, newValue, deviceTimestamp, type, unit, flag, isAc, deviceType)
        }
        else
            return reading
    }
}