import { LOAD_MARKERS, REFRESH_MARKERS, DELETE_MARKER, UPDATE_MARKER, SET_NEW_ITEM_MARKER, TOGGLE_SATELLITE_MODE, ACTIVATE_MARKER, RESET_ACTIVE_MARKERS, SET_MAP_READY, SET_ACTIVE_MAP_LAYER_MARKER, RESET_ACTIVE_MAP_LAYER_MARKER, APPLY_MAP_FILTER } from "../actions/map"

const initialState = {
    //FYI markers with lat === null or lon === null will still exist in this list. make sure, to filter them out when accessing markers
    markers: [],  //contains markers of items in current survey, access by id and itemType. uid as key
    loading: true, //indicates that map is loading markers (markers load once when survey loads for the first time)
    mapReady: false, //onMapReady status from rn-maps
    satelliteMode: false, // is satellite view on/off
    isFirstLoad: true, //flag determines if markers were loaded once befor, or its a first time
    filters: {
        statusFilter: [],
        markerTypeFilter: [],
    },
    newItemMarker: { //on long press will activate this marker. used to create items with coordinates
        active: false,
        latitude: null,
        longitude: null,
    },
    activeMarker: { //currently selected marker from markers. single marker that pops up when user selects marker from markers [].
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
        longitude: null,
        testPointType: null
    },
    activeMapLayerMarker: { //currently selected marker from mapLayers. Some map layers markers can be selected in order to view their properties
        layerId: null,
        latitude: null,
        longitude: null,
        layerName: null,
        index: null,
        name: null,
        color: null,
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
                activeMapLayerMarker: initialState.activeMapLayerMarker
            }
        case ACTIVATE_MARKER:
            return {
                ...state,
                activeMarker: action.marker,
                newItemMarker: initialState.newItemMarker,
                activeMapLayerMarker: initialState.activeMapLayerMarker
            }
        case RESET_ACTIVE_MARKERS:
            return {
                ...state,
                activeMarker: initialState.activeMarker,
                newItemMarker: initialState.newItemMarker,
                activeMapLayerMarker: initialState.activeMapLayerMarker
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
            const isActive = state.activeMarker.id === action.itemId && state.activeMarker.itemType === action.itemType
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
                    isFirstLoad: false,
                    loading: false
                }
            )
        case APPLY_MAP_FILTER:
            return ({
                ...state,
                loading: true,
                filters: {
                    ...state.filters,
                    [action.filterType]: action.filter
                },
                activeMarker: initialState.activeMarker,
                activeMapLayerMarker: initialState.activeMapLayerMarker,
                newItemMarker: initialState.newItemMarker,
            })
        case REFRESH_MARKERS:
            return initialState
        case SET_MAP_READY:
            return {
                ...state,
                mapReady: true
            }
        case SET_ACTIVE_MAP_LAYER_MARKER:
            return {
                ...state,
                activeMapLayerMarker: {
                    layerId: action.layerId,
                    latitude: action.latitude,
                    longitude: action.longitude,
                    layerName: action.layerName,
                    index: action.index,
                    name: action.name,
                    color: action.color,
                },
                activeMarker: initialState.activeMarker,
                newItemMarker: initialState.newItemMarker
            }
        case RESET_ACTIVE_MAP_LAYER_MARKER:
            if (action.layerId === state.activeMapLayerMarker.layerId)
                return {
                    ...state,
                    activeMapLayerMarker: initialState.activeMapLayerMarker
                }
            else return state
        default:
            return state
    }
}
export default map