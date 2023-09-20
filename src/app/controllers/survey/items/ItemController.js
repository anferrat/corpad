import { Controller } from "../../../utils/Controller"
import { ItemValidation } from "../../../validation/ItemValidation"
import { CreateItem } from "../../../services/survey/items/CreateItem"
import { DeleteItem } from "../../../services/survey/items/DeleteItem"
import { UpdateItem } from "../../../services/survey/items/UpdateItem"
import { GetItem } from "../../../services/survey/items/GetItemById"
import { GetItemIdList } from "../../../services/survey/items/GetItemIdList"
import { GetItemListWithDisplayValues } from "../../../services/survey/items/GetItemListWithDisplayValues"
import { SearchItem } from "../../../services/survey/items/SearchItems"
import { GetNearbyItems } from "../../../services/survey/items/GetNearbyItems"
import { GeolocationCalculator } from "../../../services/other/GeolocationCalculator"
import { GetItemPhotos } from "../../../services/survey/items/GetItemPhotos"
import { assetRepo, defaultNameRepo, fileSystemRepo, geolocationRepo, pipelineRepo, rectifierRepo, surveyRepo, testPointRepo } from "../../_instances/repositories"
import { basicPresenter, itemPresenter, listPresenter } from "../../_instances/presenters"

class ItemController extends Controller {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, surveyRepo, defaultNameRepo, geolocationRepo, fileSystemRepo, assetRepo, basicPresenter, itemPresenter, listPresenter) {
        super()

        this.validation = new ItemValidation()
        this.createItemService = new CreateItem(testPointRepo, rectifierRepo, pipelineRepo, basicPresenter)
        this.deleteItemService = new DeleteItem(testPointRepo, rectifierRepo, pipelineRepo, assetRepo, fileSystemRepo)
        this.updateItemService = new UpdateItem(testPointRepo, rectifierRepo, pipelineRepo, itemPresenter)

        this.searchItemService = new SearchItem(surveyRepo, listPresenter)
        this.getIdListService = new GetItemIdList(testPointRepo, rectifierRepo, pipelineRepo)
        this.getDisplayListService = new GetItemListWithDisplayValues(testPointRepo, rectifierRepo, pipelineRepo)
        this.getItemPhotosService = new GetItemPhotos(assetRepo, fileSystemRepo)

        this.getItemService = new GetItem(testPointRepo, rectifierRepo, pipelineRepo, this.getItemPhotosService, defaultNameRepo, basicPresenter, itemPresenter)

        this.geolocationCalculatorService = new GeolocationCalculator()
        this.getNearbyItemsService = new GetNearbyItems(testPointRepo, rectifierRepo, geolocationRepo, this.geolocationCalculatorService)
    }

    create(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 606, async () => {
            const { itemType, latitude, longitude } = this.validation.createItem(params)
            return this.createItemService.execute(itemType, latitude, longitude)
        }
        )
    }

    delete(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 601, async () => {
            const { id, itemType } = this.validation.deleteItem(params)
            return this.deleteItemService.execute(id, itemType)
        }
        )
    }

    getById(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 603, async () => {
            const { id, itemType } = this.validation.getById(params)
            return this.getItemService.executeWithDefaultName(id, itemType)
        })
    }

    update(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 604, async () => {
            const data = this.validation.updateItem(params)
            return this.updateItemService.execute(data)
        }
        )
    }

    search(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 618, async () => {
            const { keyword } = this.validation.search(params)
            return this.searchItemService.execute(keyword)
        }
        )
    }

    getIdList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 613, async () => {
            const { itemType, filters, sorting, latitude, longitude } = this.validation.getIdList(params)
            return this.getIdListService.execute({ itemType, filters, sorting, latitude, longitude })
        }
        )
    }

    getDisplayData(params, onError = null, onSuccess = null,) {
        return super.controllerHandler(onSuccess, onError, 613, async () => {
            const { itemType, displayedReading, idList, readingTypeFilter } = this.validation.getDisplayData(params)
            return this.getDisplayListService.execute({ idList, displayedReading, itemType, readingTypeFilter })
        })
    }

    getNearbyItems(params, onError = null, onSuccess = null,) {
        return super.controllerHandler(onSuccess, onError, 614, async () => {
            const { itemType } = this.validation.getNearbyItems(params)
            return this.getNearbyItemsService.execute(itemType)
        })
    }

    getItemPhotos(params, onError = null, onSuccess = null,) {
        return super.controllerHandler(onSuccess, onError, 656, async () => {
            const { itemId, itemType } = this.validation.getItemPhotos(params)
            return this.getItemPhotosService.execute(itemId, itemType)
        })
    }
}

const itemController = new ItemController(
    testPointRepo,
    rectifierRepo,
    pipelineRepo,
    surveyRepo,
    defaultNameRepo,
    geolocationRepo,
    fileSystemRepo,
    assetRepo,
    basicPresenter,
    itemPresenter,
    listPresenter)

export const createItem = ({ itemType, latitude, longitude }, onError, onSuccess) => itemController.create({ itemType, latitude, longitude }, onError, onSuccess)

export const deleteItem = (params, onError, onSuccess) => itemController.delete(params, onError, onSuccess)

export const getItemById = (params, onError, onSuccess) => itemController.getById(params, onError, onSuccess)

export const updateItem = (params, onError, onSuccess) => itemController.update(params, onError, onSuccess)

export const getItemIdList = (params, onError, onSuccess) => itemController.getIdList(params, onError, onSuccess)

export const getItemDisplayData = (params, onError, onSuccess) => itemController.getDisplayData(params, onError, onSuccess)

export const searchItem = ({ keyword }, onError, onSuccess) => itemController.search({ keyword }, onError, onSuccess)

export const getNearbyItems = ({ itemType }, onError, onSuccess) => itemController.getNearbyItems({ itemType }, onError, onSuccess)

export const getItemPhotos = ({ itemId, itemType }, onError, onSuccess) => itemController.getItemPhotos({ itemType, itemId }, onError, onSuccess)