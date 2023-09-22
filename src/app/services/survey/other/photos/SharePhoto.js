import { FileMimeTypes } from "../../../../../constants/global"

export class SharePhoto {
    constructor(shareService) {
        this.shareService = shareService
    }

    async execute(path) {
        await this.shareService.shareFile(path, FileMimeTypes.IMAGE)
    }
}