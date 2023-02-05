import { GetReferenceCellList } from "../../../use_cases/survey/other/reference_cells/GetReferenceCellList"
import { UpdateMainReference } from "../../../use_cases/survey/other/reference_cells/UpdateMainReference"
import { CreateReferenceCell } from "../../../use_cases/survey/other/reference_cells/CreateReferenceCell"
import { DeleteReferenceCell } from "../../../use_cases/survey/other/reference_cells/DeleteReferenceCell"
import { Controller } from "../../../utils/Controller"
import { ReferenceCellValidation } from "../../../validation/survey/ReferenceCellValidation"

export class ReferenceCellController extends Controller {
    constructor() {
        this.referenceCellListService = new GetReferenceCellList()
        this.updateMainReferenceService = new UpdateMainReference()
        this.createReferenceCellService = new CreateReferenceCell()
        this.deleteReferenceCellService = new DeleteReferenceCell()
        this.validation = new ReferenceCellValidation()
    }

    getList(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            return this.referenceCellListService.execute()
        })
    }

    updateMain(params, onSuccess = null, onError = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { id } = this.validation.updateMain(params)
            return this.updateMainReferenceService.execute(id)
        })
    }

    create(params, onSuccess = null, onError = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { name, rcType } = this.validation.create(params)
            return this.createReferenceCellService.execute(rcType, name)
        })
    }

    delete(params, onSuccess = null, onError = null) {
        return super.controllerHandler(onSuccess, onError, 600, async () => {
            const { id } = this.validation.updateMain(params)
            return this.deleteReferenceCellService.execute(id)
        })
    }
}