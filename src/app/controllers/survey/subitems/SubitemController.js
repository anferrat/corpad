import { CreateSubitem } from "../../../services/survey/subitems/subitem/CreateSubitem"
import { DeleteSubitem } from "../../../services/survey/subitems/subitem/DeleteSubitem"
import { GetSubitemById } from "../../../services/survey/subitems/subitem/GetSubitemById"
import { GetSubitemList } from "../../../services/survey/subitems/subitem/GetSubitemList"
import { UpdateSubitem } from "../../../services/survey/subitems/subitem/UpdateSubitem"
import { Controller } from "../../../utils/Controller"
import { SubitemValidation } from "../../../validation/SubitemValidation"
import { multimeterFactory, subitemFactory, unitConverter } from "../../_instances/general_services"
import { basicPresenter, listPresenter, potentialPresenter, subitemPresenter } from "../../_instances/presenters"
import { bluetoothRepo, defaultNameRepo, pipelineRepo, potentialRepo, potentialTypeRepo, rectifierRepo, referenceCellRepo, settingRepo, subitemRepo, testPointRepo } from "../../_instances/repositories"

class SubitemController extends Controller {
    constructor(subitemRepo, testPointRepo, pipelineRepo, rectifierRepo, defaultNameRepo, settingRepo, referenceCellRepo, potentialTypeRepo, potentialRepo, bluetoothRepo, subitemPresenter, listPresenter, basicPresenter, potentialPresenter, subitemFactory, unitConverter, multimeterFactory) {
        super()
        this.createSubitemService = new CreateSubitem(subitemRepo, basicPresenter, subitemFactory, settingRepo, referenceCellRepo, potentialTypeRepo, potentialRepo)
        this.deleteSubitemService = new DeleteSubitem(subitemRepo)
        this.getSubitemByIdService = new GetSubitemById(subitemRepo, defaultNameRepo, testPointRepo, rectifierRepo, pipelineRepo, settingRepo, subitemPresenter)
        this.getSubitemListService = new GetSubitemList(testPointRepo, rectifierRepo, referenceCellRepo, potentialTypeRepo, pipelineRepo, settingRepo, multimeterFactory, listPresenter, subitemPresenter, potentialPresenter, unitConverter)
        this.updateSubitemService = new UpdateSubitem(subitemRepo, subitemPresenter, subitemFactory)

        this.validation = new SubitemValidation()
    }

    create(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 606, async () => {
            const { subitemType, itemId } = this.validation.create(params)
            return this.createSubitemService.execute(subitemType, itemId)
        })
    }

    delete(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 601, async () => {
            const { subitemType, itemId, subitemId } = this.validation.delete(params)
            return this.deleteSubitemService.execute(itemId, subitemId, subitemType)
        })
    }

    update(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 608, async () => {
            const subitemData = this.validation.update(params)
            return this.updateSubitemService.execute(subitemData)
        })
    }

    getById(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 607, async () => {
            const { itemId, subitemId, subitemType } = this.validation.getById(params)
            return this.getSubitemByIdService.execute(subitemType, itemId, subitemId)
        })
    }

    getList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 602, async () => {
            const { itemId, itemType } = this.validation.getList(params)
            return this.getSubitemListService.execute(itemId, itemType)
        })
    }

    getListWithData(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 602, async () => {
            const { itemId, itemType } = this.validation.getList(params)
            return this.getSubitemListService.executeWithData(itemId, itemType)
        })
    }

}

const subitemController = new SubitemController(
    subitemRepo,
    testPointRepo,
    pipelineRepo,
    rectifierRepo,
    defaultNameRepo,
    settingRepo,
    referenceCellRepo,
    potentialTypeRepo,
    potentialRepo,
    bluetoothRepo,
    subitemPresenter,
    listPresenter,
    basicPresenter,
    potentialPresenter,
    subitemFactory,
    unitConverter,
    multimeterFactory
)


export const createSubitem = (params, onError, onSuccess) => subitemController.create(params, onError, onSuccess)

export const deleteSubitem = (params, onError, onSuccess) => subitemController.delete(params, onError, onSuccess)

export const getSubitemById = (params, onError, onSuccess) => subitemController.getById(params, onError, onSuccess)

export const getSubitemList = (params, onError, onSuccess) => subitemController.getList(params, onError, onSuccess)

export const updateSubitem = (params, onError, onSuccess) => subitemController.update(params, onError, onSuccess)

export const getSubitemListData = (params, onError, onSuccess) => subitemController.getListWithData(params, onError, onSuccess)