import { TestPointRepository } from "../../../repository/sqlite/TestPointRepository"
import { RectifierRepository } from "../../../repository/sqlite/RectifierRepository"
import { PipelineRepository } from "../../../repository/sqlite/PipelineRepository"
import { Controller } from "../../../utils/Controller"
import { ItemValidation } from "../../../validation/survey/ItemValidation"
import { CreateItem } from "../../../services/survey/items/CreateItem"
import { DeleteItem } from "../../../services/survey/items/DeleteItem"
import { UpdateItem } from "../../../services/survey/items/UpdateItem"
import { GetItem } from "../../../services/survey/items/GetItemById"
import { GetItemIdList } from "../../../services/survey/items/GetItemIdList"
import { GetItemListWithDisplayValues } from "../../../services/survey/items/GetItemListWithDisplayValues"
import { DefaultNameRepository } from "../../../repository/sqlite/DefaultNameRepository"
import { BasicPresenter } from "../../../presenters/BasciPresenter"
import { ItemPreseneter } from "../../../presenters/ItemPresenter"
import { UpdateItemProperty } from "../../../services/survey/items/UpdateProperty"
import { DeleteItemList } from "../../../services/survey/items/DeleteItemList"

class ItemController extends Controller {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, defaultNameRepo, basicPresenter, itemPresenter) {
        super()

        this.validation = new ItemValidation()
        this.createItemService = new CreateItem(testPointRepo, rectifierRepo, pipelineRepo, basicPresenter)
        this.deleteItemService = new DeleteItem(testPointRepo, rectifierRepo, pipelineRepo)
        this.updateItemService = new UpdateItem(testPointRepo, rectifierRepo, pipelineRepo, basicPresenter)
        this.getItemService = new GetItem(testPointRepo, rectifierRepo, pipelineRepo, defaultNameRepo, basicPresenter, itemPresenter)
        this.getIdListService = new GetItemIdList(testPointRepo, rectifierRepo, pipelineRepo)
        this.getDisplayListService = new GetItemListWithDisplayValues(testPointRepo, rectifierRepo, pipelineRepo)
        this.updatePropertyService = new UpdateItemProperty(testPointRepo, rectifierRepo)
        this.deleteItemListService = new DeleteItemList(testPointRepo, rectifierRepo, pipelineRepo)
    }

    create(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
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

    deleteList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 632, async () => {
            const { idList, itemType } = this.validation.deleteItemList(params)
            return this.deleteItemListService.execute(idList, itemType)
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

    getIdList(params, onError = null, onSuccess = null,) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { itemType, filters, sorting, latitude, longitude } = this.validation.getIdList(params)
            return this.getIdListService.execute({ itemType, filters, sorting, latitude, longitude })
        }
        )
    }

    getDisplayData(params, onError = null, onSuccess = null,) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { itemType, displayedReading, idList, readingTypeFilter } = this.validation.getDisplayData(params)
            return this.getDisplayListService.execute({ idList, displayedReading, itemType, readingTypeFilter })
        })
    }

    updateProperty(params, onError = null, onSuccess = null,) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { id, itemType, propertyType, value } = this.validation.updateProperty(params)
            return this.updatePropertyService.execute(id, itemType, propertyType, value)
        })
    }
}

const itemController = new ItemController(
    new TestPointRepository(),
    new RectifierRepository(),
    new PipelineRepository(),
    new DefaultNameRepository(),
    new BasicPresenter(),
    new ItemPreseneter())

export const createItem = (params, onError, onSuccess) => itemController.create(params, onError, onSuccess)

export const deleteItem = (params, onError, onSuccess) => itemController.delete(params, onError, onSuccess)

export const deleteItemList = (params, onError, onSuccess) => itemController.deleteList(params, onError, onSuccess)

export const getItemById = (params, onError, onSuccess) => itemController.getById(params, onError, onSuccess)

export const updateItem = (params, onError, onSuccess) => itemController.update(params, onError, onSuccess)

export const getItemIdList = (params, onError, onSuccess) => itemController.getIdList(params, onError, onSuccess)

export const getItemDisplayData = (params, onError, onSuccess) => itemController.getDisplayData(params, onError, onSuccess)

export const updateItemProperty = (params, onError, onSuccess) => itemController.updateProperty(params, onError, onSuccess)