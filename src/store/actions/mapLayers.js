export const TOGGLE_MAP_LAYER = 'TOGGLE_MAP_LAYER'
export const ADD_MAP_LAYER = 'ADD_MAP_LAYER'
export const DELETE_MAP_LAYER = 'DELETE_MAP_LAYER'
export const LOAD_MAP_LAYERS = 'LOAD_MAP_LAYERS'
export const UPDATE_MAP_LAYER = 'UPDATE_MAP_LAYER'
export const RESET_MAP_LAYERS = 'RESET_MAP_LAYERS'


export const toggleMapLayer = (index, isVisible) => (
    { type: TOGGLE_MAP_LAYER, index, isVisible }
)

export const addMapLayer = (layerId, name, comment, color, width, data, featureCount, points) => ({
    type: ADD_MAP_LAYER, layerId, name, comment, color, width, data, featureCount, points
})

export const deleteMapLayer = (index) => ({
    type: DELETE_MAP_LAYER, index
})

export const loadMapLayers = (layers) => ({
    type: LOAD_MAP_LAYERS, layers
})

export const updateMapLayer = (layerId, name, comment, color, width) => ({
    type: UPDATE_MAP_LAYER, name, comment, color, width, layerId
})

export const resetMapLayers = () => ({
    type: RESET_MAP_LAYERS
})
