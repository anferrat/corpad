import { ExternalLinkTypes, FileMimeTypes, FileSystemLocations } from "../../../../../constants/global"

export class ExportQrCode {
    constructor(qrCodeRepo, convertItemToLinkService, filesystemRepo) {
        this.qrCodeRepo = qrCodeRepo
        this.convertItemToLinkService = convertItemToLinkService
        this.filesystemRepo = filesystemRepo
        this.FILE_PREFIX = 'QR-CODE_'
    }

    async execute(itemId, itemType) {
        //1. Generating a link
        const { link, name } = await this.convertItemToLinkService.execute(itemId, itemType, ExternalLinkTypes.QR_CODE)

        //2. Native lib creates PNG of qr code in cahce directory
        const uri = await this.qrCodeRepo.generatePngFile(link)

        //3. Generating a name for qrcode file and placing it in exports folder
        const filename = await this.filesystemRepo.getFileName(`${this.FILE_PREFIX}${name}.png`, FileSystemLocations.EXPORTS)
        const exportPath = await this.filesystemRepo.getLocation(FileSystemLocations.EXPORTS)
        const destinationPath = `${exportPath}/${filename}`

        //4. Copying qrcode file
        await this.filesystemRepo.copyFile(uri, destinationPath)

        //cleaning up cache directory
        await this.filesystemRepo.removeDir(FileSystemLocations.CACHE)

        return {
            path: destinationPath,
            mimeType: FileMimeTypes.IMAGE
        }
    }
}