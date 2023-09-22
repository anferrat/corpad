import { FileSystemLocations } from "../../../../../constants/global"

export class SavePhotoToDownloads {
    constructor(fileSystemRepo, permissions) {
        this.fileSystemRepo = fileSystemRepo
        this.permissions = permissions
    }

    async execute(path, name) {
        await this.permissions.storage()
        const ext = path.substring(path.lastIndexOf('.') + 1, path.length)
        const destinationPath = await this.fileSystemRepo.getLocation(FileSystemLocations.DOWNLOADS)
        await this.fileSystemRepo.copyFile(path, `${destinationPath}/image-${name}.${ext}`)
    }
}