import { Platform } from 'react-native'
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager'
import { Error, errors } from '../../utils/Error'

export class NdefRepository {
    constructor() {
    }

    async start(message) {
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef, Platform.select({
                ios: {
                    alertMessage: message,
                },
                macos: {
                    alertMessage: message,
                },
                android: {}
            }))
        }
        catch (er) {
            throw new Error(errors.NFC, 'Unable to request technology', er)
        }
    }

    async getDeviceStatus() {
        try {
            const [isSupported, isEnabled] = await Promise.all([NfcManager.isSupported(), NfcManager.isEnabled()])
            return {
                isSupported,
                isEnabled
            }
        }
        catch (er) {
            throw new Error(errors.NFC, 'Unable to check NFC adapter status', er)
        }
    }

    async getTagStatus() {
        //Run only after start()
        try {
            const { status, capacity } = await NfcManager.ndefHandler.getNdefStatus()
            //statuses matching global/constants NdefTagStatuses
            return {
                status,
                capacity
            }
        }
        catch (er) {
            throw new Error(errors.NFC, 'Unable to get tag status', er)
        }
    }

    getUriRecordSize(uri) {
        // https://www.oreilly.com/library/view/beginning-nfc/9781449324094/ch04.html about NDEF Message structure
        // Header is 8 bytes, Payload ID is empty.
        try {
            const size = Ndef.uriRecord(uri).payload.length + 8
            return size
        }
        catch (er) {
            throw new Error(errors.NFC, `Unable to get size of message ${uri}`, er)
        }
    }

    async readTag() {
        try {
            const message = await NfcManager.getTag()
            if (Platform.OS === 'ios' || Platform.OS === 'macos')
                await NfcManager.setAlertMessageIOS('Success')
            return message
        }
        catch (er) {
            throw new Error(errors.NFC, 'Unable to read tag', er)
        }
    }

    decodeUri(message) {
        const isFormatted = Ndef.isType(message.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)
        if (isFormatted)
            return Ndef.uri.decodePayload(message.ndefMessage[0].payload)
        else
            throw new Error(errors.NFC, 'Unable to decode URI from tag data', 'Tag data is of invalid type', 843)
    }

    async writeUriToTag(uri) {

        try {
            if (!uri)
                throw 'Uri is not defined.'
            const bytes = Ndef.encodeMessage([Ndef.uriRecord(uri)])
            if (!bytes)
                throw 'No data to write. Chech encoding.'
            await NfcManager.ndefHandler.writeNdefMessage(bytes)
            if (Platform.OS === 'ios' || Platform.OS === 'macos')
                await NfcManager.setAlertMessageIOS('Success')
        }
        catch (er) {
            throw new Error(errors.NFC, 'Unable to write NDEF message to the tag', er)
        }
    }

    async stop() {
        await NfcManager.cancelTechnologyRequest()
    }

    async invalidateSessionIOS(errorMessage) {
        if (Platform.OS === 'ios' || Platform.OS === 'macos')
            await NfcManager.invalidateSessionWithErrorIOS(errorMessage)
    }
}