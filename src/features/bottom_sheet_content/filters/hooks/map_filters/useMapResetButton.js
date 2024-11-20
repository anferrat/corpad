import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"
import { resetMapFilters } from "../../../../../store/actions/map"

export const useMapResetButton = ({ closeSheet }) => {
    const dispatch = useDispatch()
    const resetVisible = useSelector(state => Boolean(Object.values(state.map.filters).reduce((counter, filter) => counter + filter.length, 0)))

    const onResetPress = useCallback(() => {
        closeSheet()
        dispatch(resetMapFilters())
    }, [])

    return {
        onResetPress,
        resetVisible
    }

}