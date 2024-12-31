import { Error, errors } from "../../../utils/Error"
import { Threshold } from "./Threshold"

export class MultimeterRangeSettings {
    constructor() {
        this.ranges = []
        this.thresholds = new Map()
        this.autoRange = null
    }

    setAutoRange(range) {
        this.autoRange = range
    }

    pushRange(range, min, max) {
        this.ranges.push(range)
        this.thresholds.set(range, new Threshold(max, min))
    }

    getThreshold(range) {
        if (range === this.autoRange) {
            const highestThershold = this.thresholds.get(this.ranges[this.ranges.length - 1])
            const lowestThersholds = this.thresholds.get(this.ranges[0])
            const autoThershold = new Threshold(highestThershold.high, lowestThersholds.low)
            return {
                ...autoThershold,
                isAuto: true
            }
        }
        else {
            const threshold = this.thresholds.get(range)
            if (!threshold)
                throw new Error(errors.GENERAL, 'Unable to get threshlod', 'Thresholds are not setup for the range')
            return {
                ...threshold,
                isAuto: false
            }
        }
    }

}