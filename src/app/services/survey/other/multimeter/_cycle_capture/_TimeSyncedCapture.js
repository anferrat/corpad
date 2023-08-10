import { MultimeterCycles } from "../../../../../../constants/global"

export class _TimeSyncedCapture {
    constructor() {
    }

    _getCycleType(timestamp, firstCycle, onTime, offTime, delay = 100) { //delay equals approx update rate of multimeter
        const date = new Date(timestamp+delay)
        const cycleTime = onTime + offTime
        const miliseconds = (date.getSeconds() * 1000) + date.getMilliseconds()
        const inCycleTime = miliseconds % cycleTime
        const firstCycleOn = firstCycle === MultimeterCycles.ON
        const onRange = [firstCycleOn ? 0 : offTime, firstCycleOn ? onTime : cycleTime]
        //const offRange = [firstCycleOn ? onTime : 0, firstCycleOn ? cycleTime : offTime]
        if (inCycleTime > onRange[0] && inCycleTime < onRange[1])
            return MultimeterCycles.ON
        else return MultimeterCycles.OFF
    }

    execute(array, timestamps, timeAdjustment, firstCycle, onTime, offTime) {
        let shiftIndexes = []
        const cycles = timestamps.map(timestamp => this._getCycleType(timeAdjustment + timestamp, firstCycle, onTime, offTime))
        for (i = 0; i < cycles.length; i++) {
            if (i === cycles.length - 1) {
                if (cycles[i] !== cycles[0])
                    shiftIndexes.push(i)
            }
            else
                if (cycles[i] !== cycles[i + 1])
                    shiftIndexes.push(i)
            if (shiftIndexes.length >= 2)
                break
        }
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