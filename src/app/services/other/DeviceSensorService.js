import * as Sensors from "react-native-sensors"

export class DeviceSensorService {
    constructor() {
        Sensors.setUpdateIntervalForType(Sensors.SensorTypes['orientation'], 100)
    }

    watchOrientation(callback) {
        const remove = Sensors.orientation.subscribe(({ yaw }) => callback({ heading: ((yaw * 180 / Math.PI) + 360) % 360 }))
        return {
            remove: () => remove.unsubscribe()
        }
    }
}