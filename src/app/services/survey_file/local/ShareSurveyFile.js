export class ShareSurveyFile {
    constructor(exportSurveyFileService, fileSystemRepo, shareService) {
        this.exportSurveyFileService = exportSurveyFileService
        this.fileSystemRepo = fileSystemRepo
        this.shareService = shareService
    }

    async execute(fileId) {
        const { path, mimeType } = await this.exportSurveyFileService.execute(fileId)
        await this.shareService.shareFile(path, mimeType)
        await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP)
    }
}