import ReactNativeHapticFeedback from "react-native-haptic-feedback"

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: true
}

export const hapticKeyboardPress = () => {
    ReactNativeHapticFeedback.trigger("keyboardPress", options)
}

export const hapticMedium = () => {
    ReactNativeHapticFeedback.trigger("impactMedium", options)
}

export const hapticLight = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options)
}

export const hapticDelete = () => {
    ReactNativeHapticFeedback.trigger("notificationWarning", options)
}

export const hapticMap = () => {
    ReactNativeHapticFeedback.trigger("notificationSuccess", options)
}

export const hapticMapPress = () => {
    ReactNativeHapticFeedback.trigger("effectTick", options)
}
