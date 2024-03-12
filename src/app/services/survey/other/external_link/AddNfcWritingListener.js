import { NdefWritingStatuses, NdefTagStatuses } from "../../../../../constants/global"

export class AddNfcWritingListener {
    constructor(ndefRepo, convertItemToLinkService) {
        this.ndefRepo = ndefRepo
        this.convertItemToLinkService = convertItemToLinkService
    }

    async addListener(onError, onSuccess, itemId, itemType) {
        try {
            const { link, size } = await this.convertItemToLinkService.execute(itemId, itemType)
            onSuccess(NdefWritingStatuses.LINK_CREATED, { link, size })
            const { isEnabled, isSupported } = await this.ndefRepo.getDeviceStatus()
            onSuccess(NdefWritingStatuses.NFC_MODULE_STATUS_RECEIVED, { isEnabled, isSupported })
            if (!isEnabled)
                onError(840)
            if (!isSupported)
                onError(841)
            if (isEnabled && isSupported) {
                const alertMessageIOS = `Approach an NFC label. \n Writing ${size} bytes.`
                await this.ndefRepo.start(alertMessageIOS)
                onSuccess(NdefWritingStatuses.NDEF_TECHNOLOGY_REQUESTED)
                const { status, capacity } = await this.ndefRepo.getTagStatus()
                onSuccess(NdefWritingStatuses.TAG_STATUS_RECEIVED, { status, capacity })
                if (status === NdefTagStatuses.NOT_SUPPORTED)
                    onError(835)
                if (status === NdefTagStatuses.READ_ONLY)
                    onError(836)
                if (size > capacity)
                    onError(837)
                if (status !== NdefTagStatuses.NOT_SUPPORTED && status !== NdefTagStatuses.READ_ONLY && size <= capacity) {
                    onSuccess(NdefWritingStatuses.WRITE_STARTED)
                    await this.ndefRepo.writeUriToTag(link)
                    onSuccess(NdefWritingStatuses.WRITE_COMPLETED)
                    await this.ndefRepo.stop()
                }
            }
        }
        catch (er) {
            onError(839)
            this.ndefRepo.stop()
        }
    }
}
