import { UPDATE_POTENTIALS, DELETE_POTENTIAL, ADD_POTENTIAL, LOAD_POTENTIALS_STATE, RESET_POTENTIALS_STATE } from "../actions/potentials"

const initialState = {
    potentials: [],
    referenceCells: [],
    potentialTypes: [],
    unit: null,
    loading: true
}

const potentials = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POTENTIALS:
            if (state.potentials[action.index]) {
                if (state.potentials[action.index].hasOwnProperty('value') && state.potentials[action.index].hasOwnProperty('valid')) {
                    return {
                        ...state,
                        potentials: Object.assign([], state.potentials, {
                            [action.index]: {
                                ...state.potentials[action.index],
                                value: action.value,
                                valid: action.valid,
                            }
                        })
                    }
                }
                else return state
            }
            else return state
        case LOAD_POTENTIALS_STATE:
            return {
                ...state,
                referenceCells: action.referenceCells,
                potentialTypes: action.potentialTypes,
                unit: action.unit,
                potentials: action.potentials,
                loading: false
            }
        case ADD_POTENTIAL:
            return {
                ...state,
                potentials: state.potentials.concat(action.potentialObject)
            }
        case DELETE_POTENTIAL:
            return {
                ...state,
                potentials: state.potentials.filter((_, index) => (index !== action.index))
            }
        case RESET_POTENTIALS_STATE:
            return initialState
        default: return state
    }
}

export default potentials