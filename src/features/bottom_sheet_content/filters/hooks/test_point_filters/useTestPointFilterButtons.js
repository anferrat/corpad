import { useDispatch, useSelector } from "react-redux"
import { resetFilters } from "../../../../../store/actions/list"
import { ItemTypes } from "../../../../../constants/global"
import { useCallback } from "react"

export const useTestPointFilterButton = ({ closeSheet }) => {
    const dispatch = useDispatch()
    const resetVisible = useSelector(state => state.testPointList.settings.filterCounter !== 0)

    const onResetPress = useCallback(() => {
        dispatch(resetFilters(ItemTypes.TEST_POINT))
        closeSheet()
    }, [])

    return {
        onResetPress,
        resetVisible
    }

}