import { Alert } from "react-native"
import { translate, translateAction, translateReference } from '../../../localization'

export class AlertHandler {
    constructor() { }

    async execute(message) {
        return await new Promise((resolve) => {
            const fallbackMessage = typeof message === 'string' ? message : message?.fallback ?? ''
            Alert.alert(
                translate('dialogs.attention', {}, 'Attention'),
                translateReference(message, fallbackMessage),
                [
                    {
                        text: translateAction('OK'),
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
