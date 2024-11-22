import { useDispatch, useSelector } from "react-redux"
import { refreshMarkers } from "../../../store/actions/map"

export const useRefreshButton = () => {
    const dispatch = useDispatch()
    const isVisible = useSelector(state => !state.map.loading)

    const onRefreshPress = () => dispatch(refreshMarkers())

    return {
        isVisible,
        onRefreshPress
    }
}