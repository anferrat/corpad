import { BasicPresenter } from "../../../presenters/BasciPresenter"
import { ListPresenter } from "../../../presenters/ListPresenter"
import { SubitemPresenter } from "../../../presenters/SubitemPresenter"
import { DefaultNameRepository } from "../../../repository/sqlite/DefaultNameRepository"
import { PipelineRepository } from "../../../repository/sqlite/PipelineRepository"
import { RectifierRepository } from "../../../repository/sqlite/RectifierRepository"
import { SettingRepository } from "../../../repository/sqlite/SettingRepository"
import { SubitemRepository } from "../../../repository/sqlite/SubitemRepository"
import { TestPointRepository } from "../../../repository/sqlite/TestPointRepository"
import { SubitemFactory } from "../../../services/other/SubitemFactory"
import { CreateSubitem } from "../../../services/survey/subitems/subitem/CreateSubitem"
import { DeleteSubitem } from "../../../services/survey/subitems/subitem/DeleteSubitem"
import { GetSubitemById } from "../../../services/survey/subitems/subitem/GetSubitemById"
import { GetSubitemList } from "../../../services/survey/subitems/subitem/GetSubitemList"
import { UpdateSubitem } from "../../../services/survey/subitems/subitem/UpdateSubitem"
import { UpdateSubitemProperty } from "../../../services/survey/subitems/subitem/UpdateSubitemProperty"
import { Controller } from "../../../utils/Controller"
import { SubitemValidation } from "../../../validation/survey/SubitemValidation"

class SubitemController extends Controller {
    constructor (subitemRepo, testPointRepo, pipelineRepo, rectifierRepo, defaultNameRepo, settingRepo, subitemPresenter, listPresenter, basicPresenter, subitemFactory) {
        super()
        this.createSubitemService = new CreateSubitem(subitemRepo, basicPresenter, subitemFactory)
        this.deleteSubitemService = new DeleteSubitem(subitemRepo)
        this.getSubitemByIdService = new GetSubitemById(subitemRepo, defaultNameRepo, testPointRepo, rectifierRepo, pipelineRepo, settingRepo, subitemPresenter)
        this.getSubitemListService = new GetSubitemList(testPointRepo, rectifierRepo, listPresenter)
        this.updateSubitemService = new UpdateSubitem(subitemRepo, subitemPresenter, subitemFactory)
        this.updatePropertyService = new UpdateSubitemProperty(subitemRepo)

        this.validation = new SubitemValidation()
    }

    create(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { subitemType, itemId } = this.validation.create(params)
            return this.createSubitemService.execute(subitemType, itemId)
        })
    }

    delete(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { subitemType, id } = this.validation.delete(params)
            return this.deleteSubitemService.execute(id, subitemType)
        })
    }

    update(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const subitemData = this.validation.update(params)
            return this.updateSubitemService.execute(subitemData)
        })
    }

    getById(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { itemId, subitemId, subitemType } = this.validation.getById(params)
            return this.getSubitemByIdService.execute(subitemType, itemId, subitemId)
        })
    }

    getList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { itemId, itemType } = this.validation.getList(params)
            return this.getSubitemListService.execute(itemId, itemType)
        })
    }

    updateProperty(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { subitemId, itemId, subitemType, propertyType, value } = this.validation.updateProperty(params)
            return this.updatePropertyService.execute(subitemId, itemId, propertyType, subitemType, value)
        })
    }

    //implement update
}

const subitemController = new SubitemController(
    new SubitemRepository(),
    new TestPointRepository(),
    new PipelineRepository(),
    new RectifierRepository(),
    new DefaultNameRepository(),
    new SettingRepository(),
    new SubitemPresenter(),
    new ListPresenter(),
    new BasicPresenter(),
    new SubitemFactory()
)


export const createSubitem = (params, onError, onSuccess) => subitemController.create(params, onError, onSuccess)

export const deleteSubitem = (params, onError, onSuccess) => subitemController.delete(params, onError, onSuccess)

export const getSubitemById = (params, onError, onSuccess) => subitemController.getById(params, onError, onSuccess)

export const getSubitemList = (params, onError, onSuccess) => subitemController.getList(params, onError, onSuccess)

export const updateSubitem = (params, onError, onSuccess) => subitemController.update(params, onError, onSuccess)

export const updateSubitemProperty = (params, onError, onSuccess) => subitemController.updateProperty(params, onError, onSuccess)