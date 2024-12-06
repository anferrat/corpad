import { GetMarker } from "../../../services/survey/items/markers/GetMarker"
import { GetMarkerList } from "../../../services/survey/items/markers/GetMarkerList"
import { UpdateMarkerCoordinates } from "../../../services/survey/items/markers/UpdateMarkerCoordinates"
import { Controller } from "../../../utils/Controller"
import { MarkerValidation } from "../../../validation/MarkerValidation"
import { permissions } from "../../_instances/general_services"
import { basicPresenter, listPresenter } from "../../_instances/presenters"
import { rectifierRepo, testPointRepo } from "../../_instances/repositories"

class MarkerController extends Controller {
    constructor(testPointRepo, rectifierRepo, basicPresenter, listPresenter, permissions) {
        super()
        this.validation = new MarkerValidation()
        this.getMarkerService = new GetMarker(testPointRepo, rectifierRepo, basicPresenter)
        this.getMarkerListService = new GetMarkerList(testPointRepo, rectifierRepo, listPresenter, permissions)
        this.updateMarkerCoordinatesService = new UpdateMarkerCoordinates(testPointRepo, rectifierRepo, basicPresenter)
    }

    getMarker(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 615, async () => {
            const { itemType, itemId } = this.validation.getMarker(params)
            return this.getMarkerService.execute(itemType, itemId)
        })
    }

    getList({ filters }, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 615, async () => {
            return this.getMarkerListService.execute(filters)
        })
    }

    updateMarkerCoordinates({ itemType, itemId, latitude, longitude }, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 616, async () => {
            const markerData = this.validation.updateCoordinates({ itemType, itemId, latitude, longitude })
            return this.updateMarkerCoordinatesService.execute(markerData)
        })
    }

}

const markerController = new MarkerController(
    testPointRepo,
    rectifierRepo,
    basicPresenter,
    listPresenter,
    permissions
)

export const getMarker = ({ itemType, itemId }, onError, onSuccess) => markerController.getMarker({ itemType, itemId }, onError, onSuccess)

export const getMarkerList = ({ filters }, onError, onSuccess) => markerController.getList({ filters }, onError, onSuccess)

export const updateMarkerCoordinates = ({ itemId, itemType, latitude, longitude }, onError, onSuccess) => markerController.updateMarkerCoordinates({ itemId, itemType, latitude, longitude }, onError, onSuccess)