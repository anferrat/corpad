import { errorHandler } from "../../../helpers/error_handler"
import { updateSetting } from "../../../store/actions/settings"

export const launchMenu = (bottomSheet, dispatch) => {
    if (bottomSheet.current?.snapToIndex) {
        bottomSheet.current.snapToIndex(2)
        dispatch(updateSetting('bottomSheetContent', { itemType: null, content: 'menu' }))
    }
    else errorHandler(503)
}
