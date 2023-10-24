import { useSelector } from "react-redux"
import { ItemTypes } from "../../../constants/global"
import { ItemTypeLabels, TestPointTypeLabels } from "../../../constants/labels"
import { useCallback } from "react"
import { StatusColors, basic, MapLayerStrokeColors } from "../../../styles/colors"

const useActiveMarkerInfo = ({ zoomToCoordinates, navigateToView, navigateToMapLayerPointView, shareActiveLocation }) => {
    const activeMarker = useSelector(state => state.map.activeMarker)
    const activeMapLayerMarker = useSelector(state => state.map.activeMapLayerMarker)

    const activeMarkerVisible = Boolean(activeMarker.itemType !== null && activeMarker.id !== null && activeMarker.latitude !== null && activeMarker.longitude !== null && activeMarker.markerType)
    const activeMapLayerMarkerVisible = Boolean(activeMapLayerMarker.layerId !== null && activeMapLayerMarker.latitude !== null && activeMapLayerMarker.longitude !== null)

    const onLongPress = useCallback(() => {
        const { latitude, longitude } = activeMarkerVisible ? activeMarker : (activeMapLayerMarkerVisible ? activeMapLayerMarker : { latitude: null, longitude: null })
        if (latitude && longitude)
            zoomToCoordinates(latitude, longitude)
    }, [activeMarkerVisible, activeMapLayerMarkerVisible, activeMarker.latitude, activeMarker.longitude, activeMapLayerMarker.latitude, activeMapLayerMarker.longitude])

    const onPress = useCallback(() => {
        if (activeMarkerVisible)
            navigateToView(activeMarker.id, activeMarker.itemType)
        else if (activeMapLayerMarkerVisible)
            navigateToMapLayerPointView(activeMapLayerMarker.layerId, activeMapLayerMarker.index)
    }, [activeMarker.itemType, activeMarker.id, activeMarkerVisible, navigateToView, activeMapLayerMarker.layerId, activeMapLayerMarker.index, navigateToMapLayerPointView])

    const onShare = useCallback(() => {
        if (activeMarkerVisible)
            shareActiveLocation(activeMarker.latitude, activeMarker.longitude, activeMarker.name)
        else if (activeMapLayerMarkerVisible)
            shareActiveLocation(activeMapLayerMarker.latitude, activeMapLayerMarker.longitude, activeMapLayerMarker.name)
    }, [activeMarkerVisible, activeMapLayerMarkerVisible, activeMarker.latitude, activeMarker.longitude, activeMarker.name, activeMapLayerMarker.latitude, activeMapLayerMarker.longitude, activeMapLayerMarker.name, shareActiveLocation])

    if (activeMarkerVisible) {
        const subtitle = activeMarkerVisible ?
            (activeMarker.itemType === ItemTypes.TEST_POINT ?
                TestPointTypeLabels[activeMarker.testPointType] :
                ItemTypeLabels[activeMarker.itemType]) :
            'Loading'
        return {
            visible: true,
            name: activeMarker.name,
            subtitle: subtitle,
            location: activeMarker.location,
            subtitleIcon: null,
            icon: `map-${activeMarker.markerType}`,
            iconColor: StatusColors[activeMarker.status],
            onPress: onPress,
            onLongPress: onLongPress,
            onShare: onShare
        }
    }
    else if (activeMapLayerMarkerVisible) {
        return {
            visible: true,
            name: activeMapLayerMarker.name,
            subtitle: activeMapLayerMarker.layerName,
            location: null,
            subtitleIcon: 'layers',
            icon: `map-pointer`,
            iconColor: MapLayerStrokeColors[activeMapLayerMarker.color],
            onPress: onPress,
            onLongPress: onLongPress,
            onShare
        }
    }
    else return {
        visible: false,
        name: null,
        subtitle: null,
        location: null,
        icon: `map-default`,
        subtitleIcon: null,
        iconColor: basic,
        onPress: onPress,
        onLongPress: onLongPress,
        onShare
    }
}

export default useActiveMarkerInfo