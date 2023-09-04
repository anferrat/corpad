import { useContext, useCallback } from "react"
import { useDispatch } from "react-redux"
import { BS } from "../../../App"
import { errorHandler } from "../../helpers/error_handler"
import { updateBottomSheetContent } from "../../store/actions/settings"


export const BOTTOM_SHEET_VIEWS = {
    CREATE: { itemType: null, content: 'create', index: 3 },
    MENU: { itemType: null, content: 'menu', index: 2 },
    TEST_POINT_FILTER: { itemType: 'TEST_POINT', content: 'filter', index: 4 },
    TEST_POINT_SORTING: { itemType: 'TEST_POINT', content: 'sorting', index: 4 },
    TEST_POINT_READINGS: { itemType: 'TEST_POINT', content: 'readings', index: 4 },
    RECTIFIER_READINGS: { itemType: 'RECTIFIER', content: 'readings', index: 1 },
    BASIC_MENU: { itemType: null, content: 'moreOptions', index: 0 },
    IMAGE_PICKER: { itemType: null, content: 'imagePicker', index: 0 }
}


export const useBottomSheetNavigation = () => {
    const bottomSheet = useContext(BS)
    const dispatch = useDispatch()

    const openBottomSheet = useCallback(({ itemType, content, index }, params = {}) => {
        if (bottomSheet.current.snapToIndex)
            bottomSheet.current.snapToIndex(index)
        else errorHandler(108)
        dispatch(updateBottomSheetContent(itemType, content, params))
    }, [])

    const openBasicMenu = () => openBottomSheet(BOTTOM_SHEET_VIEWS.BASIC_MENU)

    const openCreateMenu = () => openBottomSheet(BOTTOM_SHEET_VIEWS.CREATE)

    const openTestPointFilterMenu = () => openBottomSheet(BOTTOM_SHEET_VIEWS.TEST_POINT_FILTER)

    const openTestPointSortingMenu = () => openBottomSheet(BOTTOM_SHEET_VIEWS.TEST_POINT_SORTING)

    const openTestPointReadingMenu = () => openBottomSheet(BOTTOM_SHEET_VIEWS.TEST_POINT_READINGS)

    const openRectifierReadingMenu = () => openBottomSheet(BOTTOM_SHEET_VIEWS.RECTIFIER_READINGS)

    const openImagePicker = ({ itemType, itemId }) => openBottomSheet(BOTTOM_SHEET_VIEWS.IMAGE_PICKER, { itemType, itemId })

    const openMenu = () => openBottomSheet(BOTTOM_SHEET_VIEWS.MENU)

    return {
        openBasicMenu,
        openCreateMenu,
        openTestPointFilterMenu,
        openTestPointReadingMenu,
        openTestPointSortingMenu,
        openRectifierReadingMenu,
        openMenu,
        openImagePicker
    }
}

