import { MultimeterSyncModes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"
import { _MultimeterFactory } from "./_devices/_MultimeterFactory"

export class PotentialCaptureListener {
    constructor(bluetoothRepo, geolocationRepo) {
        this.geolocationRepo = geolocationRepo
        this.multimeterFactory = new _MultimeterFactory(bluetoothRepo)
    }

    addListener(callback, { peripheralId, type, onTime, offTime, syncMode, firstCycle }) {
        const multimeterService = this.multimeterFactory.execute(type)
        let removeListener
        const getTimeAdjustment = () => {
            const { gnss, device } = this.geolocationRepo.getTimeFix()
            return gnss && device ? gnss - device : 0
        }
        switch (syncMode) {
            case MultimeterSyncModes.GPS:
                removeListener = multimeterService.syncedPotentialListener(callback, { peripheralId, onTime, offTime, firstCycle, getTimeAdjustment })
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