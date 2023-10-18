import { Alert } from "react-native"

export class WarningHandler {
    constructor() { }

    async execute(message, yesButton = 'Ok', noButton = 'Cancel') {
        return await new Promise((resolve) => {
            Alert.alert(
                'Attention',
                message,
                [
                    {
                        text: yesButton,
                        style: 'default',
                        onPress: () => resolve(true),
                    },
                    {
                        text: noButton,
                        style: 'cancel',
                        onPress: () => resolve(false),

                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => resolve(false)
                },
            )
        })
    }
}