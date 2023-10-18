import { Alert } from "react-native"


const errorTitles = {
    100: 'Error',
    200: 'Success',
    300: 'Authentication error',
    400: 'File error',
    500: 'Invalid data',
    600: 'Database error',
    700: 'Cloud error',
    800: 'Device error',
    900: 'Permissions required',
}


const warningCodes = {
    10: 'Are you sure you want to proceed?',
    12: 'Are you sure you want to exit to the main screen? Any changes that you have made to the survey without saving will be lost.',
    21: 'Deleting this potential type will also delete ALL potential readings of this type in every test point within the survey. This action cannot be reversed, proceed with caution.',
    22: 'Deleting reference cell will also delete ALL potential fields and readings that uses this reference. This action cannot be reversed.',
    43: 'Are you sure you want to delete this survey file?',
    44: 'Are you sure you want to delete this file?',
    45: 'Are you sure you want to delete all exported files?',
    46: 'Are you sure you want to delete this calculation?',
    47: 'You will delete all saved calculations of this type including the one currently opened. Do you want to continue?',
    48: 'Are you sure that you want to delete this photo?',
    51: 'All mapped values will be deleted. Do you wish to proceed?',
    52: 'You have no mapped attributes for this property, therefore property will have no value for all imported items. Do you want to continue?',
    53: 'Are you sure you want to delete this rectifier?',
    54: 'Are you sure you want to delete this pipeline?',
    55: 'Are you sure you want to delete this test point?',
    56: 'Are you sure you want to delete this reading?',
    57: 'Are you sure you want to delete this circuit?',
    59: 'Are you sure you want to delete this import setting?',
    60: 'Previously imported items will be deleted, this action cannot be reverted. Would you like to undo last import?',
    61: 'Are you sure you want to delete this layer?'
}

