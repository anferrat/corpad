import { Controller } from "../../../utils/Controller"
import { GetSurveyInfo } from "../../../services/survey/other/survey_info/GetSurveyInfo"
import { SurveyValidation } from "../../../validation/SurveyValidation"
import { UpdateSurveyName } from "../../../services/survey/other/survey_info/UpdateSurveyName"
import { pipelineRepo, potentialRepo, rectifierRepo, referenceCellRepo, surveyRepo, testPointRepo } from "../../_instances/repositories"
import { geolocationCalculator } from "../../_instances/general_services"

class SurveyInfoController extends Controller {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, potentialRepo, referenceCellRepo, geolocationCalculator, surveyRepo) {
        super()
        this.getSurveyInfoService = new GetSurveyInfo(testPointRepo, rectifierRepo, pipelineRepo, potentialRepo, referenceCellRepo, surveyRepo, geolocationCalculator)
        this.updateSurveyNameService = new UpdateSurveyName(surveyRepo)
        this.validation = new SurveyValidation()
    }

    getInfo(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 626, async () => {
            return this.getSurveyInfoService.execute()
        })
    }

    updateName(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 625, async () => {
            const { name } = this.validation.updateName(params)
            return this.updateSurveyNameService.execute(name)
        })
    }

}

const surveyInfoController = new SurveyInfoController(
    testPointRepo,
    rectifierRepo,
    pipelineRepo,
    potentialRepo,
    referenceCellRepo,
    geolocationCalculator,
    surveyRepo
)

export const getSurveyInfo = (onError, onSuccess) => surveyInfoController.getInfo(onError, onSuccess)

export const updateSurveyName = ({ name }, onError, onSuccess) => surveyInfoController.updateName({ name }, onError, onSuccess)
