
import { Controller } from "../../../utils/Controller"
import { timeService } from "../../_instances/general_services"

class TimeController extends Controller {
    constructor(timeService) {
        super()
        this.timeService = timeService
    }

    addTimeSyncListener(callback, source) {
        return super.callbackHandler(undefined, undefined, 848, () => {
            return this.timeService.addListener(callback, source)
        })
    }

    syncTime({ source }, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 849, () => {
            return this.timeService.syncTime(source)
        })
    }
}

const timeController = new TimeController(timeService)

export const addTimeSyncListener = (callback, source) => timeController.addTimeSyncListener(callback, source)

export const syncTime = ({ source }, onError, onSuccess) => timeController.syncTime({ source }, onError, onSuccess)