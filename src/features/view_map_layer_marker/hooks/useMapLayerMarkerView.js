import { useSelector } from "react-redux"
import { getMapLayerColor, getMapLayerName, getProperties } from "../helpers/selectors"
import { translateMapLayerMarker } from '../../../localization'

const useMapLayerMarkerView = (layerId, markerIndex) => {
    const properties = useSelector(state => getProperties(state, layerId, markerIndex))
    const layerName = useSelector(state => getMapLayerName(state, layerId))
    const layerColor = useSelector(state => getMapLayerColor(state, layerId))
    const name = properties['name'] ?? translateMapLayerMarker('point', { count: markerIndex + 1 })
    return {
        name,
        layerName,
        layerColor,
        properties
    }
}

export default useMapLayerMarkerView
