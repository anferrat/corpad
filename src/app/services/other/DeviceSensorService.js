import * as Sensors from "react-native-sensors"

export class DeviceSensorService {
    constructor() {
        Sensors.setUpdateIntervalForType(Sensors.SensorTypes['orientation'], 200)
    }

    watchOrientation(callback, onError) {
        const remove = Sensors.orientation.subscribe(({ yaw }) => callback({ heading: ((yaw * 180 / Math.PI) + 360) % 360 }), (er) => {
            if (onError)
                onError(er)
        })
        return {
            remove: () => remove.unsubscribe()
        }
    }
}