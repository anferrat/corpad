import { MultimeterReadingFlags } from "../../../../../../../../../constants/global"
import { Error, errors } from "../../../../../../../../utils/Error"

export class LimitDetector {
    constructor(rangeSettings) {
        this.rangeSettings = rangeSettings
        this.ERROR_FRACTION = 0.05 // % of reading in the set that have to be over the limit to get flag
    }

    _getThreshold(range) {
        const threshold = this.rangeSettings.getThreshold(range)
        if (!threshold)
            throw new Error(errors.GENERAL, 'Unable to determine threshold for the range', `Thersholds were not setup for range ${range}`)
        return threshold
    }

    _getFlag(min, max, rawValue, isAuto) {
        const value = Math.abs(rawValue)
        if (value > max && !isAuto)
            return MultimeterReadingFlags.OVER_RANGE
        else if (value > max && isAuto)
            return MultimeterReadingFlags.OVER_LIMIT
        else
            return null
    }

    execute(range, reading) {
        const { low, high, isAuto } = this._getThreshold(range)
        return this._getFlag(low, high, reading.value, isAuto)
    }

    executeForSet(range, readingSet) {
        const { low, high, isAuto } = this._getThreshold(range)
        let urCount = 0
        let orCount = 0
        readingSet.readings.forEach(value => {
            const flag = this._getFlag(low, high, value, isAuto)
            switch (flag) {
                case MultimeterReadingFlags.OVER_RANGE:
                    orCount++
                    return
                case MultimeterReadingFlags.UNDER_RANGE:
                    urCount++
                    return
            }
        })
        if (orCount > readingSet.readings.length * this.ERROR_FRACTION)
            return MultimeterReadingFlags.OVER_RANGE
        else if (orCount === 0 && urCount * this.ERROR_FRACTION > readingSet.readings.length)
            return MultimeterReadingFlags.UNDER_RANGE
        else
            return null
    }
}