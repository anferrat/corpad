import * as Sensors from "react-native-sensors"
import { Platform } from "react-native"

export class DeviceSensorService {
    constructor() {
        Sensors.setUpdateIntervalForType(Sensors.SensorTypes['orientation'], 200)
    }

    watchOrientation(callback, onError) {
        const remove = Sensors.orientation.subscribe(({ yaw }) => {
            const converted =
                Platform.OS === "android" ?
                    ((yaw * 180 / Math.PI) + 360) : //axis on android directed towards the top of the device
                    (Platform.OS === "ios" ?
                        -(yaw * 180 / Math.PI) + 180 : 0) //axis on ios directed toward the bottom of the device (add pi and multiply by -1 for opposite rotation)
            const heading = converted % 360 //from 0 to 360
            callback({ heading })
        }, (er) => {
            if (onError)
                onError(er)
        })
        return {
            remove: () => remove.unsubscribe()
        }
    }
}