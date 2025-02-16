import { MeasurementPropertyTypes, MultimeterCurrentRanges, MultimeterModes, MultimeterTypes, MultimeterVoltageRanges } from "../../../../../../constants/global"


export class MultimeterPropertyCaptureParameters {
    constructor() {
        this.params = {
            [MeasurementPropertyTypes.POTENTIAL]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.DC_VOLTS,
                    range: MultimeterVoltageRanges.POKIT._2V
                },
                [MultimeterTypes.DVM2130]: {
                    mode: MultimeterModes.DVM2130.DC_VOLTS,
                    range: MultimeterVoltageRanges.DVM2130._5V
                }
            },
            [MeasurementPropertyTypes.POTENTIAL_AC]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.AC_VOLTS,
                    range: MultimeterVoltageRanges.POKIT._10V
                },
                [MultimeterTypes.DVM2130]: {
                    mode: MultimeterModes.DVM2130.AC_VOLTS,
                    range: MultimeterVoltageRanges.DVM2130._5V
                }
            },
            [MeasurementPropertyTypes.VOLTAGE]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.DC_VOLTS,
                    range: MultimeterVoltageRanges.POKIT._2V
                },
                [MultimeterTypes.DVM2130]: {
                    mode: MultimeterModes.DVM2130.DC_VOLTS,
                    range: MultimeterVoltageRanges.DVM2130._5V
                }
            },
            [MeasurementPropertyTypes.COUPON_CURRENT]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.DC_AMPS,
                    range: MultimeterCurrentRanges.POKIT._500uA
                },
                [MultimeterTypes.DVM2130]: {
                    mode: undefined,
                    range: undefined
                }
            },
            [MeasurementPropertyTypes.COUPON_CURRENT_AC]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.AC_AMPS,
                    range: MultimeterCurrentRanges.POKIT.AUTO
                },
                [MultimeterTypes.DVM2130]: {
                    mode: undefined,
                    range: undefined
                }
            },
            [MeasurementPropertyTypes.VOLTAGE_DROP]: {
                [MultimeterTypes.POKIT]: {
                    mode: MultimeterModes.POKIT.DC_VOLTS,
                    range: MultimeterVoltageRanges.POKIT._250MV
                },
                [MultimeterTypes.DVM2130]: {
                    mode: MultimeterModes.DVM2130.DC_VOLTS,
                    range: MultimeterVoltageRanges.DVM2130._5V
                }
            }
        }
    }

    getSupportedTypes(multimeterType) {
        return Object.keys(this.params).filter(key => {  
            return Boolean(this.params[key][multimeterType].mode) })
    }
}