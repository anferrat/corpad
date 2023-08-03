import { SurveyLoadingStatuses } from "../../../../constants/global"

export class LoadExternalSurveyFile {
    constructor(loadSurveyService, documentPickerService, fileSystemRepo) {
        this.loadSurveyService = loadSurveyService
        this.documentPickerService = documentPickerService
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(callback) {
        callback(SurveyLoadingStatuses.SELECTING)
        const file = await this.documentPickerService.pickSurveyFile()
        callback(SurveyLoadingStatuses.LOADING, file)
        const path = this.fileSystemRepo.getPathFromUri(file.uri)
        const meta = await this.loadSurveyService.execute(path)
        callback(SurveyLoadingStatuses.COMPLETED)
        return meta
    }
}