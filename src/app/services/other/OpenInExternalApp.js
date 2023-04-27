import SendIntentAndroid from 'react-native-send-intent'

export class OpenInExternalApp {
    constructor() { }

    execute(fileUrl, mimeType) {
        return SendIntentAndroid.openFileChooser(
            {
                fileUrl: fileUrl,
                type: mimeType,
            },
            "Open file with:"
        )
    }
}