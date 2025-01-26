import Clipboard from '@react-native-clipboard/clipboard'
import { hapticMedium } from './haptics'

export const copyToClipboard = (value, feedback = true) => {
    if (feedback)
        hapticMedium()
    Clipboard.setString(value)
}