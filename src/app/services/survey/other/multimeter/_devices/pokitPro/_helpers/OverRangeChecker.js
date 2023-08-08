import { MULTIMETER_SETTING_DATA } from "../constants/bytes";

export class OverRangeChecker {
    constructor() {
    }

    _isOverRangeBySetting(byteSetting, value) {
        const v = Math.abs(value)
        switch (byteSetting) {
            case MULTIMETER_SETTING_DATA.AC_CURRENT:
            case MULTIMETER_SETTING_DATA.DC_CURRENT:
                return v > 10
            case MULTIMETER_SETTING_DATA.AC_VOLTAGE:
            case MULTIMETER_SETTING_DATA.DC_VOLTAGE:
                return v > 600
            case MULTIMETER_SETTING_DATA.DC_CURRENT_LOW_RANGE:
            case MULTIMETER_SETTING_DATA.AC_CURRENT_LOW_RANGE:
                return v > 0.0005
            default:
                return false
        }
    }

    executeForRaw(byteSetting, value) {
        return this._isOverRangeBySetting(byteSetting, value)
    }

    executeForConverted(value) {
        return Math.abs(value) > 9999
    }
}