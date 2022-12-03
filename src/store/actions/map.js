export const LOAD_MARKERS = 'LOAD_MARKERS'
export const REFRESH_MARKERS = 'REFRESH_MARKERS'
export const ADD_MARKER = 'ADD_MARKER'
export const DELETE_MARKER = 'DELETE_MARKER'
export const UPDATE_MARKER = 'UPDATE_MARKER'
export const SET_ACTIVE_MARKER = 'SET_ACTIVE_MARKER'
export const SET_MARKER_UPDATE = 'SET_MARKER_UPDATE'
export const SET_NEW_ITEM_MARKER = 'SET_NEW_ITEM_MARKER'
export const SET_MY_LOCATION_ACTIVE = 'SET_MY_LOCATION_ACTIVE'
export const SET_SATELLITE = 'SET_SATELLITE'
export const SHOW_MARKER_ON_MAP = 'SHOW_MARKER_ON_MAP'


export const loadMarkers = (list) => {
    return { type: LOAD_MARKERS, list: list }
}

export const setShowMarker = (dataType = null, id = null) => {
    return { type: SHOW_MARKER_ON_MAP, dataType: dataType, id: id }
}

export const setNewItemMarker = (latitude = null, longitude = null) => {
    return { type: SET_NEW_ITEM_MARKER, latitude: latitude, longitude: longitude }
}

export const addMarker = (marker) => {
    return { type: ADD_MARKER, marker: marker }
}

export const deleteMarker = (id, dataType) => {
    return { type: DELETE_MARKER, id: id, dataType: dataType }
}

export const updateMarker = (marker) => {
    return { type: UPDATE_MARKER, marker: marker }
}

export const refreshMarkers = () => {
    return { type: REFRESH_MARKERS }
}

export const setActiveMarker = (marker = null) => {
    return { type: SET_ACTIVE_MARKER, markerObject: marker }
}

export const setMarkerUpdate = (action, dataType, id) => {
    return { type: SET_MARKER_UPDATE, action: action, dataType: dataType, id: id }
}

export const setMyLocationActive = (value) => {
    return { type: SET_MY_LOCATION_ACTIVE, value: value }
}

export const setSatellite = (value) => {
    return { type: SET_SATELLITE, value: value }
}