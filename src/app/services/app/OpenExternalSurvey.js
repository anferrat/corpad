import { Error, errors } from "../../utils/Error"
import { SurveyLoadingStatuses } from "../../../constants/global"

export class OpenExternalSurvey {
    constructor(loadExternalSurveyService, saveCurrentSurveyService, warningHandler, currentSurveyStatusService, resetCurrentSurveyService, fileSystemRepo) {
        this.loadExternalSurveyService = loadExternalSurveyService
        this.saveCurrentSurveyService = saveCurrentSurveyService
        this.warningHandler = warningHandler
        this.currentSurveyStatusService = currentSurveyStatusService
        this.resetCurrentSurveyService = resetCurrentSurveyService
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(url, isLoaded = undefined, callback = undefined) {
        const path = this.fileSystemRepo.getPathFromUri(url)
        let surveyLoaded = isLoaded === undefined ? (await this.currentSurveyStatusService.execute()).isLoaded : isLoaded
        if (surveyLoaded) {
            const confirm = await this.warningHandler.execute('Another survey is active. It will be closed and changes will be saved. Would you like to proceed?', 'Proceed', 'Cancel')
            if (confirm) {
                if (callback)
                    callback(SurveyLoadingStatuses.SAVING)
                await this.saveCurrentSurveyService.execute()
                await this.resetCurrentSurveyService.execute()
                try {
                    if (callback)
                        callback(SurveyLoadingStatuses.LOADING)
                    return await this.loadExternalSurveyService.execute(path)
                }
                catch (er) {
                    this.warningHandler.executeWarning('Unable to load external survey file')
                    return {
                        isLoaded: false,
                        syncTime: null,
                        fileName: null,
                        name: null,
                        isCloud: false
                    }
                }
            }
            else
                throw new Error(errors.GENERAL, 'Operation is cancelled', 'Operation is cancelled by user', 101)
        }
        else {
            if (callback)
                callback(SurveyLoadingStatuses.LOADING)
            return await this.loadExternalSurveyService.execute(path)
        }
    }
}