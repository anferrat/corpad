import { Alert } from "react-native"

export class AlertHandler {
    constructor() { }

    async execute(message) {
        return await new Promise((resolve) => {
            Alert.alert(
                'Attention',
                message,
                [
                    {
                        text: 'OK',
                        style: 'default',
                        onPress: () => resolve(true),
                    }
                ],
                {
                    cancelable: true,
                    onDismiss: () => resolve(true)
                },
            )
        })
    }
}