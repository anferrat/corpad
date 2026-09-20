import { Error, errors } from "../../utils/Error"
import { SurveyLoadingStatuses } from "../../../constants/global"

export class OpenExternalSurvey {
    constructor(loadExternalSurveyService, saveCurrentSurveyService, warningHandler, currentSurveyStatusService, resetCurrentSurveyService, fileSystemRepo, surveyOperationLock) {
        this.loadExternalSurveyService = loadExternalSurveyService
        this.saveCurrentSurveyService = saveCurrentSurveyService
        this.warningHandler = warningHandler
        this.currentSurveyStatusService = currentSurveyStatusService
        this.resetCurrentSurveyService = resetCurrentSurveyService
        this.fileSystemRepo = fileSystemRepo
        this.surveyOperationLock = surveyOperationLock
    }

    async execute(file, isLoaded = undefined, callback = undefined) {
        return await this.surveyOperationLock.execute(async () => {
            let surveyLoaded = isLoaded === undefined ? (await this.currentSurveyStatusService.execute()).isLoaded : isLoaded
            if (surveyLoaded) {
                const confirm = await this.warningHandler.execute({ key: 'warnings.messages.activeSurvey' }, 'Proceed', 'Cancel')
                if (confirm) {
                    if (callback)
                        callback(SurveyLoadingStatuses.SAVING)
                    await this.saveCurrentSurveyService.execute()
                    await this.resetCurrentSurveyService.execute()
                    try {
                        if (callback)
                            callback(SurveyLoadingStatuses.LOADING)
                        return await this.loadExternalSurveyService.execute(file)
                    }
                    catch (er) {
                        callback(SurveyLoadingStatuses.ERROR, er.code ?? 437)
                        return {
                            isLoaded: false,
                            syncTime: null,
                            fileName: null,
                            name: null,
                            isCloud: false,
                            uid: null,
                        }
                    }
                }
                else
                    throw new Error(errors.GENERAL, 'Operation is cancelled', 'Operation is cancelled by user', 101)
            }
            else {
                if (callback)
                    callback(SurveyLoadingStatuses.LOADING)
                return await this.loadExternalSurveyService.execute(file)
            }
        })
    }
}
