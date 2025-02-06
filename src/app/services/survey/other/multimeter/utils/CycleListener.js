import { MultimeterCycles, MultimeterListenerEvents, MultimeterSyncModes } from "../../../../../../constants/global"
import { Reading } from "../../../../../entities/survey/multimeter/Reading"
import { Error, errors } from "../../../../../utils/Error"
import { HighLowCapture } from "./HighLowCapture"
import { ShiftDetectionCapture } from "./ShiftDetectionCapture"
import { TimeSyncedCapture } from "./TimeSyncedCapture"

export class CycleListener {
    constructor(timeService) {
        this.timeService = timeService
        this.highLowCaptureService = new HighLowCapture()
        this.shiftDetectionCaptureService = new ShiftDetectionCapture()
        this.timeSyncedCaptureService = new TimeSyncedCapture()
    }

    _formatCycles(cycles) {
        const onIndex = cycles[0][0] === MultimeterCycles.ON ? 0 : 1
        return {
            on: onIndex ? cycles[1][1] : cycles[0][1],
            off: onIndex ? cycles[0][1] : cycles[1][1]
        }
    }

    _getOnOffFromSet(readingSet, syncMode, onTime, offTime, firstCycle, onSetup, offDelay) {
        const { readings, deviceTimestamp, offset } = readingSet
        switch (syncMode) {
            case MultimeterSyncModes.HIGH_LOW:
                return this.highLowCaptureService.execute(readings)
            case MultimeterSyncModes.CYCLED:
                return this.shiftDetectionCaptureService.execute(readings, onTime, offTime)
            case MultimeterSyncModes.GPS:
                const timeDelta = this.timeService.getDelta() ?? 0
                const timestamps = readings.map((_, index) => {
                    //device timestamp in UTC adjusted with timeDelta. First reading in set was taking in offset * length ms. Delay added to compenstae for border effects
                    return Math.round(deviceTimestamp + timeDelta - (readings.length - index) * offset)
                })
                return this.timeSyncedCaptureService.execute(readings, timestamps, firstCycle, onTime, offTime, onSetup, offDelay)
            default:
                throw new Error(errors.GENERAL, 'Unable to capture cycle', 'Mode is not supported')
        }
    }

    addListener(multimeterService, toggleStatus, peripheralId, onUpdate, onError, syncMode, onTime, offTime, firstCycle, onSetup, offDelay, mode, range, rate) {
        if (!multimeterService || !peripheralId || syncMode === undefined || !onTime || !offTime || !mode || !range || !rate)
            return { remove: () => { } }
        const listener = multimeterService.addListener(peripheralId, toggleStatus, mode, range, rate, false, onTime + offTime, (type, reading) => {
            if (type === MultimeterListenerEvents.READING_SET) {
                const cycles = this._getOnOffFromSet(reading, syncMode, onTime, offTime, firstCycle, onSetup, offDelay)
                const { on, off } = this._formatCycles(cycles)
                if (onUpdate) {
                    onUpdate(MultimeterListenerEvents.ON_READING, new Reading(null, on, null, reading.type, reading.unit, reading.flag, reading.isAc, reading.deviceType))
                    onUpdate(MultimeterListenerEvents.OFF_READING, new Reading(null, off, null, reading.type, reading.unit, reading.flag, reading.isAc, reading.deviceType))
                }
            }
            else {
                onUpdate ? onUpdate(type, reading) : null
            }
        }, onError)

        return listener
    }
}