import { UPDATE_POTENTIALS, DELETE_POTENTIAL, ADD_POTENTIAL, LOAD_POTENTIALS_STATE } from "../actions/potentials"

const initialState = []

const potentials = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POTENTIALS:
            if (state[action.index]) {
                if (state[action.index].hasOwnProperty('value') && state[action.index].hasOwnProperty('unit') && state[action.index].hasOwnProperty('valid')) {
                    return Object.assign([], state, {
                        [action.index]: {
                            ...state[action.index],
                            value: action.value === undefined ? state[action.index].value : action.value,
                            unit: action.unit === undefined ? state[action.index].unit : action.unit,
                            valid: action.valid === undefined ? state[action.index].valid : action.valid,
                        }
                    })
                }
                else return state
            }
            else return state
        case LOAD_POTENTIALS_STATE:
            return action.potentialsArray
        case ADD_POTENTIAL:
            return state.concat(action.potentialObject)
        case DELETE_POTENTIAL:
            return state.filter((_, index) => (index !== action.index))
        default: return state
    }
}

export default potentials