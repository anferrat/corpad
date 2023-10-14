export const LOAD_MARKERS = 'LOAD_MARKERS'
export const REFRESH_MARKERS = 'REFRESH_MARKERS'
export const DELETE_MARKER = 'DELETE_MARKER'
export const UPDATE_MARKER = 'UPDATE_MARKER'
export const SET_ACTIVE_MARKER = 'SET_ACTIVE_MARKER'
export const SET_MARKER_UPDATE = 'SET_MARKER_UPDATE'
export const SET_NEW_ITEM_MARKER = 'SET_NEW_ITEM_MARKER'
export const TOGGLE_SATELLITE_MODE = 'TOGGLE_SATELLITE_MODE'
export const ACTIVATE_MARKER = 'ACTIVATE_MARKER'
export const RESET_ACTIVE_MARKERS = 'RESET_ACTIVE_MARKERS'
export const SET_MAP_READY = 'SET_MAP_READY'
export const SET_ACTIVE_MAP_LAYER_MARKER = 'SET_ACTIVE_MAP_LAYER_MARKER'
export const RESET_ACTIVE_MAP_LAYER_MARKER = 'RESET_ACTIVE_MAP_LAYER_MARKER'

export const loadMarkers = (list) => {
    return { type: LOAD_MARKERS, list: list }
}

export const setNewItemMarker = (latitude, longitude) => {
    return { type: SET_NEW_ITEM_MARKER, latitude: latitude, longitude: longitude }
}

export const deleteMarker = (itemId, itemType) => {
    return { type: DELETE_MARKER, itemId, itemType }
}

export const updateMarker = (marker) => {
    return { type: UPDATE_MARKER, marker: marker }
}

export const refreshMarkers = () => {
    return { type: REFRESH_MARKERS }
}

export const setActiveMarker = (itemId, itemType) => {
    return { type: SET_ACTIVE_MARKER, itemId, itemType }
}

export const activateMarker = (marker) => {
    return { type: ACTIVATE_MARKER, marker }
}

export const setActiveMapLayerMarker = (layerId, layerName, index, color, latitude, longitude, name) => (
    { type: SET_ACTIVE_MAP_LAYER_MARKER, layerId, layerName, index, color, latitude, longitude, name }
)

export const resetActiveMapLayerMarker = (layerId) => (
    { type: RESET_ACTIVE_MAP_LAYER_MARKER, layerId }
)

export const toggleSatellite = () => {
    return { type: TOGGLE_SATELLITE_MODE }
}

export const resetActiveMarkers = () => {
    return { type: RESET_ACTIVE_MARKERS }
}

export const setMapReady = () => {
    return { type: SET_MAP_READY }
}