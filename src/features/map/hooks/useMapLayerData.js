import { useIsFocused } from "@react-navigation/native"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMapLayerList } from "../../../app/controllers/survey/other/MapLayerController"
import { errorHandler } from "../../../helpers/error_handler"
import { loadMapLayers, resetMapLayers } from "../../../store/actions/mapLayers"
import { setActiveMapLayerMarker } from "../../../store/actions/map"


const useMapLayerData = () => {
    const loading = useSelector(state => state.mapLayers.loading)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const layers = useSelector(state => state.mapLayers.layers)
    const activeMarkerLayerId = useSelector(state => state.map.activeMapLayerMarker.layerId)
    const activeMarkerIndex = useSelector(state => state.map.activeMapLayerMarker.index)
    const activeMarkerColor = useSelector(state => state.map.activeMapLayerMarker.color)
    const activeMarkerLatitude = useSelector(state => state.map.activeMapLayerMarker.latitude)
    const activeMarkerLongitude = useSelector(state => state.map.activeMapLayerMarker.longitude)


    const onMapLayerMarkerPress = useCallback(({ layerId, layerName, index, color, latitude, longitude, name }) => {
        dispatch(setActiveMapLayerMarker(layerId, layerName, index, color, latitude, longitude, name))
    }, [])

    useEffect(() => {
        if (loading && isFocused)
            getMapLayerList(
                (er) => {
                    errorHandler(er)
                    dispatch(loadMapLayers([]))
                },
                (layers) => dispatch(loadMapLayers(layers)))
    }, [isFocused, loading])

    useEffect(() => {
        return () => {
            dispatch(resetMapLayers())
        }
    }, [])

    return {
        layers,
        activeMarkerLayerId,
        activeMarkerIndex,
        activeMarkerColor,
        activeMarkerLatitude,
        activeMarkerLongitude,
        onMapLayerMarkerPress
    }
}

export default useMapLayerData