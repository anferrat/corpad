import { FileSystemLocations } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"

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
        try {
            await this.fileSystemRepo.copyFile(path, `${destinationPath}/${filename}`)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Unable to save to Downloads', er, 416)
        }
        await this.fileSystemRepo.scanFile(`${destinationPath}/${filename}`)
        await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP)
    }
}