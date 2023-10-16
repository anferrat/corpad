export const getProperties = (state, layerId, markerIndex) => {
    const layerIndex = state.mapLayers.layers.findIndex(({ id }) => id == layerId)
    if (state.mapLayers.layers[layerIndex] && state.mapLayers.layers[layerIndex].points[markerIndex])
        return state.mapLayers.layers[layerIndex].points[markerIndex].properties
    else return []
}

export const getMapLayerName = (state, layerId) => {
    const layerIndex = state.mapLayers.layers.findIndex(({ id }) => id == layerId)
    if (state.mapLayers.layers[layerIndex])
        return state.mapLayers.layers[layerIndex].name
    else return '#ERROR'
}

export const getMapLayerColor = (state, layerId) => {
    const layerIndex = state.mapLayers.layers.findIndex(({ id }) => id == layerId)
    if (state.mapLayers.layers[layerIndex])
        return state.mapLayers.layers[layerIndex].color
    else return '#ERROR'
}