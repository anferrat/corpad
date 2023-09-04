import { SurveyLoadingStatuses } from "../../../../constants/global"

export class PickExternalSurveyFile {
    constructor(loadSurveyService, documentPickerService) {
        this.loadSurveyService = loadSurveyService
        this.documentPickerService = documentPickerService
    }

    async execute(callback) {
        callback(SurveyLoadingStatuses.SELECTING)
        const file = await this.documentPickerService.pickSurveyFile()
        callback(SurveyLoadingStatuses.LOADING, file)
        const meta = await this.loadSurveyService.execute(file)
        callback(SurveyLoadingStatuses.COMPLETED)
        return meta
    }
}