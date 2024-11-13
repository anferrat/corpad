import { CreateMapLayer } from "../../../services/survey/other/mapLayers/CreateMapLayer"
import { DeleteMapLayer } from "../../../services/survey/other/mapLayers/DeleteMapLayer"
import { GetMapLayerData } from "../../../services/survey/other/mapLayers/GetMapLayerData"
import { GetMapLayerList } from "../../../services/survey/other/mapLayers/GetMapLayerList"
import { ParseKmzToKml } from "../../../services/survey/other/mapLayers/ParseKmzToKml"
import { ParseToGeoJson } from "../../../services/survey/other/mapLayers/ParseToGeoJson"
import { ReadExternalGeoFile } from "../../../services/survey/other/mapLayers/ReadExternalGeoFile"
import { UpdateMapLayer } from "../../../services/survey/other/mapLayers/UpdateMapLayer"
import { Controller } from "../../../utils/Controller"
import { MapLayerValidation } from "../../../validation/MapLayerValidation"
import { geoJsonParser, geoJsonPointExtractor } from "../../_instances/converters"
import { documentPicker, geoJsonValidation, getMapRegionFromBbox, warningHandler } from "../../_instances/general_services"
import { mapLayerPresenter } from "../../_instances/presenters"
import { fileSystemRepo, mapLayerRepo } from "../../_instances/repositories"

class MapLayerController extends Controller {
    constructor(mapLayerRepo, documentPicker, fileSystemRepo, mapLayerPresenter, warningHandler, geoJsonValidation, geoJsonParser, geoJsonPointExtractor, getMapRegionFromBbox) {
        super()
        this.parseKmztoKmlService = new ParseKmzToKml(fileSystemRepo)
        this.parseToGeoJson = new ParseToGeoJson()
        this.loadNewMapLayerService = new ReadExternalGeoFile(this.parseToGeoJson, documentPicker, fileSystemRepo, warningHandler, geoJsonValidation, this.parseKmztoKmlService)
        this.getMapLayerListService = new GetMapLayerList(mapLayerRepo, mapLayerPresenter, geoJsonValidation, geoJsonParser, geoJsonPointExtractor, getMapRegionFromBbox)
        this.createMapLayerService = new CreateMapLayer(mapLayerRepo, mapLayerPresenter, geoJsonValidation, geoJsonParser, geoJsonPointExtractor, getMapRegionFromBbox)
        this.updateMapLayerService = new UpdateMapLayer(mapLayerRepo)
        this.getMapLayerDataService = new GetMapLayerData(mapLayerRepo, mapLayerPresenter, geoJsonParser, geoJsonPointExtractor, getMapRegionFromBbox)
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
    documentPicker,
    fileSystemRepo,
    mapLayerPresenter,
    warningHandler,
    geoJsonValidation,
    geoJsonParser,
    geoJsonPointExtractor,
    getMapRegionFromBbox
)

export const readGeoFile = (onError, onSuccess) => mapLayerController.readGeoFile(onError, onSuccess)

export const getMapLayerList = (onError, onSuccess) => mapLayerController.getList(onError, onSuccess)

export const createMapLayer = ({ name, defaultName, width, color, data, comment }, onError, onSuccess) => mapLayerController.create({ name, defaultName, width, color, data, comment }, onError, onSuccess)

export const updateMapLayer = ({ id, name, defaultName, width, color, comment, visible }, onError, onSuccess) => mapLayerController.update({ id, name, defaultName, width, color, comment, visible }, onError, onSuccess)

export const getMapLayerById = ({ id }, onError, onSuccess) => mapLayerController.getById({ id }, onError, onSuccess)

export const deleteMapLayer = ({ id }, onError, onSuccess) => mapLayerController.delete({ id }, onError, onSuccess)

