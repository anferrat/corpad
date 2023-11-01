import { useCallback, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMapLayer, toggleMapLayer } from "../../../store/actions/mapLayers"
import { deleteMapLayer as deleteMapLayerRequest, updateMapLayer } from "../../../app/controllers/survey/other/MapLayerController"
import { errorHandler, warningHandler } from "../../../helpers/error_handler"
import { hideLoader, showPaywall, updateLoader } from "../../../store/actions/settings"
import { resetActiveMapLayerMarker } from "../../../store/actions/map"
import { EventRegister } from "react-native-event-listeners"
import { isProStatus } from "../../../helpers/functions"

const useMapLayers = ({ navigateToEditMapLayer, goBack }) => {
    const layers = useSelector(state => state.mapLayers.layers)
    const subscriptionStatus = useSelector(state => state.settings.subscription.status)
    const isPro = isProStatus(subscriptionStatus)
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
        isPro ?
            navigateToEditMapLayer(true)
            :
            dispatch(showPaywall())
    }, [isPro])

    return {
        visible,
        layers,
        maxLayerNumberLimitReached,
        isPro,
        onEdit,
        onDelete,
        onToggle,
        onAddLayer,
        onGoTo
    }
}

export default useMapLayers