const errorCodes = {
    100: 'Unknown error occured',
    101: 'Operation cancelled', //
    102: 'Internet is off. Need internet to complete operation.',
    103: 'Orientation sensor error',
    104: 'Unable to save and reset current survey.',
    105: 'Unable to save current survey.',
    106: 'Unable to reset current survey.',
    107: 'Unable to initialize application.',
    108: 'Bottom sheet error. Please restart the app.',
    109: 'Input data error.',
    110: 'Unable to listen for bluetooth state',
    111: 'No items to export.',
    112: 'Unable to obtain user location.',
    113: 'Survey is currently being saved. Please wait until operation is completed.',
    301: 'Unable to update network status.',
    302: 'Unable to complete operation. Need to sign in.',
    303: 'Unable to sign in with Google Account',
    304: 'Unable to sign out with Google Account',
    400: `An error occured while working with files.`,
    401: 'Unable to write file',
    402: 'Not enough disk space to work with files',
    403: 'File already exist. Overwrite is forbidden.',
    404: 'Unable to copy file',
    405: 'Unable to create directory',
    406: 'Uknown directory location.',
    407: 'Unable to delete file',
    408: 'Unable to read file',
    409: 'Unable to create filename. Please change survey name and try again.',
    410: 'Unable to get file stats',
    411: 'Unable to read directory',
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
    432: 'Unable to add photo',
    433: 'Unable to delete photo',
    434: 'Unable to open GIS file. File has to be less than 3MB.',
    435: 'Unable to open GIS file.',
    436: 'File format is not supported. Supported formats are .kml and .gpx',
    437: 'File has usupported format and cannot be loaded.',
    503: 'Multimeter data is invalid for this field. If this issue presist, please contact support.',
    505: 'Some of the data is invalid. Please check entered values and try again.',
    506: 'Name must only contain following characters: A-z, 0-9, -._() and be at least 2 characters long',
    509: 'Eneterd data has invalid formtat for this property.',
    510: 'Select values from the list to add map.',
    511: 'All property values were mapped. Remove existing mapped values from the list to add more.',
    512: 'Name property must not contain special characters or be empty.',
    513: 'Select a file with GIS data in order to create a new map layer.',
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
    614: 'Inable to loacate nearby items.',
    615: `Unable to retrieve marker info from database.`,
    616: `Unable to update map marker.`,
    618: `An error occured while searching.`,
    622: `Unable to retrieve default names from database.`,
    623: `Unable to update default names.`,
    625: `Unable to update survey name.`,
    626: `An error occured while retrieving survey data.`,
    628: 'Unable to continue import.',
    629: 'Unable to continue export.',
    632: 'Unable to delete item list.',
    633: 'Unable to update onboarding view status.',
    634: 'Unable to create potential type.',
    635: 'Unable to delete potential type.',
    636: 'Unable to update potential unit.',
    637: 'Unable to update setting.',
    638: 'Unable to retrieve potential type data from database.',
    639: 'Unable to get reference cell list.',
    640: 'Unable to update main reference cell.',
    641: 'Unable to create reference cell.',
    642: 'Unable to delete reference cell.',
    643: 'Unable to get item export properties.',
    644: 'Unable to get subitem export properties.',
    645: 'Unable to get potential export properties.',
    646: 'Unable to select file for import.',
    647: 'Unable to save calculator data.',
    648: 'Unable to delete calculator data.',
    649: 'Unable to get saved calculator data.',
    650: 'Unable to get calculator data.',
    651: 'Unable to get multimeter settings.',
    652: 'Unable to update multimeter settings.',
    653: 'Unable to change pairing settings',
    654: 'Unable to initiate multimeter capture.',
    655: 'Unable to get potential pair.',
    656: 'Unable to get item assets.',
    657: 'Unable to create map layer.',
    658: 'Unable to update map layer.',
    659: 'Unable to obtain map layer list.',
    660: 'Unable to delete map layer.',
    661: 'Unable to read map layer data.',
    700: 'Unable to complete Google Drive operation.',
    701: 'Unable to read/create cloud app directory.',
    702: 'Unable to read cloud app directory.',
    703: 'Unable to confirm existing cloud file status.',
    704: 'Unable to create cloud file.',
    705: 'Unable to update cloud file.',
    706: 'Unble to delete cloud file.',
    707: 'Unable to read cloud file.',
    708: 'Unable to get cloud file link.',
    800: 'Unable to obtain user location.',
    801: 'Unable to calculate declination.',
    802: 'Unable to connect to the bluetooth device.',
    803: 'Unable to initialize bluetooth module.',
    804: 'Unable to obtain bluetooth state.',
    805: 'Unable to start blutooth notification.',
    806: 'Unable to stop bluetooth notification',
    807: 'Unable to write to buletooth device',
    808: 'Unable to read bluetooth RSSI data',
    809: 'Unable to retrieve services from bluetooth device',
    810: 'Unable to read bluetooth characteristic',
    811: 'Unable to get list of connected bluetooth devices',
    812: 'Unable to confirm if bluetooth device is connected',
    813: 'Unable to detect bluetoth state change',
    814: 'Unable to detect bluetooth scan status',
    815: 'Unable to listen for a new device',
    816: 'Unable to listen for new characteristic values',
    817: 'Unable to scan for bluetooth devices',
    818: 'Unable to listen for connected devices',
    819: 'Unable to disconnect from the device',
    820: 'Unable to stop scan for bluetooth devices',
    821: 'Unable to listen for disconnected bluetooth devices',
    822: `Unable to connect to multimeter. Don't forget to press button on multimeter to wake it up.`,
    823: 'Unable to share location',
    824: 'Adjust toggle on the side of multimeter to capture reading of this type.',
    825: 'Measurement stopped, because over range value was detected. Fuse replacement may be required!',
    826: 'Camera is not available',
    827: 'Image library is not available.',
    900: 'Unable to obtain permission to proceed with operation.',
    901: 'Need permission to write to Downloads folder.',
    902: 'Location permission was not granted.',
    903: 'You need to grant bluetooth permission to use this feature.',
    904: 'You need to grant camera permission to use this feature.'
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