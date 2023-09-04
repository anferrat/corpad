import { FileSystemLocations } from "../../../../constants/global"

export class CopySurveyFileToDownloads {
    constructor(fileSystemRepo, permissions) {
        this.fileSystemRepo = fileSystemRepo
        this.permissions = permissions
    }

    async execute(path) {
        await this.permissions.storage()
        const filename = path.substring(path.lastIndexOf('/') + 1, path.length)
        const destinationPath = await this.fileSystemRepo.getLocation(FileSystemLocations.DOWNLOADS)
        await this.fileSystemRepo.copyFile(path, `${destinationPath}/${filename}`)
    }
}