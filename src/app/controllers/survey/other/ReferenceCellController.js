import { GetReferenceCellList } from "../../../services/survey/other/reference_cells/GetReferenceCellList"
import { UpdateMainReference } from "../../../services/survey/other/reference_cells/UpdateMainReference"
import { CreateReferenceCell } from "../../../services/survey/other/reference_cells/CreateReferenceCell"
import { DeleteReferenceCell } from "../../../services/survey/other/reference_cells/DeleteReferenceCell"
import { Controller } from "../../../utils/Controller"
import { ReferenceCellValidation } from "../../../validation/ReferenceCellValidation"
import { ReferenceCellRepository } from "../../../repository/sqlite/ReferenceCellRepository"
import { BasicPresenter } from "../../../presenters/BasciPresenter"
import { ListPresenter } from "../../../presenters/ListPresenter"

class ReferenceCellController extends Controller {
    constructor(referenceCellRepository, basicPresenter, listPresenter) {
        super()
        this.referenceCellListService = new GetReferenceCellList(referenceCellRepository, listPresenter)
        this.updateMainReferenceService = new UpdateMainReference(referenceCellRepository, basicPresenter)
        this.createReferenceCellService = new CreateReferenceCell(referenceCellRepository, basicPresenter)
        this.deleteReferenceCellService = new DeleteReferenceCell(referenceCellRepository)
        this.validation = new ReferenceCellValidation()
    }

    getAll(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 639, async () => {
            return this.referenceCellListService.execute()
        })
    }

    updateMain(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 640, async () => {
            const { id } = this.validation.updateMain(params)
            return this.updateMainReferenceService.execute(id)
        })
    }

    create(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 641, async () => {
            const referenceCellData = this.validation.create(params)
            return this.createReferenceCellService.execute(referenceCellData)
        })
    }

    delete(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 642, async () => {
            const { id } = this.validation.updateMain(params)
            return this.deleteReferenceCellService.execute(id)
        })
    }
}

const referenceCellController = new ReferenceCellController(
    new ReferenceCellRepository(),
    new BasicPresenter(),
    new ListPresenter())

export const getAllReferenceCells = (onError, onSuccess) => referenceCellController.getAll(onError, onSuccess)

export const updateMainReferenceCell = (params, onError, onSuccess) => referenceCellController.updateMain(params, onError, onSuccess)

export const createReferenceCell = (params, onError, onSuccess) => referenceCellController.create(params, onError, onSuccess)

export const deleteReferenceCell = (params, onError, onSuccess) => referenceCellController.delete(params, onError, onSuccess)
