import { LOAD_MARKERS, REFRESH_MARKERS, ADD_MARKER, DELETE_MARKER, UPDATE_MARKER, SET_ACTIVE_MARKER, SET_MARKER_UPDATE, SET_NEW_ITEM_MARKER, SET_MY_LOCATION_ACTIVE, SET_SATELLITE, SHOW_MARKER_ON_MAP } from "../actions/map"

/*
Marker: 
{
    dataType: 'TEST_POINT',
    id: 10,
    uid: '323jsjnds-sdsd',
    status: 2,
    testPointType: 'HD',
    latitude: 123.33,
    longitude: 45.22,
    name: 'TP#2',
    location: '143 Dalcastle Way NW'
}
*/
const initialState = {
    markers: [],
    refreshing: true,
    updating: null,
    myLocationActive: false,
    satellite: false,
    newItemMarker: {
        latitude: null,
        longitude: null,
    },
    showMarker: { //when this value is set map will try to find marker in marker list and activate it (show on map button in View Screen)
        dataType: null,
        id: null,
    },
    activeMarker: {
        id: null,
        dataType: null,
        latitude: null,
        longitude: null,
        testPointType: null,
        uid: null,
        name: null,
        status: null,
        location: null
    }
}

const map = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_LOCATION_ACTIVE: {
            return {
                ...state,
                myLocationActive: action.value
            }
        }
        case SET_SATELLITE: {
            return {
                ...state,
                satellite: action.value
            }
        }
        case SET_NEW_ITEM_MARKER:
            return {
                ...state,
                newItemMarker: {
                    latitude: action.latitude,
                    longitude: action.longitude,
                },
                activeMarker: initialState.activeMarker,
            }
        case SET_MARKER_UPDATE:
            return {
                ...state,
                updating: action.dataType === 'PIPELINE' || action.action === 'RESET' || state.refreshing ? null : { //state.refreshing - no marker update when markers haven't been fetched yet
                    action: action.action,
                    dataType: action.dataType,
                    id: action.id
                }
            }
        case SET_ACTIVE_MARKER:
            return {
                ...state,
                activeMarker: action.markerObject !== null ? action.markerObject : initialState.activeMarker,
                newItemMarker: initialState.newItemMarker,
                showMarker: initialState.showMarker
            }
        case SHOW_MARKER_ON_MAP:
            return {
                ...state,
                showMarker: action.id !== null ? {
                    id: action.id,
                    dataType: action.dataType
                } :
                    initialState.showMarker
            }
        case ADD_MARKER:
            return {
                ...state,
                updating: null,
                markers: [...state.markers, action.marker],
            }
        case UPDATE_MARKER:
            const markerIndex = state.markers.findIndex(marker => marker.id === action.marker.id && marker.dataType === action.marker.dataType)
            if (markerIndex === -1)
                return state
            else
                return {
                    ...state,
                    updating: null,
                    activeMarker: state.activeMarker.uid === state.markers[markerIndex].uid ? action.marker : state.activeMarker,
                    markers: Object.assign([], state.markers, {
                        [markerIndex]: action.marker,
                    }),
                }
        case DELETE_MARKER:
            return {
                ...state,
                updating: null,
                activeMarker: state.activeMarker.id === action.id && state.activeMarker.dataType === action.dataType ? initialState.activeMarker : state.activeMarker,
                markers: state.markers.filter(marker => (marker.id !== action.id || marker.dataType !== action.dataType)),
            }
        case LOAD_MARKERS:
            return (
                {
                    ...state,
                    markers: action.list,
                    refreshing: false
                }
            )
        case REFRESH_MARKERS:
            return initialState
        default:
            return state
    }
}
export default map