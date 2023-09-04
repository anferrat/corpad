import { FileSystemLocations } from "../../../../constants/global"

export class SaveSurveyFileToDownloads {
    constructor(exportSurveyFileService, fileSystemRepo, permissions) {
        this.exportSurveyFileService = exportSurveyFileService
        this.fileSystemRepo = fileSystemRepo
        this.permissions = permissions
    }

    async execute(fileId) {
        //fileId - cloudId for cloud file and path for local file
        await this.permissions.storage()
        const { path } = await this.exportSurveyFileService.execute(fileId)
        const filename = path.substring(path.lastIndexOf('/') + 1, path.length)
        const destinationPath = await this.fileSystemRepo.getLocation(FileSystemLocations.DOWNLOADS)
        await this.fileSystemRepo.copyFile(path, `${destinationPath}/${filename}`)
        await this.fileSystemRepo.scanFile(`${destinationPath}/${filename}`)
        await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP)
    }
}