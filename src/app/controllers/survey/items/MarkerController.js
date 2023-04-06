import { BasicPresenter } from "../../../presenters/BasciPresenter"
import { ListPresenter } from "../../../presenters/ListPresenter"
import { FileSystemRepository } from "../../../repository/fs/FileSystemRepository"
import { RectifierRepository } from "../../../repository/sqlite/RectifierRepository"
import { SurveyRepository } from "../../../repository/sqlite/SurveyRepository"
import { TestPointRepository } from "../../../repository/sqlite/TestPointRepository"
import { FileNameGenerator } from "../../../services/other/FileNameGenerator"
import { KmlParser } from "../../../services/other/KmlParser"
import { ExportMarkers } from "../../../services/survey/items/markers/ExportMarkers"
import { GetMarker } from "../../../services/survey/items/markers/GetMarker"
import { GetMarkerList } from "../../../services/survey/items/markers/GetMarkerList"
import { UpdateMarker } from "../../../services/survey/items/markers/UpdateMarker"
import { Controller } from "../../../utils/Controller"
import { MarkerValidation } from "../../../validation/MarkerValidation"

class MarkerController extends Controller {
    constructor(testPointRepo, rectifierRepo, fileSystemRepo, basicPresenter, listPresenter, KmlParser, fileNameGenerator, surveyRepo) {
        super()
        this.validation = new MarkerValidation()
        this.getMarkerService = new GetMarker(testPointRepo, rectifierRepo, basicPresenter)
        this.getMarkerListService = new GetMarkerList(testPointRepo, rectifierRepo, listPresenter)
        this.updateMarkerService = new UpdateMarker(testPointRepo, rectifierRepo, basicPresenter)
        this.exportMarkersService = new ExportMarkers(fileSystemRepo, KmlParser, fileNameGenerator, surveyRepo)
    }

    getMarker(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 616, async () => {
            const { itemType, itemId } = this.validation.getMarker(params)
            return this.getMarkerService.execute(itemType, itemId)
        })
    }

    getList(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 615, async () => {
            return this.getMarkerListService.execute()
        })
    }

    updateMarker(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 615, async () => {
            const markerData = this.validation.update(params)
            return this.updateMarkerService.execute(markerData)
        })
    }

    exportMarkers(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 615, async () => {
            const markers = await this.getMarkerListService.execute()
            return this.exportMarkersService.execute(markers)
        })
    }
}

const markerController = new MarkerController(
    new TestPointRepository(),
    new RectifierRepository(),
    new FileSystemRepository(),
    new BasicPresenter(),
    new ListPresenter(),
    new KmlParser(),
    new FileNameGenerator(),
    new SurveyRepository()
)

export const getMarker = ({ itemType, itemId }, onError, onSuccess) => markerController.getMarker({ itemType, itemId }, onError, onSuccess)

export const getMarkerList = (onError, onSuccess) => markerController.getList(onError, onSuccess)

export const updateMarker = ({ id, uid, latitude, longitude, comment, location, status, testPointType, timeCreated, name, itemType }, onError, onSuccess) => markerController.updateMarker({ id, uid, latitude, longitude, comment, location, status, testPointType, timeCreated, name, itemType }, onError, onSuccess)

export const exportMarkers = (onError, onSuccess) => markerController.exportMarkers(onError, onSuccess)