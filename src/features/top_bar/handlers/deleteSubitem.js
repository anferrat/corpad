import { errorHandler, warningHandler } from "../../../helpers/error_handler"
import { EventRegister } from "react-native-event-listeners"
import { deleteSubitem as deleteSubitemRequest } from "../../../app/controllers/survey/subitems/SubitemController"

const warningCode = (type) => type === 'CT' ? 57 : 56

export const deleteSubitem = async (itemId, subitemId, subitemType, navigation) => {
    const confirm = await warningHandler(warningCode(subitemType), 'Delete', 'Cancel')
    if (confirm) {
        await deleteSubitemRequest({ itemId, subitemId, subitemType }, er => errorHandler(er), ({ timeModified }) => {
            EventRegister.emit('SUBITEM_DELETED', { itemId, subitemId, subitemType, timeModified })
            navigation.goBack()
        })
    }
}