import { sendRequest } from "../../../api/database"
import { setUpdating } from "../../../store/actions/list"
import { setMarkerUpdate } from "../../../store/actions/map"
import { getListNameFromDataType, getWarningCode, genRequestObject } from "../../../helpers/functions"
import { errorHandler, warningHandler } from "../../../helpers/error_handler"

export const deleteItem = async (dispatch, dataType, itemId, navigation) => {
    const confirm = await warningHandler(getWarningCode(dataType), 'Delete', 'Cancel')
    if (confirm) {
        const deleteRequest = await sendRequest('DELETE', dataType, genRequestObject(dataType, itemId))
        if (deleteRequest.status === 200) {
            navigation.navigate(getListNameFromDataType(dataType))
            dispatch(setUpdating(dataType, itemId, 'DELETE'))
            dispatch(setMarkerUpdate('DELETE', dataType, itemId))
        }
        else
            errorHandler(601)
    }
}