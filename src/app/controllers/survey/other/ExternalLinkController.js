import { GenerateCompositeItem } from "../../../services/byte_converter/GenerateCompositeItem"
import { LinkDecoder } from "../../../services/byte_converter/decode/LinkDecoder"
import { GetCurrentSurveyStatus } from "../../../services/survey/manager/GetCurrentSurveyStatus"
import { CreatePipelineMap } from "../../../services/survey/other/create_map/CreatePipelineMap"
import { CreatePotentialTypeMap } from "../../../services/survey/other/create_map/CreatePotentialTypeMap"
import { CreateReferenceCellMap } from "../../../services/survey/other/create_map/CreateReferenceCellMap"
import { AddLinkDataToSurvey } from "../../../services/survey/other/external_link/AddLinkDataToSurvey"
import { ConvertLinkToItem } from "../../../services/survey/other/external_link/ConvertLinkToItem"
import { FindItemInSurvey } from "../../../services/survey/other/external_link/FindItemInSurvey"
import { GetPipelineMatchingList } from "../../../services/survey/other/external_link/GetPipelineMatchingList"
import { Controller } from "../../../utils/Controller"
import { geolocationCalculator, subitemFactory, warningHandler } from "../../_instances/general_services"
import { listPresenter, potentialPresenter } from "../../_instances/presenters"
import { defaultNameRepo, pipelineRepo, potentialRepo, potentialTypeRepo, rectifierRepo, referenceCellRepo, settingRepo, subitemRepo, surveyRepo, testPointRepo } from "../../_instances/repositories"

class ExternalLinkController extends Controller {
    constructor(defaultNameRepo, subitemFactory, linkDecoder, potentialPresenter, testPointRepo, rectifierRepo, geolocationCalculator, surveyRepo, settingRepo, subitemRepo, potentialRepo, potentialTypeRepo, referenceCellRepo, pipelineRepo, warningHandler, listPresenter) {
        super()
        this.generateCompositeItem = new GenerateCompositeItem(defaultNameRepo, subitemFactory)
        this.createPipelineMapService = new CreatePipelineMap()
        this.createPotentialTypeMapService = new CreatePotentialTypeMap()
        this.createReferenceCellMapService = new CreateReferenceCellMap()
        this.getCurrentSurveyStatusService = new GetCurrentSurveyStatus(surveyRepo, settingRepo)
        this.convertLinkToItem = new ConvertLinkToItem(linkDecoder, this.generateCompositeItem, potentialPresenter, this.getCurrentSurveyStatusService)
        this.findItemInSurvey = new FindItemInSurvey(testPointRepo, rectifierRepo, geolocationCalculator, surveyRepo)
        this.addLinkDataToSurveyService = new AddLinkDataToSurvey(linkDecoder, this.generateCompositeItem, this.createPipelineMapService, this.createPotentialTypeMapService, this.createReferenceCellMapService, testPointRepo, rectifierRepo, subitemRepo, potentialRepo, pipelineRepo, referenceCellRepo, potentialTypeRepo, warningHandler)
        this.getPipelineListService = new GetPipelineMatchingList(pipelineRepo, listPresenter, linkDecoder, this.generateCompositeItem, this.createPipelineMapService)
    }


    decodeLink({ link }, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 828, () => {
            return this.convertLinkToItem.execute(link)
        })
    }

    findItems({ uid, name, itemType }, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 830, () => {
            return this.findItemInSurvey.execute({ uid, name, itemType })
        })
    }

    findItemsByCoordinate({ itemType, latitude, longitude }, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 831, () => {
            return this.findItemInSurvey.executeByDistance({ itemType, latitude, longitude })
        })
    }

    addLinkDataToSurvey({ link, pipelineMapData }, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 829, () => {
            return this.addLinkDataToSurveyService.execute(link, pipelineMapData)
        })
    }

    getPipelineMatchingList({ link }, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 832, () => {
            return this.getPipelineListService.execute(link)
        })
    }
}

const externalLinkController = new ExternalLinkController(
    defaultNameRepo,
    subitemFactory,
    new LinkDecoder(),
    potentialPresenter,
    testPointRepo,
    rectifierRepo,
    geolocationCalculator,
    surveyRepo,
    settingRepo,
    subitemRepo,
    potentialRepo,
    potentialTypeRepo,
    referenceCellRepo,
    pipelineRepo,
    warningHandler,
    listPresenter
)

export const decodeLink = ({ link }, onError, onSuccess) => externalLinkController.decodeLink({ link }, onError, onSuccess)

export const findItems = ({ uid, name, itemType }, onError, onSuccess) => externalLinkController.findItems({ uid, name, itemType }, onError, onSuccess)

export const findItemsByCoordinate = ({ itemType, latitude, longitude }, onError, onSuccess) => externalLinkController.findItemsByCoordinate({ itemType, latitude, longitude }, onError, onSuccess)

export const addLinkDataToSurvey = ({ link, pipelineMapData }, onError, onSuccess) => externalLinkController.addLinkDataToSurvey({ link, pipelineMapData }, onError, onSuccess)

export const getPipelineMatchingList = ({ link }, onError, onSuccess) => externalLinkController.getPipelineMatchingList({ link }, onError, onSuccess)