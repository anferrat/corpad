import { CreateMapLayer } from "../../../services/survey/other/mapLayers/CreateMapLayer"
import { DeleteMapLayer } from "../../../services/survey/other/mapLayers/DeleteMapLayer"
import { GetMapLayerData } from "../../../services/survey/other/mapLayers/GetMapLayerData"
import { GetMapLayerList } from "../../../services/survey/other/mapLayers/GetMapLayerList"
import { ReadExternalGeoFile } from "../../../services/survey/other/mapLayers/ReadExternalGeoFile"
import { UpdateMapLayer } from "../../../services/survey/other/mapLayers/UpdateMapLayer"
import { Controller } from "../../../utils/Controller"
import { MapLayerValidation } from "../../../validation/MapLayerValidation"
import { geoJsonParser, geoJsonPointExtractor } from "../../_instances/converters"
import { documentPicker, geoJsonValidation, geoParser, warningHandler } from "../../_instances/general_services"
import { mapLayerPresenter } from "../../_instances/presenters"
import { fileSystemRepo, mapLayerRepo } from "../../_instances/repositories"

class MapLayerController extends Controller {
    constructor(mapLayerRepo, geoParser, documentPicker, fileSystemRepo, mapLayerPresenter, warningHandler, geoJsonValidation, geoJsonParser, geoJsonPointExtractor) {
        super()
        this.loadNewMapLayerService = new ReadExternalGeoFile(geoParser, documentPicker, fileSystemRepo, warningHandler, geoJsonValidation, geoJsonParser, geoJsonPointExtractor)
        this.getMapLayerListService = new GetMapLayerList(mapLayerRepo, mapLayerPresenter, geoJsonValidation, geoJsonParser, geoJsonPointExtractor)
        this.createMapLayerService = new CreateMapLayer(mapLayerRepo, mapLayerPresenter, geoJsonValidation, geoJsonParser, geoJsonPointExtractor)
        this.updateMapLayerService = new UpdateMapLayer(mapLayerRepo)
        this.getMapLayerDataService = new GetMapLayerData(mapLayerRepo, mapLayerPresenter, geoJsonParser, geoJsonPointExtractor)
        this.deleteMapLayerService = new DeleteMapLayer(mapLayerRepo)

        this.validation = new MapLayerValidation()
    }

    readGeoFile(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 435, async () => {
            return this.loadNewMapLayerService.execute()
        })
    }

    getList(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 659, async () => {
            return this.getMapLayerListService.execute()
        })
    }

    create(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 657, async () => {
            const { name, width, color, data, comment, defaultName } = this.validation.create(params)
            return this.createMapLayerService.execute({ name, width, color, data, comment, defaultName })
        })
    }

    update(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 658, async () => {
            const { id, name, width, color, comment, visible, defaultName } = this.validation.update(params)
            return this.updateMapLayerService.execute({ id, name, width, color, comment, visible, defaultName })
        })
    }

    getById(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 661, async () => {
            const { id } = this.validation.getById(params)
            return this.getMapLayerDataService.execute(id)
        })
    }

    delete(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 660, async () => {
            const { id } = this.validation.delete(params)
            return this.deleteMapLayerService.execute(id)
        })
    }

}

const mapLayerController = new MapLayerController(
    mapLayerRepo,
    geoParser,
    documentPicker,
    fileSystemRepo,
    mapLayerPresenter,
    warningHandler,
    geoJsonValidation,
    geoJsonParser,
    geoJsonPointExtractor
)

export const readGeoFile = (onError, onSuccess) => mapLayerController.readGeoFile(onError, onSuccess)

export const getMapLayerList = (onError, onSuccess) => mapLayerController.getList(onError, onSuccess)

export const createMapLayer = ({ name, defaultName, width, color, data, comment }, onError, onSuccess) => mapLayerController.create({ name, defaultName, width, color, data, comment }, onError, onSuccess)

export const updateMapLayer = ({ id, name, defaultName, width, color, comment, visible }, onError, onSuccess) => mapLayerController.update({ id, name, defaultName, width, color, comment, visible }, onError, onSuccess)

export const getMapLayerById = ({ id }, onError, onSuccess) => mapLayerController.getById({ id }, onError, onSuccess)

export const deleteMapLayer = ({ id }, onError, onSuccess) => mapLayerController.delete({ id }, onError, onSuccess)

