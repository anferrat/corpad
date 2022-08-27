import SendIntentAndroid from 'react-native-send-intent'

export const openIn = (fileUrl, mimeType) => SendIntentAndroid.openFileChooser(
    {
        fileUrl: fileUrl,
        type: mimeType,
    },
    "Open file with:"
)