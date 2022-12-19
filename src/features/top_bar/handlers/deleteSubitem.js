import { sendCombinedRequest } from "../../../api/database"
import { updateViewProperty } from "../../../store/actions/item"
import { genRequestObject, getWarningCode } from "../../../helpers/functions"
import { errorHandler, warningHandler } from "../../../helpers/error_handler"

export const deleteSubitem = async (dispatch, dataType, itemId, dataTypeItem, subitemId, navigation) => {
    const confirm = await warningHandler(getWarningCode(dataType), 'Delete', 'Cancel')
    if (confirm) {
        const newTime = Date.now()
        const deleteRequest = await sendCombinedRequest([
            ['DELETE', dataType, genRequestObject(dataType, subitemId)],
            ['UPDATE', dataTypeItem + '_PROPERTY', { ...genRequestObject(dataTypeItem, itemId), property: 'timeModified', value: newTime }]
        ])
        if (deleteRequest.status === 200) {
            navigation.goBack()
            dispatch(updateViewProperty(newTime, 'timeModified'))
        }
        else
            errorHandler(601)
    }
}