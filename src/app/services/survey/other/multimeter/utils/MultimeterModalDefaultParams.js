import { MultimeterCurrentRanges, MultimeterModes, MultimeterToggleStatuses, MultimeterTypes, MultimeterVoltageRanges } from "../../../../../../constants/global";
import { Error, errors } from "../../../../../utils/Error";

export class MultimeterModalDefaultParams {
    constructor() {
    }

    getDefaultParameters(multimeterType, toggleStatus) {
        switch (multimeterType) {
            case MultimeterTypes.POKIT:
                switch (toggleStatus) {
                    case MultimeterToggleStatuses.POKIT.VOLTAGE:
                        return {
                            mode: MultimeterModes.POKIT.DC_VOLTS,
                            range: MultimeterVoltageRanges.POKIT.AUTO
                        }
                    case MultimeterToggleStatuses.POKIT.SMALL_CURRENT:
                        return {
                            mode: MultimeterModes.POKIT.DC_AMPS,
                            range: MultimeterVoltageRanges.POKIT.AUTO
                        }
                    case MultimeterToggleStatuses.POKIT.LARGE_CURRENT:
                        return {
                            mode: MultimeterModes.POKIT.DC_AMPS,
                            range: MultimeterVoltageRanges.POKIT.AUTO
                        }
                    default:
                        throw new Error(errors.MULTIMETER, 'Unable to get default parameters', 'Toggle status is unknown')
                }
            default:
                throw new Error(errors.MULTIMETER, 'Unable to get default parameters', 'Multimeter type is not supported')
        }
    }

    getAvailableParameters(multimeterType, toggleStatus) {
        switch (multimeterType) {
            case MultimeterTypes.POKIT:
                switch (toggleStatus) {
                    case MultimeterToggleStatuses.POKIT.VOLTAGE:
                        const values = Object.values(MultimeterVoltageRanges.POKIT)
                        const auto = values.pop()
                        return {
                            modes: [MultimeterModes.POKIT.DC_VOLTS, MultimeterModes.POKIT.AC_VOLTS],
                            ranges: [auto, ...values]
                        }
                    case MultimeterToggleStatuses.POKIT.SMALL_CURRENT:

                        return {
                            modes: [MultimeterModes.POKIT.DC_AMPS, MultimeterModes.POKIT.AC_AMPS],
                            ranges: [MultimeterCurrentRanges.POKIT.AUTO, MultimeterCurrentRanges.POKIT._500uA, MultimeterCurrentRanges.POKIT._2mA, MultimeterCurrentRanges.POKIT._10mA, MultimeterCurrentRanges.POKIT._125mA, MultimeterCurrentRanges.POKIT._300mA]
                        }
                    case MultimeterToggleStatuses.POKIT.LARGE_CURRENT:
                        return {
                            modes: [MultimeterModes.POKIT.DC_AMPS, MultimeterModes.POKIT.AC_AMPS],
                            ranges: [MultimeterCurrentRanges.POKIT.AUTO, MultimeterCurrentRanges.POKIT._3A, MultimeterCurrentRanges.POKIT._10A,]
                        }
                    default:
                        throw new Error(errors.MULTIMETER, 'Unable to get default parameters', 'Toggle status is unknown')
                }
            default:
                throw new Error(errors.MULTIMETER, 'Unable to get default parameters', 'Multimeter type is not supported')
        }
    }


}