import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMapLayer, toggleMapLayer } from "../../../store/actions/mapLayers"
import { deleteMapLayer as deleteMapLayerRequest, updateMapLayer } from "../../../app/controllers/survey/other/MapLayerController"
import { errorHandler } from "../../../helpers/error_handler"
import { hideLoader, updateLoader } from "../../../store/actions/settings"
import { resetActiveMapLayerMarker } from "../../../store/actions/map"

const useMapLayers = ({ navigateToEditMapLayer }) => {
    const layers = useSelector(state => state.mapLayers.layers)

    const dispatch = useDispatch()

    const onEdit = useCallback((layerId) => navigateToEditMapLayer(false, layerId), [])

    const onDelete = useCallback(async (index, layerId) => {
        const { status } = await deleteMapLayerRequest({ id: layerId }, er => errorHandler(er))
        if (status === 200) {
            dispatch(deleteMapLayer(index))
            dispatch(resetActiveMapLayerMarker(layerId))
        }

    }, [])

    const onToggle = useCallback(async (layerId, name, color, comment, width, index, isVisible) => {
        dispatch(updateLoader('Applying new settings'))
        const { status } = await updateMapLayer({ id: layerId, defaultName: name, name, width, color, comment, visible: isVisible })
        if (status === 200) {
            dispatch(toggleMapLayer(index, isVisible))
            if (!isVisible)
                dispatch(resetActiveMapLayerMarker(layerId))
        }
        dispatch(hideLoader())
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