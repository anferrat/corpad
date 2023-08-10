import { MultimeterMeasurementTypes } from "../../../../../../../../constants/global";
import { Error, errors } from "../../../../../../../utils/Error";

export class MaxRangeDetector {
    constructor(maxRangeValues) {
        this.maxRangeValues = maxRangeValues
    }

    execute(measurementType, value) {
        switch (measurementType) {
            case MultimeterMeasurementTypes.VOLTAGE:
            case MultimeterMeasurementTypes.VOLTAGE_DROP:
            case MultimeterMeasurementTypes.POTENTIALS:
            case MultimeterMeasurementTypes.POTENTIALS_AC:
                return value >= this.maxRangeValues.VOLTAGE
            case MultimeterMeasurementTypes.CURRENT:
                return value >= this.maxRangeValues.LARGE_CURRENT
            case MultimeterMeasurementTypes.COUPON_CURRENT:
            case MultimeterMeasurementTypes.COUPON_CURRENT_AC:
                return value >= this.maxRangeValues.SMALL_CURRENT
            default: throw new Error(errors.GENERAL, 'Unable to detect max range', 'No such measurement type')
        }
    }
}