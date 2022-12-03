import ReactNativeHapticFeedback from "react-native-haptic-feedback"

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
}

export const hapticKeyboardPress = () => {
    ReactNativeHapticFeedback.trigger("keyboardPress", options)
}

export const hapticMedium = () => {
    ReactNativeHapticFeedback.trigger("impactMedium", options)
}

export const hapticDelete = () => {
    ReactNativeHapticFeedback.trigger("notificationWarning", options)
}

export const hapticMap = () => {
    ReactNativeHapticFeedback.trigger("notificationSuccess", options)
}