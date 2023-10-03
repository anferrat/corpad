import { TOGGLE_MAP_LAYER, ADD_MAP_LAYER, DELETE_MAP_LAYER, UPDATE_MAP_LAYER, LOAD_MAP_LAYERS, RESET_MAP_LAYERS } from "../actions/mapLayers"

const initialState = {
    layers: [],
    loading: true,
}

const mapLayers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MAP_LAYER:
            if (state.layers.length < 10)
                return {
                    ...state,
                    layers: state.layers.concat({
                        id: action.layerId,
                        name: action.name,
                        color: action.color,
                        width: action.width,
                        comment: action.comment,
                        data: action.data,
                        featureCount: action.featureCount,
                        visible: true
                    })
                }
            else return state
        case DELETE_MAP_LAYER:
            return {
                ...state,
                layers: state.layers.filter((_, index) => index !== action.index)
            }

        case UPDATE_MAP_LAYER:
            const layerIndex = state.layers.findIndex(({ id }) => id === action.layerId)
            if (~layerIndex)
                return {
                    ...state,
                    layers: Object.assign([], state.layers, {
                        [layerIndex]: {
                            ...state.layers[layerIndex],
                            name: action.name,
                            color: action.color,
                            width: action.width,
                            comment: action.comment,
                        }
                    })
                }
            else return state
        case TOGGLE_MAP_LAYER:
            return {
                ...state,
                layers: Object.assign([], state.layers, {
                    [action.index]: {
                        ...state.layers[action.index],
                        visible: action.isVisible
                    }
                })
            }
        case LOAD_MAP_LAYERS:
            return {
                ...state,
                layers: action.layers.map(({
                    id, name, comment, strokeColor, strokeWidth, visible, data, featureCount
                }) => ({
                    id,
                    name,
                    comment,
                    color: strokeColor,
                    width: strokeWidth,
                    visible,
                    data: data,
                    featureCount: featureCount
                })),
                loading: false
            }
        case RESET_MAP_LAYERS:
            return initialState
        default:
            return state
    }
}

export default mapLayers