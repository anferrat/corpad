import { MultimeterCycles } from "../../../../../../constants/global"

export class _GPSCapture {
    constructor() {
    }

    _getCycleType(timestamp, firstCycle, onTime, offTime, delay = 200) { //delay not implemented yet
        const date = new Date(timestamp)
        console.log(date)
        console.log(date.getSeconds())
        const cycleTime = onTime + offTime
        const miliseconds = (date.getSeconds() * 1000) + date.getMilliseconds()
        console.log(miliseconds)
        const inCycleTime = miliseconds % cycleTime

        const firstCycleOn = firstCycle === MultimeterCycles.ON
        const onRange = [firstCycleOn ? 0 : offTime, firstCycleOn ? onTime : cycleTime]
        //const offRange = [firstCycleOn ? onTime : 0, firstCycleOn ? cycleTime : offTime]
        console.log('times:', inCycleTime, onRange)
        if (inCycleTime > onRange[0] + delay && inCycleTime < onRange[1] + delay)
            return MultimeterCycles.ON
        else return MultimeterCycles.OFF
    }

    execute(array, timestamps, timeAdjustment, firstCycle, onTime, offTime) {
        console.log(timeAdjustment)
        let shiftIndexes = []
        const cycles = timestamps.map(timestamp => this._getCycleType(timestamp - timeAdjustment, firstCycle, onTime, offTime))
        for (i = 0; i < cycles.length; i++) {
            if (i === cycles.length - 1) {
                if (cycles[i] !== cycles[0])
                    shiftIndexes.push(i)
            }
            else
                if (cycles[i] !== cycles[i + 1])
                    shiftIndexes.push(i + 1)
            if (shiftIndexes.length >= 2)
                break
        }
        console.log(array)
        console.log(timestamps)
        console.log(cycles)
        console.log(shiftIndexes)
        if (shiftIndexes.length === 0)
            return [[MultimeterCycles.ON, array[0]], [MultimeterCycles.OFF, array[0]]]
        else if (shiftIndexes.length === 1)
            if (shiftIndexes[0] === 0)
                return [[cycles[0], array[0]], [cycles[cycles.length - 1], array[array.length - 1]]]
            else
                return [[cycles[shiftIndexes[0] - 1], array[shiftIndexes[0] - 1]], [cycles[shiftIndexes[0]], array[shiftIndexes[0]]]]
        else
            return [[cycles[shiftIndexes[0]], array[shiftIndexes[0]]], [cycles[shiftIndexes[1]], array[shiftIndexes[1]]]]
    }
}