import { Controller } from "../../utils/Controller"
import { resetCurrentSurveyService, saveCurrentSurveyService } from "../_instances/survey_manager"

class SurveyController extends Controller {
    constructor(saveCurrentSurveyService, resetCurrentSurveyService) {
        super()
        this.saveCurrentSurveyService = saveCurrentSurveyService
        this.resetCurrentSurveyService = resetCurrentSurveyService

    }

    async saveAndReset(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 104, async () => {
            const { fileName, isCloud, syncTime, cloudId } = await this.saveCurrentSurveyService.execute()
            await this.resetCurrentSurveyService.execute()
            return { fileName, isCloud, syncTime, cloudId }
        })
    }

    async save(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 105, async () => {
            return await this.saveCurrentSurveyService.execute()
        })
    }

    async reset(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 106, async () => {
            return await this.resetCurrentSurveyService.execute()
        })
    }
}

const surveyController = new SurveyController(
    saveCurrentSurveyService,
    resetCurrentSurveyService
)

export const saveAndResetSurvey = (onError, onSuccess) => surveyController.saveAndReset(onError, onSuccess)

export const saveSurvey = (onError, onSuccess) => surveyController.save(onError, onSuccess)

export const resetSurvey = (onError, onSuccess) => surveyController.reset(onError, onSuccess)