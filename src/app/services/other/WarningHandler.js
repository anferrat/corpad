import { Alert } from "react-native"
import { translate, translateAction, translateReference } from '../../../localization'

export class WarningHandler {
    constructor() { }

    async execute(message, yesButton = 'Ok', noButton = 'Cancel') {
        return await new Promise((resolve) => {
            const fallbackMessage = typeof message === 'string' ? message : message?.fallback ?? ''
            Alert.alert(
                translate('dialogs.attention', {}, 'Attention'),
                translateReference(message, fallbackMessage),
                [
                    {
                        text: translateAction(yesButton),
                        style: 'default',
                        onPress: () => resolve(true),
                    },
                    {
                        text: translateAction(noButton),
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
