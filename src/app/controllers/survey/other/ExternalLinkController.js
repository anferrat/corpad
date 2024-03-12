import { GenerateCompositeItem } from "../../../services/byte_converter/GenerateCompositeItem"
import { LinkDecoder } from "../../../services/byte_converter/decode/LinkDecoder"
import { LinkEncoder } from "../../../services/byte_converter/encode/LinkEncoder"
import { GetCurrentSurveyStatus } from "../../../services/survey/manager/GetCurrentSurveyStatus"
import { CreatePipelineMap } from "../../../services/survey/other/create_map/CreatePipelineMap"
import { CreatePotentialTypeMap } from "../../../services/survey/other/create_map/CreatePotentialTypeMap"
import { CreateReferenceCellMap } from "../../../services/survey/other/create_map/CreateReferenceCellMap"
import { AddLinkDataToSurvey } from "../../../services/survey/other/external_link/AddLinkDataToSurvey"
import { RemoveNfcWritingListener } from "../../../services/survey/other/external_link/RemoveNfcWritingListener"
import { ConvertItemToLink } from "../../../services/survey/other/external_link/ConvertItemToLink"
import { ConvertLinkToItem } from "../../../services/survey/other/external_link/ConvertLinkToItem"
import { FindItemInSurvey } from "../../../services/survey/other/external_link/FindItemInSurvey"
import { GetPipelineMatchingList } from "../../../services/survey/other/external_link/GetPipelineMatchingList"
import { Controller } from "../../../utils/Controller"
import { geolocationCalculator, subitemFactory, warningHandler } from "../../_instances/general_services"
import { listPresenter, potentialPresenter } from "../../_instances/presenters"
import { defaultNameRepo, externalLinkRepo, ndefRepo, pipelineRepo, potentialRepo, potentialTypeRepo, rectifierRepo, referenceCellRepo, settingRepo, subitemRepo, surveyRepo, testPointRepo } from "../../_instances/repositories"
import { AddNfcWritingListener } from "../../../services/survey/other/external_link/AddNfcWritingListener"
import { ExternalLinkValidation } from "../../../validation/ExternalLinkValidation"
import { LogExternalLinkRecord } from "../../../services/survey/other/external_link/LogExternalLinkRecord"
import { GetExternalLinkRecords } from "../../../services/survey/other/external_link/GetExternalLinkRecords"
import { DeleteAllExternalLinkRecords } from "../../../services/survey/other/external_link/DeleteAllExternalLinkRecords"

class ExternalLinkController extends Controller {
    constructor(defaultNameRepo, subitemFactory, linkDecoder, potentialPresenter, testPointRepo, rectifierRepo, geolocationCalculator, surveyRepo, settingRepo, subitemRepo, potentialRepo, potentialTypeRepo, referenceCellRepo, pipelineRepo, warningHandler, listPresenter, linkEncoder, ndefRepo, externalLinkRepo) {
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
        this.convertItemToLinkService = new ConvertItemToLink(testPointRepo, rectifierRepo, pipelineRepo, potentialTypeRepo, referenceCellRepo, linkEncoder, ndefRepo)
        this.removeNfcWritingListenerService = new RemoveNfcWritingListener(ndefRepo)
        this.addNfcWritingListenerService = new AddNfcWritingListener(ndefRepo, this.convertItemToLinkService)
        this.logExternalLinkService = new LogExternalLinkRecord(externalLinkRepo)
        this.getExternalLinkRecordsService = new GetExternalLinkRecords(externalLinkRepo)
        this.deleteAllExternalLinkRecordsService = new DeleteAllExternalLinkRecords(externalLinkRepo)

        this.validation = new ExternalLinkValidation()
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

    removeListener(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 838, () => {
            return this.removeNfcWritingListenerService.remove()
        })
    }

    addListener({ itemId, itemType }, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 839, () => {
            return this.addNfcWritingListenerService.addListener(onError, onSuccess, itemId, itemType)
        })
    }

    logExternalLink(data, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 661, () => {
            const { tagId, name, linkType, technician, itemType, location, link } = this.validation.logExternalLink(data)
            return this.logExternalLinkService.execute({ tagId, name, linkType, technician, itemType, location, link })
        })
    }

    getExternalLinkRecords(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 662, () => {
            return this.getExternalLinkRecordsService.execute()
        })
    }

    deleteAllExternalLinkRecords(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 663, () => {
            return this.deleteAllExternalLinkRecordsService.execute()
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
    listPresenter,
    new LinkEncoder(),
    ndefRepo,
    externalLinkRepo
)

export const decodeLink = ({ link }, onError, onSuccess) => externalLinkController.decodeLink({ link }, onError, onSuccess)

export const findItems = ({ uid, name, itemType }, onError, onSuccess) => externalLinkController.findItems({ uid, name, itemType }, onError, onSuccess)

export const findItemsByCoordinate = ({ itemType, latitude, longitude }, onError, onSuccess) => externalLinkController.findItemsByCoordinate({ itemType, latitude, longitude }, onError, onSuccess)

export const addLinkDataToSurvey = ({ link, pipelineMapData }, onError, onSuccess) => externalLinkController.addLinkDataToSurvey({ link, pipelineMapData }, onError, onSuccess)

export const getPipelineMatchingList = ({ link }, onError, onSuccess) => externalLinkController.getPipelineMatchingList({ link }, onError, onSuccess)

export const removeNfcWritingListener = (onError, onSuccess) => externalLinkController.removeListener(onError, onSuccess)

export const addNfcWritingListener = ({ itemId, itemType }, onError, onSuccess) => externalLinkController.addListener({ itemId, itemType }, onError, onSuccess)

export const logExternalLink = ({ tagId, name, linkType, technician, itemType, location, link }, onError, onSuccess) => externalLinkController.logExternalLink({ tagId, name, linkType, technician, itemType, location, link }, onError, onSuccess)

export const getExternalLinkRecords = (onError, onSuccess) => externalLinkController.getExternalLinkRecords(onError, onSuccess)

export const deleteAllExternalLinkRecords = (onError, onSuccess) => externalLinkController.deleteAllExternalLinkRecords(onError, onSuccess)