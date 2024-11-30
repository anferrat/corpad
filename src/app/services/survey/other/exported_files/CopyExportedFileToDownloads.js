import { FileSystemLocations } from "../../../../../constants/global"

export class CopyExportedFileToDownloads {
    constructor(fileSystemRepo, permissions) {
        this.fileSystemRepo = fileSystemRepo
        this.permissions = permissions
    }

    async execute(path) {
        await this.permissions.storage()
        const filename = path.split('\\').pop().split('/').pop()
        const destinationPath = await this.fileSystemRepo.getLocation(FileSystemLocations.DOWNLOADS)
        try {
            await this.fileSystemRepo.copyFile(path, `${destinationPath}/${filename}`)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Unable to save to Downloads', er, 416)
        }
        await this.fileSystemRepo.scanFile(`${destinationPath}/${filename}`)
    }
}