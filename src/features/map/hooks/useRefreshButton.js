import { useDispatch, useSelector } from "react-redux"
import { refreshMarkers } from "../../../store/actions/map"

export const useRefreshButton = () => {
    const dispatch = useDispatch()
    const isVisible = useSelector(state => Boolean(Object.values(state.map.filters).reduce((counter, filter) => counter + filter.length, 0)) && !state.map.loading)

    const onRefreshPress = () => dispatch(refreshMarkers())

    return {
        isVisible,
        onRefreshPress
    }
}