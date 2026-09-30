import { FileSystemLocations } from "../../../../constants/global"

export class ShareSurveyFile {
    constructor(exportSurveyFileService, fileSystemRepo, shareService) {
        this.exportSurveyFileService = exportSurveyFileService
        this.fileSystemRepo = fileSystemRepo
        this.shareService = shareService
    }

    async execute(fileId, onDownload) {
        try {
            const { path, mimeType } = await this.exportSurveyFileService.execute(fileId, onDownload)
            await this.shareService.shareFile(path, mimeType, false)
        }
        finally {
            await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP)
        }
    }
}
