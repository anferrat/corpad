export const initialState = {
    loading: true,
    subitems: [],
    pipelineList: [],
    referenceCells: [],
    potentialUnit: null,
    availableMeasurementTypes: [] //Measurement types that connected multimeter can capture
}

export function reducer(state, action) {
    switch (action.type) {
        case 'LOAD_DATA':
            return {
                loading: false,
                subitems: action.subitems,
                pipelineList: action.pipelineList,
                potentialUnit: action.potentialUnit,
                referenceCells: action.referenceCells,
                availableMeasurementTypes: action.availableMeasurementTypes,
            }
        case 'UPDATE_POTENTIAL':
            return ({
                ...state,
                subitems: Object.assign([], state.subitems,
                    {
                        [action.subitemIndex]: {
                            ...state.subitems[action.subitemIndex], potentials:
                                Object.assign([], state.subitems[action.subitemIndex].potentials, {
                                    [action.potentialIndex]: {
                                        ...state.subitems[action.subitemIndex].potentials[action.potentialIndex],
                                        value: action.value,
                                        valid: action.valid ?? state.subitems[action.subitemIndex].potentials[action.potentialIndex].valid
                                    }
                                })
                        }
                    })
            })
        case 'UPDATE_SUBITEM_PROPERTY':
            return ({
                ...state,
                subitems: Object.assign([], state.subitems, {
                    [action.subitemIndex]: {
                        ...state.subitems[action.subitemIndex],
                        ...action.value,
                        valid: { ...state.subitems[action.subitemIndex].valid, ...action.valid }
                    }
                })
            })
        case 'UPDATE_SUBITEM': {
            const index = state.subitems.findIndex(({ id }) => id === action.subitem.id)
            return ({
                ...state,
                subitems: ~index ?
                    Object.assign([], state.subitems, {
                        [index]: {
                            ...state.subitems[index],
                            ...action.subitem,
                            potentials: state.subitems[index].potentials
                        }
                    }) : [action.subitem].concat(state.subitems)
            })
        }
        case 'UPDATE_POTENTIALS': {
            const index = state.subitems.findIndex(({ id }) => id === action.subitemId)
            return ({
                ...state,
                subitems: ~index ?
                    Object.assign([], state.subitems, {
                        [index]: {
                            ...state.subitems[index],
                            potentials: action.potentials
                        }
                    }) :
                    [{
                        id: action.subitemId,
                        potentials: action.potentials
                    }].concat(state.subitems)
            })
        }
        case 'UPDATE_POTENTIAL_BY_ID': {
            const index = state.subitems.findIndex(({ id }) => id === action.subitemId)
            if (~index) {
                const potentialIndex = state.subitems[index].potentials.findIndex(({ id }) => id === action.potentialId)
                if (~potentialIndex)
                    return ({
                        ...state,
                        subitems:
                            Object.assign([], state.subitems, {
                                [index]: {
                                    ...state.subitems[index],
                                    potentials: Object.assign([], state.subitems[index].potentials, {
                                        [potentialIndex]: {
                                            ...state.subitems[index].potentials[potentialIndex],
                                            value: action.value,
                                            valid: action.valid
                                        }
                                    })
                                }
                            })
                    })
                else return state
            }
            else return state
        }
        case 'DELETE_SUBITEM':
            return ({
                ...state,
                subitems: state.subitems.filter(({ id }) => id !== action.subitemId)
            })
        case 'REFRESH':
            return initialState

        default:
            return state
    }
}