import Clipboard from '@react-native-clipboard/clipboard'
import { ToastAndroid } from 'react-native'
import { hapticMedium } from './haptics'

export const copyToClipboard = (value, feedback = false) => {
    if (feedback)
        hapticMedium()
    Clipboard.setString(value)
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT)
}