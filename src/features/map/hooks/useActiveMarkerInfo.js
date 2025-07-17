import { useSelector } from "react-redux"
import { ItemTypes } from "../../../constants/global"
import { CalculatorTypeLabels, ItemTypeLabels, TestPointTypeLabels } from "../../../constants/labels"
import { useCallback } from "react"
import { StatusColors, basic, MapLayerStrokeColors, primary } from "../../../styles/colors"

const useActiveMarkerInfo = ({ zoomToCoordinates, navigateToView, navigateToMapLayerPointView, shareActiveLocation, navigateToCalculatorView }) => {
    const activeMarker = useSelector(state => state.map.activeMarker)
    const activeMapLayerMarker = useSelector(state => state.map.activeMapLayerMarker)
    const calculatorMarker = useSelector(state => state.map.activeCalculatorMarker)

    const activeMarkerVisible = Boolean(activeMarker.itemType !== null && activeMarker.id !== null && activeMarker.latitude !== null && activeMarker.longitude !== null && activeMarker.markerType)
    const activeMapLayerMarkerVisible = Boolean(activeMapLayerMarker.layerId !== null && activeMapLayerMarker.latitude !== null && activeMapLayerMarker.longitude !== null)
    const activeCalculatorMarkerVisibe = Boolean(calculatorMarker.calculatorId !== null && calculatorMarker.calculatorType !== null && calculatorMarker.latitude !== null && calculatorMarker.longitude !== null)

    const onLongPress = useCallback(() => {
        const { latitude, longitude } = activeMarkerVisible ? activeMarker : (activeMapLayerMarkerVisible ? activeMapLayerMarker : calculatorMarker)
        if (latitude !== null && longitude !== null)
            zoomToCoordinates(latitude, longitude)
    }, [activeMarkerVisible, activeMapLayerMarkerVisible, activeMarker.latitude, activeMarker.longitude, activeMapLayerMarker.latitude, activeMapLayerMarker.longitude, calculatorMarker.latitude, calculatorMarker.longitude, activeCalculatorMarkerVisibe])

    const onPress = useCallback(() => {
        if (activeMarkerVisible)
            navigateToView(activeMarker.id, activeMarker.itemType)
        else if (activeMapLayerMarkerVisible)
            navigateToMapLayerPointView(activeMapLayerMarker.layerId, activeMapLayerMarker.index)
        else if (activeCalculatorMarkerVisibe)
            navigateToCalculatorView(calculatorMarker.calculatorId, calculatorMarker.calculatorType)
    }, [activeMarker.itemType, activeMarker.id, activeMarkerVisible, navigateToView, activeMapLayerMarker.layerId, activeMapLayerMarker.index, navigateToMapLayerPointView, activeCalculatorMarkerVisibe, calculatorMarker.calculatorId, calculatorMarker.calculatorType])

    const onShare = useCallback(() => {
        if (activeMarkerVisible)
            shareActiveLocation(activeMarker.latitude, activeMarker.longitude, activeMarker.name)
        else if (activeMapLayerMarkerVisible)
            shareActiveLocation(activeMapLayerMarker.latitude, activeMapLayerMarker.longitude, activeMapLayerMarker.name)
        else if (activeCalculatorMarkerVisibe)
            shareActiveLocation(calculatorMarker.latitude, calculatorMarker.longitude, calculatorMarker.name)
    }, [activeMarkerVisible, activeMapLayerMarkerVisible, activeMarker.latitude, activeMarker.longitude, activeMarker.name, activeMapLayerMarker.latitude, activeMapLayerMarker.longitude, activeMapLayerMarker.name, shareActiveLocation, calculatorMarker.latitude, calculatorMarker.longitude, calculatorMarker.name])

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
    else if (activeCalculatorMarkerVisibe)
        return {
            visible: true,
            name: calculatorMarker.name,
            subtitle: `Calculator | ${CalculatorTypeLabels[calculatorMarker.calculatorType]}`,
            location: null,
            subtitleIcon: null,
            icon: `map-pointer`,
            iconColor: primary,
            onPress: onPress,
            onLongPress: onLongPress,
            onShare
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