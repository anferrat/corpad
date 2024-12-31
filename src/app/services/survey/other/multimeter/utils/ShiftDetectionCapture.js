import { MultimeterCycles } from "../../../../../../constants/global"

export class ShiftDetectionCapture {
    constructor() { }

    _getZeroDeviation(array) {
        const median = this._getMedian(array)
        const deviationSum = array.map(value => Math.abs(value - median)).reduce((a, b) => a + b)
        return (deviationSum / array.length)
    }

    _getMedian(array) {
        const sorted = [...array].sort((a, b) => (a - b))
        const halfIndex = Math.floor(sorted.length / 2)
        return [sorted[halfIndex]]
    }

    _getMin(a, b) {
        return a < b ? a : b
    }

    _getMax(a, b) {
        return a > b ? a : b
    }

    _getHighestShiftIndexes(readings) {
        const shifts = readings
            //create array of shifts in the cycle including shift between last and first elements
            .map((value, index) => index === 0 ? value - readings[readings.length - 1] : value - readings[index - 1])
            //keep both indexes and values
            .map((value, index) => ({ value, index }))
            //sort in descending order
            .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
        //first two elements contain indexes with highest shifts. report them in a new array, starting with the smallest index
        return [this._getMin(shifts[0].index, shifts[1].index), this._getMax(shifts[0].index, shifts[1].index)]
    }

    _assignCycles(firstCycle, secondCycle, onTime, offTime) {
        if (firstCycle.length === 0 || secondCycle.length === 0) {
            //in case when one of cycle arrays is empty, split values evenly between on and off. It means that there is no cycle detected
            const readings = [...firstCycle, ...secondCycle]
            const halfIndex = Math.floor(readings.length / 2)
            return {
                onValues: readings.filter((_, index) => index <= halfIndex),
                offValues: readings.filter((_, index) => index > halfIndex),
            }
        }
        else {
            //Find ratio of readings captured during first cycle in respect to total number of readings. it must be similar to ratio of one of the cycle periods(on/off) in respect to total cycle time.
            //Compare ratios and assign cycle to whichever ratio is closer than the other
            const cycleTime = onTime + offTime
            const firtsCycleRatio = firstCycle.length / (firstCycle.length + secondCycle.length)
            const firstCycleOn = Math.abs(onTime / cycleTime - firtsCycleRatio) < Math.abs(offTime / cycleTime - firtsCycleRatio)
            return {
                onValues: firstCycleOn ? firstCycle : secondCycle,
                offValues: firstCycleOn ? secondCycle : firstCycle
            }
        }
    }

    _getCycles(readings) {
        //Get indexes of twho highest shifts in the data array
        const [firstCycleStartIndex, secondCycleStartIndex] = this._getHighestShiftIndexes(readings)
        //slice array into two, with values are captured inside highest shifts and outside highest shifts
        return [
            readings.slice(firstCycleStartIndex, secondCycleStartIndex),
            [...readings.slice(0, firstCycleStartIndex), ...readings.slice(secondCycleStartIndex, readings.length)]
        ]
    }

    _getSignificantValue(array) {
        /*
        Working with data set for each cycle type, we want to eliminate spike values that can occur at the begining or end of each cycle, or multimeter/user errors when some of the reads are inaccurate.
        In order to do that we finding shifts between two paired values.
        Shifts must be equal to 0 for the case of ideal cycle, therefore we finding meadian deviation with for the set of provided cycle readings.
        Iterating through shifts we check if shift within meadin deviation interval, and report values with first shift index that passes deviation test.
        */
        if (array.length === 1)
            return array[0]
        else {
            const shifts = []
            for (i = 0; i < array.length - 1; i++) {
                shifts.push(array[i + 1] - array[i])
            }
            const deviation = this._getZeroDeviation(shifts)
            for (i = 0; i < shifts.length; i++) {
                if (Math.abs(shifts[i]) < deviation) {
                    return array[i]
                }
            }
            return array[array.length - 1]
        }
    }

    execute(array, onTime, offTime) {
        //array - data values captured during single cycle. Captured with same interval

        //Getting cycle based on shifts in captured values
        if (array.length === 0)
            return [[MultimeterCycles.ON, null], [MultimeterCycles.OFF, null]]
        else if (array.length === 1)
            return [[MultimeterCycles.ON, array[0]], [MultimeterCycles.OFF, array[0]]]
        else {
            const [first, second] = this._getCycles(array)
            //assign cycles to on/off based on number of readings and cycle times
            const { onValues, offValues } = this._assignCycles(first, second, onTime, offTime)
            //get first stable value from the cycle values for on and off
            const on = this._getSignificantValue(onValues)
            const off = this._getSignificantValue(offValues)
            return [[MultimeterCycles.ON, on], [MultimeterCycles.OFF, off]]
        }
    }
}