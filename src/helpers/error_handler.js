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

const tip = 'try restarting the app.'

const warningCodes = {
    10: 'Are you sure you want to proceed?',
    11: `Unable to save survey to cloud. Your device isn't connected to the internet. You can try again later or you can save a copy of a survey to your device`,
    12: 'Are you sure you want to exit to the main screen? Any changes that you have made to the survey will be lost.',
    13: 'Another survey is active. It will be closed and changes will be saved. Would you like to proceed?',
    21: 'Deleting this potential type will cause deleting ALL of the potential readings of this type in ALL test points. This action cannot be undone, proceed with caution.',
    22: 'Deleting reference cell will also delete ALL potential fields and readings that uses this reference. This action cannot be undone.',
    31: 'You are not signed in with your cloud storage account. You can save survey to your device or sign in with Google Drive account and try again.',
    40: 'File with the same name already exists in exports folder. Do you want to overwrite it?',
    41: 'Survey file is corrupted. Some data may be lost if you try to open this survey file. Make sure you have a copy of this survey before proceeding',
    42: 'Survey file version is higher than the app version. You should update your app. Opening survey may cause some data to be lost.',
    43: 'Are you sure you want to delete this survey file?',
    44: 'Are you sure you want to delete this file?',
    45: 'Are you sure you want to delete all exported files?',
    46: 'Are you sure you want to delete this calculation?',
    47: 'You will delete all saved calculations of this type including the one currently opened. Do you want to continue?',
    51: 'All mapped values will be deleted. Do you wish to proceed?',
    52: 'You have no mapped attributes for this property, therefore property will have no value for all imported items. Do you want to continue?',
}

const errorCodes = {
    100: 'Unknown error occured',
    102: 'No internet connection',
    201: 'Items imported successfully.',
    301: 'Unable to obtain network status',
    302: 'You are not signed with your cloud storage account.',
    400: `An error occured while working with files, ${tip}`,
    401: `An error occured while writing data to file, ${tip}`,
    402: `Not enough storage. Free storage on your device to continue.`,
    403: `File with the same name already exists. Unable to ovewrite.`,
    404: `An error occured while copying file, ${tip}`,
    405: `An error occured while creating meta-data, ${tip}`,
    406: `Meta-data has invalid format.`,
    407: `An error occured while exporting data to file, ${tip}`,
    408: `Failed to get meta-data for the file, ${tip}`,
    409: `There are 10 copies of one survey file with the same name. Please change survey name if you wish to continue.`,
    410: `An error occured while deleting the file, try again later.`,
    411: `Unable to read survey file.`,
    412: 'File has unsupported format.',
    413: 'Unable create survey from this template.',
    414: 'Survey loading was cancelled.',
    415: 'File has no rows, make sure the file is formatted as csv.',
    416: 'File has no colums, make sure the file is formatted as csv.',
    417: 'Unable to read file, make sure the file is formatted as csv.',
    418: 'Unable to read file. Make sure the file is available.',
    501: `Avoid special characters and spaces in names. Try this format: 'MY_POTENTIAL_IRF'.`,
    502: `Please select a different survey name.`,
    503: 'Bottom sheet error, please restart the app.',
    504: 'Name must only contain following characters: A-z, 0-9, -._()',
    505: 'Please check data you have entered',
    506: 'Name must only contain following characters: A-z, 0-9, -._() and be at least 2 characters long',
    507: 'Please refresh survey list to see changes.',
    508: 'Invalid data string. Unable to read.',
    509: 'Eneterd data has invalid formtat for this property.',
    510: 'Select values from the list to add map.',
    511: 'All property values were mapped. Remove existing mapped values from the list to add more.',
    512: 'Name property must not contain special characters or be empty.',
    600: 'Invalid request. Unable to make changes in database. Please try again later.',
    601: 'Unable to delete item.',
    602: `There was an error while loading readings, ${tip}`,
    603: `An error occured while loading data, ${tip}`,
    604: `An error occured while trying to save the data, ${tip}`,
    605: `Unable to create new circuit, ${tip}`,
    606: `An error occured while creating new item, ${tip}`,
    607: `There was an error while loading reading data, ${tip}`,
    608: `There was an error while saving reading data, ${tip}`,
    609: `There was an error while adding new potential reading, ${tip}`,
    610: `There was an error while deleting potential reading, ${tip}`,
    611: `Unable to save potential readings, ${tip}`,
    612: `There was an error when loading potential readings.`,
    613: `An error occured while retrieving list info, ${tip}`,
    614: `An error occured while updating marker location, ${tip}`,
    615: `Unable to retrieve marker info from database, ${tip}`,
    616: `Unable to update map marker, ${tip}`,
    617: `Unable to create new marker, ${tip}`,
    618: `An error occured while searching, ${tip}`,
    619: `An error occured while creating new survey item, ${tip}`,
    620: `An error occured while exporting database, ${tip}`,
    621: `Unable to retrieve survey name, ${tip}`,
    622: `Unable to access database, ${tip}`,
    623: `Unable to save changes, ${tip}`,
    624: `Unable to export, try changing settings or restarting the app.`,
    625: `Unable to update survey name, ${tip}`,
    626: `An error occured while retrieving survey info, ${tip}`,
    627: 'Another survey is already opened. Save old survey to continue.',
    628: 'Import error.',
    629: 'Export error.',
    630: `File version doesn't match.`,
    631: 'Unable to delete main reference cell.',
    701: `Unable to access app folder in cloud storage.`,
    702: `Unable to obtain metadata of a file.`,
    703: `Unable to update remote file.`,
    704: `Unable to create file at the remote storage.`,
    705: `Unable to get file list from remote storage.`,
    706: `Unable to read survey file.`,
    707: 'Unable to sign in to Google account.',
    708: 'Unable to log out from cloud storage account.',
    709: 'Unable to delete a file from cloud storage.',
    710: 'Unable to create link, try again later',
    800: 'Location service is not available. Check if your GPS is turned on.',
    801: 'Unable create item with these coordinates.',
    803: 'Your device takes long time to obtain location data.',
    802: 'Please enter latitude and longitude to view item on the map.',
    900: 'You need to grant location permission to activate this feature.',
    901: 'Need permission to write to Downloads folder.',
    902: 'Session is not found in secure storage'
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