import { useSelector } from "react-redux"

export const useMapFilterCounter = () => {
    const statusCounter = useSelector(state => state.map.filters.statusFilter.length)
    const markerTypeCounter = useSelector(state => state.map.filters.markerTypeFilter.length)
    return {
        statusCounter,
        markerTypeCounter
    }
}