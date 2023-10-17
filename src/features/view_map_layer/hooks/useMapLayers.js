import { useCallback, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMapLayer, toggleMapLayer } from "../../../store/actions/mapLayers"
import { deleteMapLayer as deleteMapLayerRequest, updateMapLayer } from "../../../app/controllers/survey/other/MapLayerController"
import { errorHandler, warningHandler } from "../../../helpers/error_handler"
import { hideLoader, updateLoader } from "../../../store/actions/settings"
import { resetActiveMapLayerMarker } from "../../../store/actions/map"
import { EventRegister } from "react-native-event-listeners"

const useMapLayers = ({ navigateToEditMapLayer, goBack }) => {
    const layers = useSelector(state => state.mapLayers.layers)
    const [visible, setVisible] = useState(false)
    const maxLayerNumberLimitReached = layers.length >= 6

    useEffect(() => {
        setTimeout(() => setVisible(true), 100)
    }, [])

    const dispatch = useDispatch()

    const onEdit = useCallback((layerId) => navigateToEditMapLayer(false, layerId), [])

    const onGoTo = useCallback((mapRegion) => {
        goBack()
        EventRegister.emit('animateToRegion', mapRegion)
    }, [])

    const onDelete = useCallback(async (index, layerId) => {
        const confirm = await warningHandler(61, 'Delete', 'Cancel')
        if (confirm) {
            const { status } = await deleteMapLayerRequest({ id: layerId }, er => errorHandler(er))
            if (status === 200)
                dispatch(deleteMapLayer(index))
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
        visible,
        layers,
        maxLayerNumberLimitReached,
        onEdit,
        onDelete,
        onToggle,
        onAddLayer,
        onGoTo
    }
}

export default useMapLayers