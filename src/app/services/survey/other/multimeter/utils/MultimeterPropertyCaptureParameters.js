import { MeasurementPropertyTypes, MultimeterCurrentRanges, MultimeterModes, MultimeterTypes, MultimeterVoltageRanges } from "../../../../../../constants/global"


export class MultimeterPropertyCaptureParameters {
    constructor() {
        this.params = {
            [MeasurementPropertyTypes.POTENTIAL]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.DC_VOLTS,
                    range: MultimeterVoltageRanges.POKIT._2V
                }
            },
            [MeasurementPropertyTypes.POTENTIAL_AC]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.AC_VOLTS,
                    range: MultimeterVoltageRanges.POKIT._10V
                }
            },
            [MeasurementPropertyTypes.VOLTAGE]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.DC_VOLTS,
                    range: MultimeterVoltageRanges.POKIT.AUTO
                }
            },
            [MeasurementPropertyTypes.COUPON_CURRENT]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.DC_AMPS,
                    range: MultimeterCurrentRanges.POKIT._500uA
                }
            },
            [MeasurementPropertyTypes.COUPON_CURRENT_AC]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.AC_AMPS,
                    range: MultimeterCurrentRanges.POKIT.AUTO
                }
            },
            [MeasurementPropertyTypes.VOLTAGE_DROP]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.DC_VOLTS,
                    range: MultimeterVoltageRanges.POKIT._2V
                }
            }
        }
    }

    getSupportedTypes(multimeterType) {
        return Object.keys(this.params).filter(key => Boolean(this.params[key][multimeterType]))
    }
}