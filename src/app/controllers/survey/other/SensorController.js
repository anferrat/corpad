import { DeviceSensorService } from "../../../services/other/DeviceSensorService"
import { Controller } from "../../../utils/Controller"


class SensorController extends Controller {
    constructor() {
        super()
        this.deviceSensorService = new DeviceSensorService()
    }

    watchHeading(callback, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 622, () => {
            return this.deviceSensorService.watchOrientation(callback)
        })
    }
}

const sensorController = new SensorController()

export const watchDeviceHeading = (callback, onError, onSuccess) => sensorController.watchHeading(callback, onError, onSuccess)
