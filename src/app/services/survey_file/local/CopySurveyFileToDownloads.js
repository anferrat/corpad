import { FileSystemLocations } from "../../../../constants/global"

export class CopySurveyFileToDownloads {
    constructor(fileSystemRepo, permissions) {
        this.fileSystemRepo = fileSystemRepo
        this.permissions = permissions
    }

    async execute(path) {
        await this.permissions.storage()
        const fileName = path.substring(path.lastIndexOf('/') + 1, path.length)
        await this.fileSystemRepo.copyFile(fileName, path, FileSystemLocations.DOWNLOADS)
    }
}