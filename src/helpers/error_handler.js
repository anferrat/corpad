import { Alert } from 'react-native'
import { errorMessages, errorTitles, warningMessages } from '../localization/catalogs/en/errorMessages'
import { translate, translateAction, translateReference } from '../localization'

const getErrorTitle = error => {
    const titleCode = error - (error % 100)
    return translate(`errors.titles.${titleCode}`, {}, errorTitles[titleCode] ?? errorTitles[100])
}

const getErrorMessage = error => translate(`errors.messages.${error}`, {}, errorMessages[error] ?? errorMessages[100])

export const erroHandlerAsync = async (error, action = false) => await new Promise(resolve => {
    errorHandler(error, () => {
        action ? action() : null
        resolve()
    })
})

export const errorHandler = (error, action = false) => {
    Alert.alert(getErrorTitle(error), getErrorMessage(error) + ((error - (error % 100)) !== 500 ? `\n\nCode: ${error}` : ''), [
        {
            style: 'default',
            text: translateAction('OK'),
            onPress: () => { action ? action() : null }
        }
    ])
}

export const warningHandler = async (warning, yesButton = null, noButton = null) => new Promise(resolve => {
    const message = typeof warning === 'object'
        ? translateReference(warning, warningMessages[10])
        : translate(`warnings.messages.${warning}`, {}, warningMessages[warning] ?? warningMessages[10])

    Alert.alert(
        translate('dialogs.attention', {}, 'Attention'),
        message,
        [
            {
                text: yesButton === null ? translateAction('Ok') : translateAction(yesButton),
                style: 'default',
                onPress: () => resolve(true)
            },
            {
                text: noButton === null ? translateAction('Cancel') : translateAction(noButton),
                style: 'cancel',
                onPress: () => resolve(false)
            }
        ],
        {
            cancelable: true,
            onDismiss: () => resolve(false)
        }
    )
})
