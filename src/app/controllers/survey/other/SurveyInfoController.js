import { Controller } from "../../../utils/Controller"
import { ReferenceCellRepository } from "../../../repository/sqlite/ReferenceCellRepository"
import { GetSurveyInfo } from "../../../services/survey/other/survey_info/GetSurveyInfo"
import { TestPointRepository } from "../../../repository/sqlite/TestPointRepository"
import { RectifierRepository } from "../../../repository/sqlite/RectifierRepository"
import { PipelineRepository } from "../../../repository/sqlite/PipelineRepository"
import { PotentialRepository } from "../../../repository/sqlite/PotentialRepository"
import { GeolocationCalculator } from "../../../services/other/GeolocationCalculator"
import { SurveyValidation } from "../../../validation/SurveyValidation"
import { UpdateSurveyName } from "../../../services/survey/other/survey_info/UpdateSurveyName"
import { SurveyRepository } from "../../../repository/sqlite/SurveyRepository"

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
    new TestPointRepository(),
    new RectifierRepository(),
    new PipelineRepository(),
    new PotentialRepository(),
    new ReferenceCellRepository(),
    new GeolocationCalculator(),
    new SurveyRepository()
)

export const getSurveyInfo = (onError, onSuccess) => surveyInfoController.getInfo(onError, onSuccess)

export const updateSurveyName = ({ name }, onError, onSuccess) => surveyInfoController.updateName({ name }, onError, onSuccess)
