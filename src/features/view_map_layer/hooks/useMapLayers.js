import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMapLayer, toggleMapLayer } from "../../../store/actions/mapLayers"
import { EventRegister } from "react-native-event-listeners"
import { deleteMapLayer as deleteMapLayerRequest, updateMapLayer } from "../../../app/controllers/survey/other/MapLayerController"
import { errorHandler } from "../../../helpers/error_handler"

const useMapLayers = ({ navigateToEditMapLayer }) => {
    const layers = useSelector(state => state.mapLayers.layers)

    const dispatch = useDispatch()

    const onEdit = useCallback((layerId) => navigateToEditMapLayer(false, layerId), [])

    const onDelete = useCallback(async (index, layerId) => {
        const { status } = await deleteMapLayerRequest({ id: layerId }, er => errorHandler(er))
        if (status === 200) {
            dispatch(deleteMapLayer(index))
            EventRegister.emit('map_layer_changed_visibility', { isVisible: false, layerId })
        }

    }, [])

    const onToggle = useCallback(async (layerId, name, color, comment, width, index, isVisible) => {
        dispatch(toggleMapLayer(index, isVisible))
        const { status } = await updateMapLayer({ id: layerId, defaultName: name, name, width, color, comment, visible: isVisible })
        if (status === 200)
            EventRegister.emit('map_layer_changed_visibility', { isVisible, layerId})
        else
            dispatch(toggleMapLayer(index, !isVisible))
    }, [])

    const onAddLayer = useCallback(() => {
        navigateToEditMapLayer(true)
    }, [])

    return {
        layers,
        onEdit,
        onDelete,
        onToggle,
        onAddLayer
    }
}

export default useMapLayers