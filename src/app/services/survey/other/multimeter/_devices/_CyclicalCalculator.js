export class _CyclicalCalculator {
    //Retrieves On/Off values from array of readings based on on/off cycle time periods
    constructor() { }

    _getAverage(array) {
        const sum = array.reduce((a, b) => a + b)
        return sum / array.length
    }
    _deviationFilter(array) {
        const meanAverage = this._getAverage(array)
        const deviationSum = array.map(value => Math.pow(meanAverage - value, 2)).reduce((a, b) => a + b)
        const variance = deviationSum / array.length
        const deviation = 3 * Math.sqrt(variance)
        return array.filter(value => value > meanAverage - deviation || value < meanAverage + deviation)
    }

    _getShiftIndexes(readings) {
        const shifts = readings.map((value, index) => index === 0 ? value - readings[readings.length - 1] : value - readings[index - 1]).map((value, index) => ({ value, index }))
        shifts.sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
        return [shifts[0].index, shifts[1].index]
    }


    _getCycledOnOff(readings, onTime, offTime) {
        const cycleTime = onTime + offTime
        const indexes = this._getShiftIndexes(readings)
        indexes.sort((a, b) => a - b)
        const [firstCycleStartIndex, secondCycleStartIndex] = indexes
        const diff = secondCycleStartIndex - firstCycleStartIndex
        const firtsCycleRatio = diff / readings.length
        const firstCycleOn = Math.abs(onTime / cycleTime - firtsCycleRatio) < Math.abs(offTime / cycleTime - firtsCycleRatio)
        const firstCycle = readings.slice(firstCycleStartIndex, secondCycleStartIndex)
        const secondCycle = [...readings.slice(0, firstCycleStartIndex), ...readings.slice(secondCycleStartIndex, readings.length)]
        return {
            on: firstCycleOn ? firstCycle : secondCycle,
            off: firstCycleOn ? secondCycle : firstCycle
        }

    }

    execute(array, onTime, offTime) {
        const { on, off } = this._getCycledOnOff(array, onTime, offTime)
        if (on.length === 0)
            return {
                on: off[0],
                off: off[0]
            }
        else if (off.length === 0)
            return {
                on: on[0],
                off: on[0]
            }
        else {
            const onValues = this._deviationFilter(on)
            const offValues = this._deviationFilter(off)
            return {
                on: onValues[0] ?? null,
                off: offValues[0] ?? null
            }
        }
    }
}