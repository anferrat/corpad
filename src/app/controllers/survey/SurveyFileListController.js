import { SurveyFileListPresenter } from "../../presenters/SurveyFileListPresenter"
import { FileSystemRepository } from "../../repository/fs/FileSystemRepository"
import { GetSurveyList } from "../../services/survey_file/local/GetSurveyList"
import { Controller } from "../../utils/Controller"


class SurveyFileController extends Controller {
    constructor(fileSystemRepo, surveyFileListPresenter) {
        super()

        this.getLocalSurveyListService = new GetSurveyList(fileSystemRepo, surveyFileListPresenter)
    }

    getList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 400, async () => {
            const { isCloud } = params
            return this.getLocalSurveyListService.execute()
        })
    }
}

const surveyFileController = new SurveyFileController(
    new FileSystemRepository(),
    new SurveyFileListPresenter()
)

export const getSurveyList = (params, onError, onSuccess) => surveyFileController.getList(params, onError, onSuccess)

