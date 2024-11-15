import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { applyFilter } from "../../../../../store/actions/list"
import { ItemTypes } from "../../../../../constants/global"

export const useTestPointReadingTypeFilter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.testPointList.settings.appliedFilters.readingTypeFilter)

    const onApply = useCallback((filter) => dispatch(applyFilter(ItemTypes.TEST_POINT, 'readingTypeFilter', filter)), [])

    return {
        filter,
        onApply
    }
}