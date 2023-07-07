import { MultimeterSyncModes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"
import { _MultimeterFactory } from "./_devices/_MultimeterFactory"

export class PotentialCaptureListener {
    constructor(bluetoothRepo) {
        this.multimeterFactory = new _MultimeterFactory(bluetoothRepo)
    }

    addListener(callback, { peripheralId, type, onTime, offTime, syncMode, firstCycle, timeAdjustment }) {
        const multimeterService = this.multimeterFactory.execute(type)
        let removeListener
        switch (syncMode) {
            case MultimeterSyncModes.GPS:
                removeListener = multimeterService.syncedPotentialListener(callback, { peripheralId, onTime, offTime, firstCycle, timeAdjustment })
                break
            case MultimeterSyncModes.HIGH_LOW:
                removeListener = multimeterService.highLowPotentialListener(callback, { peripheralId, onTime, offTime })
                break
            case MultimeterSyncModes.REAL_TIME:
                removeListener = multimeterService.realTimePotentialListener(callback, { peripheralId })
                break
            case MultimeterSyncModes.CYCLED:
                removeListener = multimeterService.cyclicalPotentialListener(callback, { peripheralId, onTime, offTime })
                break
            default:
                throw new Error(errors.GENERAL, 'Unable to start service with selected syncronization mode', 'No such sync mode')
        }
        return async () => {
            if (removeListener)
                removeListener()
            await multimeterService.stopPotentialCapture(peripheralId)
        }
    }
}