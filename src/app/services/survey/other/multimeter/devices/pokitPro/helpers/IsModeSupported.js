import { MultimeterCurrentRanges, MultimeterModes, MultimeterVoltageRanges } from "../../../../../../../../constants/global"

export class isModeSupported {
    constructor(constants) {
        this.constants = constants
        this.smallCurrentRanges = [MultimeterCurrentRanges.POKIT.AUTO, MultimeterCurrentRanges.POKIT._500uA, MultimeterCurrentRanges.POKIT._2mA, MultimeterCurrentRanges.POKIT._10mA, MultimeterCurrentRanges.POKIT._125mA, MultimeterCurrentRanges.POKIT._300mA]
        this.currentRanges = [MultimeterCurrentRanges.POKIT.AUTO, MultimeterCurrentRanges.POKIT._10A, MultimeterCurrentRanges.POKIT._3A]
        this.voltageRanges = Object.values(MultimeterVoltageRanges.POKIT)
    }

    _isIdleSettings(mode) {
        return mode === MultimeterModes.POKIT.IDLE
    }

    _isVoltageSettings(mode, range) {
        return (mode === MultimeterModes.POKIT.DC_VOLTS || mode === MultimeterModes.POKIT.AC_VOLTS) && this.voltageRanges.includes(range)
    }

    _isSmallCurrentSettings(mode, range) {
        return (mode === MultimeterModes.POKIT.AC_AMPS || mode === MultimeterModes.POKIT.DC_AMPS) && this.smallCurrentRanges.includes(range)
    }

    _isCurrentSettings(mode, range) {
        return (mode === MultimeterModes.POKIT.AC_AMPS || mode === MultimeterModes.POKIT.DC_AMPS) && this.currentRanges.includes(range)
    }

    _isValid(mode, range) {
        return this._isIdleSettings(mode) || this._isVoltageSettings(mode, range) || this._isSmallCurrentSettings(mode, range) || this._isCurrentSettings(mode, range)
    }

    isSupported(toggleStatus, mode, range) {
        if (this._isIdleSettings(mode))
            return true
        switch (toggleStatus) {
            case this.constants.toggleStatuses.VOLTAGE:
                return this._isVoltageSettings(mode, range)
            case this.constants.toggleStatuses.SMALL_CURRENT:
                return this._isSmallCurrentSettings(mode, range)
            case this.constants.toggleStatuses.CURRENT:
                return this._isCurrentSettings(mode, range)
            default:
                return false
        }
    }

    execute(toggleStatus, mode, range) {
        const isValid = this._isValid(mode, range)
        if (!isValid)
            throw this.constants.errors.SETTINGS_INVALID
        const isSupported = this.isSupported(toggleStatus, mode, range)
        if (!isSupported)
            throw this.constants.errors.TOGGLE_POSITION
    }
}