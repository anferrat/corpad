import { MultimeterReadingFlags } from "../../../../../../../../../constants/global"

export class RangeSelector {
    constructor(ranges) {
        this.ranges = ranges
    }

    execute(range, flag) {
        let result = {
            isOverLimit: false,
            newRange: null
        }
        if (flag) {
            const rangeIndex = this.ranges.indexOf(range)
            switch (flag) {
                case MultimeterReadingFlags.OVER_LIMIT:
                    result.isOverLimit = true
                    break
                case MultimeterReadingFlags.OVER_RANGE:
                    if (~rangeIndex)
                        if (rangeIndex === this.ranges.length - 1) {
                            result.isOverLimit = true
                            break
                        }
                        else {
                            result.newRange = this.ranges[rangeIndex + 1]
                            break
                        }
                case MultimeterReadingFlags.UNDER_RANGE:
                    if (~rangeIndex)
                        if (rangeIndex === 0)
                            break
                        else {
                            result.newRange = this.ranges[rangeIndex - 1]
                        }
            }
        }
        return result
    }
}