import { MultimeterModes, MultimeterToggleStatuses, MultimeterVoltageRanges } from "../../../../../../../../constants/global";

export class IsModeSupported {
    constructor() {
        this.voltageRanges = [MultimeterVoltageRanges.DVM2130._5V, MultimeterVoltageRanges.DVM2130._250V]
    }

    execute(toggleStatus, mode, range) {
        const isValid = //toggleStatus === MultimeterToggleStatuses.DVM2130.DEFAULT &&
            (mode === MultimeterModes.DVM2130.AC_VOLTS || mode === MultimeterModes.DVM2130.DC_VOLTS) &&
            this.voltageRanges.includes(range)
        return {
            isValid,
            isSupported: isValid
        }
    }
}