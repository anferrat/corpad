import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { applyFilter } from "../../../../../store/actions/list"
import { ItemTypes } from "../../../../../constants/global"

export const useTestPointHideEmptyToggleFilter = ({ closeSheet }) => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.testPointList.settings.appliedFilters.hideEmptyTestPoints)

    const onApply = useCallback((filter) => {
        dispatch(applyFilter(ItemTypes.TEST_POINT, 'hideEmptyTestPoints', filter))
        closeSheet()
    }, [])

    return {
        filter,
        onApply
    }
}