import { UPDATE_SUBITEM_PROPERTY, LOAD_SUBITEM_STATE, SAVE_SUBITEM_STATE, RESET_SUBITEM_STATE } from "../actions/subitem"

const initialState = {
    name: null,
    type: undefined,
    defaultName: null,
    valid: {
        name: true
    },
    sideA: [],
    sideB: [],
    runSaveEffect: false,
}

const subitem = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SUBITEM_PROPERTY:
            if (state.hasOwnProperty(action.property) && action.value !== undefined) {
                const newValidState = action.valid !== undefined ? { ...state.valid, [action.property]: action.valid } : state.valid
                return { ...state, valid: newValidState, [action.property]: action.value }
            }
            else return state
        case LOAD_SUBITEM_STATE:
            return action.cardObject
        case RESET_SUBITEM_STATE:
            return initialState
        case SAVE_SUBITEM_STATE:
            return {
                ...state,
                name: (state.name === null || state.name === '') ? state.defaultName : state.name,
                runSaveEffect: true,

            }
        default:
            return state
    }
}

export default subitem