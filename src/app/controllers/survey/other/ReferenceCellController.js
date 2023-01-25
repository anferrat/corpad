import { GetReferenceCellList } from "../../../use_cases/survey/other/reference_cells/GetReferenceCellList"
import { UpdateMainReference } from "../../../use_cases/survey/other/reference_cells/UpdateMainReference"
import { CreateReferenceCell } from "../../../use_cases/survey/other/reference_cells/CreateReferenceCell"
import { DeleteReferenceCell } from "../../../use_cases/survey/other/reference_cells/DeleteReferenceCell"
import { Validation } from "../../../utils/Validation"


const validation = new Validation()
const referenceCellListService = new GetReferenceCellList()
const updateMainReferenceService = new UpdateMainReference()
const createReferenceCellService = new CreateReferenceCell()
const deleteReferenceCellService = new DeleteReferenceCell()

async function controllerHandler(onSuccess, onError, controller) {
    try {
        const response = await controller()
        if (onSuccess)
            onSuccess()
        if (response)
            return {
                status: 200,
                response: response
            }
        else return {
            status: 200
        }
    }
    catch (er) {
        if (onError)
            onError()
        return {
            status: 600,
            errorMessage: er.message
        }
    }
}

export async function getReferenceCellList(onError = undefined, onSuccess = undefined) {
    return controllerHandler(onSuccess, onError, async function () {
        return referenceCellListService.execute()
    })
}

export async function updateMainReference(params, onError = undefined, onSuccess = undefined,) {
    return controllerHandler(onSuccess, onError, async function () {
        const id = validation.property('id', params.id)
        return await updateMainReferenceService.execute(id)
    })
}

export async function createReferenceCell(params, onError = undefined, onSuccess = undefined) {
    return controllerHandler(onSuccess, onError, async function () {
        const requestObject = validation.referenceCellRequest(params)
        return await createReferenceCellService.execute(requestObject)
    })
}

export async function deleteReferenceCell(params, onError = undefined, onSuccess = undefined) {
    return controllerHandler(onSuccess, onError, async function () {
        const id = validation.property('id', params.id)
        return await deleteReferenceCellService.execute(id)
    })
}