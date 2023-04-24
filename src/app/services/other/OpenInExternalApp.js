import SendIntentAndroid from 'react-native-send-intent'

export class OpenInExternalApp {
    constructor() { }

    execute(fileUrl, mimeType) {
        SendIntentAndroid.openFileChooser(
            {
                fileUrl: fileUrl,
                type: mimeType,
            },
            "Open file with:"
        )
    }
}