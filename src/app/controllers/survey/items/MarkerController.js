import { GetMarker } from "../../../services/survey/items/markers/GetMarker"
import { GetMarkerList } from "../../../services/survey/items/markers/GetMarkerList"
import { UpdateMarker } from "../../../services/survey/items/markers/UpdateMarker"
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
        this.updateMarkerService = new UpdateMarker(testPointRepo, rectifierRepo, basicPresenter)
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

    updateMarker(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 616, async () => {
            const markerData = this.validation.update(params)
            return this.updateMarkerService.execute(markerData)
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

export const updateMarker = ({ id, uid, latitude, longitude, comment, location, status, testPointType, timeCreated, name, itemType }, onError, onSuccess) => markerController.updateMarker({ id, uid, latitude, longitude, comment, location, status, testPointType, timeCreated, name, itemType }, onError, onSuccess)