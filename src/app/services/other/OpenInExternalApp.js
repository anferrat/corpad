import SendIntentAndroid from 'react-native-send-intent'
import { Platform } from 'react-native'

export class OpenInExternalApp {
    constructor() { }

    execute(fileUrl, mimeType) {
        if (Platform.OS === 'android')
            return SendIntentAndroid.openFileChooser(
                {
                    fileUrl: fileUrl,
                    type: mimeType,
                },
                "Open file with:"
            )
        else
            return true
    }
}