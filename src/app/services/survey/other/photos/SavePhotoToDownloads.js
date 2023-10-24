import { FileSystemLocations } from "../../../../../constants/global"

export class SavePhotoToDownloads {
    constructor(fileSystemRepo, permissions, fileNameGenerator) {
        this.fileSystemRepo = fileSystemRepo
        this.permissions = permissions
        this.fileNameGenerator = fileNameGenerator
    }

    async execute(path, name) {
        await this.permissions.storage()
        const ext = path.substring(path.lastIndexOf('.') + 1, path.length)
        const destinationPath = await this.fileSystemRepo.getLocation(FileSystemLocations.DOWNLOADS)
        const fileName = this.fileNameGenerator.execute(`image-${name}`, ext)
        await this.fileSystemRepo.copyFile(path, `${destinationPath}/${fileName}`)
    }
}