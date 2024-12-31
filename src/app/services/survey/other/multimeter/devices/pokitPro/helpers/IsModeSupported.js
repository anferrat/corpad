import { MultimeterCurrentRanges, MultimeterModes } from "../../../../../../../../constants/global"

export class isModeSupported {
    constructor(constants) {
        this.constants = constants
        this.currentRanges = [MultimeterCurrentRanges.POKIT.AUTO, MultimeterCurrentRanges.POKIT._10A, MultimeterCurrentRanges.POKIT._3A]
    }

    isSupported(toggleStatus, mode, range) {
        if (mode === MultimeterModes.POKIT.IDLE)
            return true
        switch (toggleStatus) {
            case this.constants.toggleStatuses.VOLTAGE:
                return (
                    mode === MultimeterModes.POKIT.DC_VOLTS ||
                    mode === MultimeterModes.POKIT.AC_VOLTS
                )
            case this.constants.toggleStatuses.SMALL_CURRENT:
                return (
                    (mode === MultimeterModes.POKIT.AC_AMPS ||
                        mode === MultimeterModes.POKIT.DC_AMPS) && range && !~this.currentRanges.indexOf(range)
                )
            case this.constants.toggleStatuses.CURRENT:
                return (
                    (mode === MultimeterModes.POKIT.AC_AMPS ||
                        mode === MultimeterModes.POKIT.DC_AMPS) && range && ~this.currentRanges.indexOf(range)
                )
            default:
                return false
        }
    }

    execute(toggleStatus, mode, range) {
        const isSupported = this.isSupported(toggleStatus, mode, range)
        if (!isSupported)
            throw this.constants.errors.TOGGLE_POSITION
    }
}