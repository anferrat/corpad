import { MultimeterVoltageRanges } from "../../../../../../../../constants/global"
import { MultimeterRangeSettings } from "../../../../../../../entities/survey/multimeter/MultimeterRangeSettings"
import { RangeSelector } from "../helpers/auto_range/RangeSelector"

export class DvmAutoRange {
    constructor() {
        this.voltageRangeSettings = new MultimeterRangeSettings()
        this.voltageRangeSettings.pushRange(MultimeterVoltageRanges.DVM2130._5V, 0, 5)
        this.voltageRangeSettings.pushRange(MultimeterVoltageRanges.DVM2130._250V, 5, 250)
        this.voltageRangeSelectorService = new RangeSelector(this.voltageRangeSettings.ranges)
    }

    execute(reading, mode, range, onRangeUpdate, onOverLimit) {
        const { isOverLimit, newRange } = this.voltageRangeSelectorService.execute(range, reading.flag)
        if (isOverLimit)
            onOverLimit()
        else if (newRange)
            onRangeUpdate(newRange)
    }
}