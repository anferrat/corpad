import { Controller } from "../../utils/Controller"
import { resetCurrentSurveyService, saveCurrentSurveyService } from "../_instances/survey_manager"

class SurveyController extends Controller {
    constructor(saveCurrentSurveyService, resetCurrentSurveyService) {
        super()
        this.saveCurrentSurveyService = saveCurrentSurveyService
        this.resetCurrentSurveyService = resetCurrentSurveyService

    }

    async saveAndReset(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 104, async () => {
            const { onUpload } = params
            const { fileName, isCloud, syncTime, cloudId } = await this.saveCurrentSurveyService.execute(onUpload)
            await this.resetCurrentSurveyService.execute()
            return { fileName, isCloud, syncTime, cloudId }
        })
    }

    async save(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 105, async () => {
            const { onUpload } = params
            return await this.saveCurrentSurveyService.execute(onUpload)
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

export const saveAndResetSurvey = ({ onUpload }, onError, onSuccess) => surveyController.saveAndReset({ onUpload }, onError, onSuccess)

export const saveSurvey = ({ onUpload }, onError, onSuccess) => surveyController.save({ onUpload }, onError, onSuccess)

export const resetSurvey = (onError, onSuccess) => surveyController.reset(onError, onSuccess)