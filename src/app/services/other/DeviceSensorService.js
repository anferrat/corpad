export class DeviceSensorService {
    watchOrientation() {
        // Temporarily disabled: react-native-sensors cannot configure with Gradle 9.
        return {
            remove: () => {}
        }
    }
}
