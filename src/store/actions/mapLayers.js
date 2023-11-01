export const TOGGLE_MAP_LAYER = 'TOGGLE_MAP_LAYER'
export const ADD_MAP_LAYER = 'ADD_MAP_LAYER'
export const DELETE_MAP_LAYER = 'DELETE_MAP_LAYER'
export const DELETE_MAP_LAYER_BY_ID = 'DELETE_MAP_LAYER_BY_ID'
export const LOAD_MAP_LAYERS = 'LOAD_MAP_LAYERS'
export const UPDATE_MAP_LAYER = 'UPDATE_MAP_LAYER'
export const RESET_MAP_LAYERS = 'RESET_MAP_LAYERS'


export const toggleMapLayer = (index, isVisible) => (
    { type: TOGGLE_MAP_LAYER, index, isVisible }
)

export const addMapLayer = (layerId, name, comment, color, width, data, featureCount, points, mapRegion) => ({
    type: ADD_MAP_LAYER, layerId, name, comment, color, width, data, featureCount, points, mapRegion
})

export const deleteMapLayer = (index) => ({
    type: DELETE_MAP_LAYER, index
})

export const deleteMapLayerById = (layerId) => ({
    type: DELETE_MAP_LAYER_BY_ID, layerId
})

export const loadMapLayers = (layers, hidden) => ({
    type: LOAD_MAP_LAYERS, layers, hidden
})

export const updateMapLayer = (layerId, name, comment, color, width) => ({
    type: UPDATE_MAP_LAYER, name, comment, color, width, layerId
})

export const resetMapLayers = () => ({
    type: RESET_MAP_LAYERS
})
