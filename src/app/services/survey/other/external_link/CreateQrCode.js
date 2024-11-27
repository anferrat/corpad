import { ExternalLinkTypes } from "../../../../../constants/global"

export class CreateQrCode {
    constructor(qrCodeRepo, convertItemToLinkService) {
        this.qrCodeRepo = qrCodeRepo
        this.convertItemToLinkService = convertItemToLinkService
    }

    async execute(itemId, itemType) {
        const { link } = await this.convertItemToLinkService.execute(itemId, itemType, ExternalLinkTypes.QR_CODE)
        return await this.qrCodeRepo.generateSvgString(link)
    }
}