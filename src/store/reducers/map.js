import { LOAD_MARKERS, REFRESH_MARKERS, DELETE_MARKER, UPDATE_MARKER, SET_ACTIVE_MARKER, SET_NEW_ITEM_MARKER, TOGGLE_SATELLITE_MODE, ACTIVATE_MARKER, RESET_ACTIVE_MARKERS, SET_MAP_READY } from "../actions/map"

const initialState = {
    markers: [],
    loading: true,
    mapReady: false,
    satelliteMode: false,
    newItemMarker: {
        active: false,
        latitude: null,
        longitude: null,
    },
    activeMarker: {
        id: null,
        uid: null,
        markerType: null,
        itemType: null,
        location: null,
        comment: null,
        name: null,
        status: 3,
        timeModified: null,
        timeCreated: null,
        latitude: null,
        longitude: null
    }
}

const map = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SATELLITE_MODE: {
            return {
                ...state,
                satelliteMode: !state.satelliteMode
            }
        }
        case SET_NEW_ITEM_MARKER:
            return {
                ...state,
                newItemMarker: {
                    active: true,
                    latitude: action.latitude,
                    longitude: action.longitude,
                },
                activeMarker: initialState.activeMarker,
            }
        case ACTIVATE_MARKER:
            return {
                ...state,
                activeMarker: action.marker,
                newItemMarker: initialState.newItemMarker,
            }
        case RESET_ACTIVE_MARKERS:
            return {
                ...state,
                activeMarker: initialState.activeMarker,
                newItemMarker: initialState.newItemMarker
            }
        case SET_ACTIVE_MARKER: {
            const markerIndex = state.markers.findIndex(({ id, itemType }) => id === action.itemId && itemType === action.itemType)
            return {
                ...state,
                activeMarker: ~markerIndex ? state.markers[markerIndex] : state.activeMarker,
                newItemMarker: initialState.newItemMarker,
            }
        }
        case UPDATE_MARKER: {
            const markerIndex = state.markers.findIndex(marker => marker.id === action.marker.id && marker.itemType === action.marker.itemType)
            if (~markerIndex) {
                const isActive = action.marker.id === state.activeMarker.id && action.marker.itemType === state.activeMarker.itemType
                return {
                    ...state,
                    activeMarker: isActive ? action.marker : state.activeMarker,
                    markers: Object.assign([], state.markers, {
                        [markerIndex]: action.marker,
                    }),
                }
            }
            else
                return {
                    ...state,
                    markers: [...state.markers, action.marker]
                }
        }
        case DELETE_MARKER:
            const isActive = state.activeMarker.itemId === action.itemId && state.activeMarker.itemType === action.itemType
            return {
                ...state,
                activeMarker: isActive ? initialState.activeMarker : state.activeMarker,
                markers: state.markers.filter(marker => (marker.id !== action.itemId || marker.itemType !== action.itemType)),
            }
        case LOAD_MARKERS:
            return (
                {
                    ...state,
                    markers: action.list,
                    loading: false
                }
            )
        case REFRESH_MARKERS:
            return initialState
        case SET_MAP_READY:
            return {
                ...state,
                mapReady: true
            }
        default:
            return state
    }
}
export default map