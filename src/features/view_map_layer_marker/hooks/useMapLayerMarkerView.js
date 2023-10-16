import { useSelector } from "react-redux"
import { getMapLayerColor, getMapLayerName, getProperties } from "../helpers/selectors"

const useMapLayerMarkerView = (layerId, markerIndex) => {
    const properties = useSelector(state => getProperties(state, layerId, markerIndex))
    const layerName = useSelector(state => getMapLayerName(state, layerId))
    const layerColor = useSelector(state => getMapLayerColor(state, layerId))
    const name = properties['name'] ?? `Point ${markerIndex + 1}`
    return {
        name,
        layerName,
        layerColor,
        properties
    }
}

export default useMapLayerMarkerView