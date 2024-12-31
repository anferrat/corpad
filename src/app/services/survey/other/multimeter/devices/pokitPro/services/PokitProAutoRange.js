import { MultimeterCurrentRanges, MultimeterListenerEvents, MultimeterVoltageRanges } from "../../../../../../../../constants/global"
import { MultimeterRangeSettings } from "../../../../../../../entities/survey/multimeter/MultimeterRangeSettings"
import { LimitDetector } from "../helpers/auto_range/LimitDetector"
import { RangeSelector } from "../helpers/auto_range/RangeSelector"

export class PokitProAutoRange {
    constructor(constants) {
        this.constants = constants
        //SETUP for voltage ranges
        this.voltageRangeSettings = new MultimeterRangeSettings()
        this.voltageRangeSettings.setAutoRange(MultimeterVoltageRanges.POKIT.AUTO)
        this.voltageRangeSettings.pushRange(MultimeterVoltageRanges.POKIT._250MV, 0, 0.25)
        this.voltageRangeSettings.pushRange(MultimeterVoltageRanges.POKIT._2V, 0.25, 2)
        this.voltageRangeSettings.pushRange(MultimeterVoltageRanges.POKIT._10V, 2, 10)
        this.voltageRangeSettings.pushRange(MultimeterVoltageRanges.POKIT._30V, 10, 30)
        this.voltageRangeSettings.pushRange(MultimeterVoltageRanges.POKIT._60V, 30, 60)
        this.voltageRangeSettings.pushRange(MultimeterVoltageRanges.POKIT._125V, 60, 125)
        this.voltageRangeSettings.pushRange(MultimeterVoltageRanges.POKIT._400V, 125, 400)
        this.voltageRangeSettings.pushRange(MultimeterVoltageRanges.POKIT._600V, 400, 600)
        this.voltageLimitDetectorService = new LimitDetector(this.voltageRangeSettings)
        this.voltageRangeSelectorService = new RangeSelector(this.voltageRangeSettings.ranges)

        //Setup for small current ranges (Toggle in mid position, currents up to 300mA)
        this.smallCurrentRangeSettings = new MultimeterRangeSettings()
        this.smallCurrentRangeSettings.setAutoRange(MultimeterCurrentRanges.POKIT.AUTO)
        this.smallCurrentRangeSettings.pushRange(MultimeterCurrentRanges.POKIT._500uA, 0, 0.00005)
        this.smallCurrentRangeSettings.pushRange(MultimeterCurrentRanges.POKIT._2mA, 0.00005, 0.002)
        this.smallCurrentRangeSettings.pushRange(MultimeterCurrentRanges.POKIT._10mA, 0.002, 0.01)
        this.smallCurrentRangeSettings.pushRange(MultimeterCurrentRanges.POKIT._125mA, 0.01, 0.125)
        this.smallCurrentRangeSettings.pushRange(MultimeterCurrentRanges.POKIT._300mA, 0.125, 0.3)
        this.smallCurrentLimitDetectorService = new LimitDetector(this.smallCurrentRangeSettings)
        this.smallCurrentRangeSelectorService = new RangeSelector(this.smallCurrentRangeSettings.ranges)

        //Setup for large currents (toggle in a right position, currents up to 10A)
        this.currentRangeSettings = new MultimeterRangeSettings()
        this.currentRangeSettings.setAutoRange(MultimeterCurrentRanges.POKIT.AUTO)
        this.currentRangeSettings.pushRange(MultimeterCurrentRanges.POKIT._3A, 0, 3)
        this.currentRangeSettings.pushRange(MultimeterCurrentRanges.POKIT._10A, 3, 10)
        this.currentLimitDetectorService = new LimitDetector(this.currentRangeSettings)
        this.currentRangeSelectorService = new RangeSelector(this.currentRangeSettings.ranges)
    }

    _getLimitDetectorService(mode, toggleStatus) {
        switch (toggleStatus) {
            case this.constants.toggleStatuses.VOLTAGE:
                return this.voltageLimitDetectorService
            case this.constants.toggleStatuses.SMALL_CURRENT:
                return this.smallCurrentLimitDetectorService
            case this.constants.toggleStatuses.CURRENT:
                return this.currentLimitDetectorService
            default:
                return undefined
        }
    }

    _getRangeSelectorService(mode, toggleStatus) {
        switch (toggleStatus) {
            case this.constants.toggleStatuses.VOLTAGE:
                return this.voltageRangeSelectorService
            case this.constants.toggleStatuses.SMALL_CURRENT:
                return this.smallCurrentRangeSelectorService
            case this.constants.toggleStatuses.CURRENT:
                return this.currentRangeSelectorService
            default:
                return undefined
        }
    }

    _getFlag(type, reading, range, toggleStatus, mode) {
        const limitDetectorService = this._getLimitDetectorService(mode, toggleStatus)
        if (!limitDetectorService)
            return null
        switch (type) {
            case MultimeterListenerEvents.READING_SET:
                return limitDetectorService.executeForSet(range, reading)
            case MultimeterListenerEvents.SINGLE_READ:
                return limitDetectorService.execute(range, reading)
            default:
                return null
        }
    }

    execute(type, reading, range, onRangeUpdate, onOverLimit, getToggleStatus, mode) {
        const toggleStatus = getToggleStatus()
        const flag = this._getFlag(type, reading, range, toggleStatus, mode)
        reading.setFlag(flag)
        const rangeSelectorService = this._getRangeSelectorService(mode, toggleStatus)
        if (rangeSelectorService) {
            const { isOverLimit, newRange } = rangeSelectorService.execute(range, flag)
            if (isOverLimit)
                onOverLimit()
            else if (newRange)
                onRangeUpdate(newRange)
        }
    }
}