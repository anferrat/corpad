import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { applyMapFilter } from "../../../../../store/actions/map"

export const useMapStatusFilter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.map.filters.statusFilter)

    const onApply = useCallback((filter) => dispatch(applyMapFilter('statusFilter', filter)), [])

    return {
        filter,
        onApply
    }
}