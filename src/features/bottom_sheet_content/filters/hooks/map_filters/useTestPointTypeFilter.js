import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { applyMapFilter } from "../../../../../store/actions/map"

export const useMarkerTypeFilter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.map.filters.markerTypeFilter)

    const onApply = useCallback((filter) => dispatch(applyMapFilter('markerTypeFilter', filter)), [])

    return {
        filter,
        onApply
    }
}