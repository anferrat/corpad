import { MultimeterCycles } from "../../../../../../constants/global"

export class TimeSyncedCapture {
    constructor() {
    }

    _getCycleType(timestamp, firstCycle, onTime, offTime) { //delay equals approx update rate of multimeter
        const date = new Date(timestamp)
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

    _getTransitionIndex(cycles) {
        let transitionIndex = null
        for (i = 0; i < cycles.length; i++) {
            if (i === cycles.length - 1) {
                if (cycles[i] !== cycles[0])
                    transitionIndex = i
            }
            else if (cycles[i] !== cycles[i + 1]) {
                transitionIndex = i
                break
            }
        }
        return transitionIndex
    }

    _getIndex(param, length) {
        return param < 0 ? param + length : (param >= length ? param - length : param)
    }

    execute(array, timestamps, firstCycle, onTime, offTime, onSetup = 0, offDelay = 0) {
        if (array.length === 0)
            return [[MultimeterCycles.ON, null], [MultimeterCycles.OFF, null]]

        const cycles = timestamps.map(timestamp => this._getCycleType(timestamp, firstCycle, onTime, offTime))

       /* const test = array.map((v, i) => ({
            v: v.toFixed(2),
            s: new Date(timestamps[i]).getSeconds(),
            c: cycles[i] ? 'ON' : 'OFF'
        }))
*/
        const transitionIndex = this._getTransitionIndex(cycles)
        const isOnOffTransition = cycles[transitionIndex] === MultimeterCycles.ON

        if (transitionIndex === null)
            return [[MultimeterCycles.ON, array[0]], [MultimeterCycles.OFF, array[0]]]

        const onIndexOffset = Math.round(onSetup / ((onTime + offTime) / array.length))
        const offIndexOffset = Math.round(offDelay / ((onTime + offTime) / array.length))
        if (onIndexOffset > array.length / 2 || offIndexOffset > array.length / 2)
            return [[MultimeterCycles.ON, null], [MultimeterCycles.OFF, null]]
        const onIndexParam = isOnOffTransition ? transitionIndex - onIndexOffset : transitionIndex + 1 + onIndexOffset
        const offIndexParam = isOnOffTransition ? transitionIndex + 1 + offIndexOffset : transitionIndex - offIndexOffset
        const onIndex = this._getIndex(onIndexParam, cycles.length)
        const offIndex = this._getIndex(offIndexParam, cycles.length)
        return [[MultimeterCycles.ON, array[onIndex]], [MultimeterCycles.OFF, array[offIndex]]]
    }
}