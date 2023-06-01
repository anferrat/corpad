import { Alert } from "react-native"


const errorTitles = {
    100: 'Error',
    200: 'Success',
    300: 'Authentication error',
    400: 'File error',
    500: 'Invalid data',
    600: 'Database error',
    700: 'Cloud error',
    800: 'Location error',
    900: 'Permissions required',
}


const warningCodes = {
    10: 'Are you sure you want to proceed?',
    12: 'Are you sure you want to exit to the main screen? Any changes that you have made to the survey will be lost.',
    21: 'Deleting this potential type will also delete ALL potential readings of this type in every test point within the survey. This action cannot be reversed, proceed with caution.',
    22: 'Deleting reference cell will also delete ALL potential fields and readings that uses this reference. This action cannot be reversed.',
    43: 'Are you sure you want to delete this survey file?',
    44: 'Are you sure you want to delete this file?',
    45: 'Are you sure you want to delete all exported files?',
    46: 'Are you sure you want to delete this calculation?',
    47: 'You will delete all saved calculations of this type including the one currently opened. Do you want to continue?',
    51: 'All mapped values will be deleted. Do you wish to proceed?',
    52: 'You have no mapped attributes for this property, therefore property will have no value for all imported items. Do you want to continue?',
    53: 'Are you sure you want to delete this rectifier?',
    54: 'Are you sure you want to delete this pipeline?',
    55: 'Are you sure you want to delete this test point?',
    56: 'Are you sure you want to delete this reading?',
    57: 'Are you sure you want to delete this circuit?',
    59: 'Are you sure you want to delete this import setting?',
    60: 'Previously imported items will be deleted, this action cannot be reverted. Would you like to undo last import?'
}

const errorCodes = {
    100: 'Unknown error occured',
    101: 'Operation cancelled', //
    103: 'Orientation sensor error',
    104: 'Unable to save and reset current survey.',
    105: 'Unable to save current survey.',
    106: 'Unable to reset current survey.',
    107: 'Unable to initialize application.',
    108: 'Bottom sheet error. Please restart the app.',
    301: 'Unable to update network status.',
    303: 'Unable to sign in with Google Account',
    304: 'Unable to sign out with Google Account',
    400: `An error occured while working with files.`,
    415: 'Unable to create new survey.',
    416: 'Unable to copy survey file to Downloads directory.',
    417: 'Unable to copy survey file to the cloud storage.',
    418: 'Unable to copy survey file to the device.',
    419: 'Unable to obtain survey file link.',
    420: 'Unable to load survey file from external directory.',
    421: 'Unable to read directory with survey files.',
    422: 'Unable to delete survey file.',
    423: 'Unable to load survey file.',
    424: 'Unable to read directory with exported files.',
    425: 'Unable to delete exported file.',
    426: 'Unable to delete all exported files.',
    427: 'Unable to save exported file to downloads',
    428: 'Unable to read comma-separated file',
    429: 'Unable to export file',
    430: 'Unable to share file',
    431: 'Unable to save calculator data to file.',
    505: 'Some of the data is invalid. Please check entered values and try again.',
    506: 'Name must only contain following characters: A-z, 0-9, -._() and be at least 2 characters long',
    509: 'Eneterd data has invalid formtat for this property.',
    510: 'Select values from the list to add map.',
    511: 'All property values were mapped. Remove existing mapped values from the list to add more.',
    512: 'Name property must not contain special characters or be empty.',
    600: 'Invalid request. Unable to make changes in database',
    601: 'Unable to delete item.',
    602: `Unable to load subitem list.`,
    603: `An error occured while loading data.`,
    604: `An error occured while trying to save the data.`,
    606: `An error occured while creating new item.`,
    607: `Unable to load subitem.`,
    608: `Unable to update subitem.`,
    609: `Unable to create new potential.`,
    610: `Unable to delete potential.`,
    611: `Unable to update potential.`,
    612: `Unable to load potential list from database.`,
    613: `An error occured while retrieving list data.`,
    615: `Unable to retrieve marker info from database.`,
    616: `Unable to update map marker.`,
    618: `An error occured while searching.`,
    622: `Unable to retrieve default names from database.`,
    623: `Unable to update default names.`,
    625: `Unable to update survey name.`,
    626: `An error occured while retrieving survey data.`,
    628: 'Unable to continue import.',
    632: 'Unable to delete item list',
    633: 'Unable to update onboarding view status',
    634: 'Unable to create potential type',
    635: 'Unable to delete potential type',
    636: 'Unable to update potential unit',
    637: 'Unable to update setting',
    638: 'Unable to retrieve potential type data from database',
    639: 'Unable to get reference cell list',
    640: 'Unable to update main reference cell',
    641: 'Unable to create reference cell',
    642: 'Unable to delete reference cell',
    643: 'Unable to get item export properties.',
    644: 'Unable to get subitem export properties.',
    645: 'Unable to get potential export properties.',
    646: 'Unable to select file for import.',
    647: 'Unable to save calculator data',
    648: 'Unable to delete calculator data.',
    649: 'Unable to get saved calculator data',
    650: 'Unable to get calculator data',
    800: 'Unable to obtain user location.',
    801: 'Unable to calculate declination',
    900: 'Unable to obtain permission to proceed with operation.',
    901: 'Need permission to write to Downloads folder.',
    902: 'Location permission was not granted.'
}

const getErrorTitle = (error) => errorTitles[error - (error % 100)] ?? errorTitles[100]

const getErrorMessage = (error) => errorCodes[error] ?? errorCodes[100]


export const erroHandlerAsync = async (error, action = false) => await new Promise((resolve) => {
    errorHandler(error, () => {
        action ? action() : null
        resolve()
    })
})

export const errorHandler = (error, action = false) => {
    Alert.alert(getErrorTitle(error), getErrorMessage(error) + ((error - (error % 100)) !== 500 ? `\n\nCode: ${error}` : ''), [
        {
            style: 'default',
            text: 'OK',
            onPress: () => { action ? action() : null }
        }
    ])
}

export const warningHandler = async (warning, yesButton = null, noButton = null) => new Promise((resolve) => {
    Alert.alert(
        'Attention',
        warningCodes[warning] ?? warningCodes[10],
        [
            {
                text: yesButton === null ? 'Ok' : yesButton,
                style: 'default',
                onPress: () => {
                    resolve(true)
                },
            },
            {
                text: noButton === null ? 'Cancel' : noButton,
                style: 'cancel',
                onPress: () => {
                    resolve(false)
                },

            },
        ],
        {
            cancelable: true,
            onDismiss: () => resolve(false)
        },
    )
})