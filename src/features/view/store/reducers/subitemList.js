import { calculateCouponDensity, currentCalculation } from '../../../../helpers/functions'
import fieldValidation from '../../../../helpers/validation'

export const initialState = {
    loading: true,
    subitems: [],
    pipelineList: [],
    referenceCells: [],
    potentialUnit: null,
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
                        [action.property]: action.value,
                    }
                })
            })
        case 'VALIDATE_COUPON_CURRENT':
            {
                const { value, valid } = fieldValidation(state.subitems[action.subitemIndex].current, 'current')
                const density = valid ? calculateCouponDensity(value, state.subitems[action.subitemIndex].area) : state.subitems[action.subitemIndex].density
                return ({
                    ...state,
                    subitems: Object.assign([], state.subitems, {
                        [action.subitemIndex]: {
                            ...state.subitems[action.subitemIndex],
                            current: value,
                            density: density,
                            valid: {
                                ...state.subitems[action.subitemIndex].valid,
                                current: valid,
                            }
                        }
                    })
                })
            }
        case 'VALIDATE_CURRENT':
            {
                const { value, valid } = fieldValidation(state.subitems[action.subitemIndex].current, 'current')
                return ({
                    ...state,
                    subitems: Object.assign([], state.subitems, {
                        [action.subitemIndex]: {
                            ...state.subitems[action.subitemIndex],
                            current: value,
                            valid: {
                                ...state.subitems[action.subitemIndex].valid,
                                current: valid,
                            }
                        }
                    })
                })
            }
        case 'VALIDATE_VOLTAGE':
            {
                const { value, valid } = fieldValidation(state.subitems[action.subitemIndex].voltage, 'voltage')
                return ({
                    ...state,
                    subitems: Object.assign([], state.subitems, {
                        [action.subitemIndex]: {
                            ...state.subitems[action.subitemIndex],
                            voltage: value,
                            valid: {
                                ...state.subitems[action.subitemIndex].valid,
                                voltage: valid,
                            }
                        }
                    })
                })
            }
        case 'VALIDATE_VOLTAGE_DROP':
            {
                const { value, valid } = fieldValidation(state.subitems[action.subitemIndex].voltageDrop, 'voltageDrop')
                const current = valid ? currentCalculation(value, state.subitems[action.subitemIndex].factor) : state.subitems[action.subitemIndex].current
                return ({
                    ...state,
                    subitems: Object.assign([], state.subitems, {
                        [action.subitemIndex]: {
                            ...state.subitems[action.subitemIndex],
                            current: current,
                            voltageDrop: value,
                            valid: {
                                ...state.subitems[action.subitemIndex].valid,
                                voltageDrop: valid,
                            }
                        }
                    })
                })
            }
        case 'TOGGLE_SHORTED':
            return ({
                ...state,
                subitems: Object.assign([], state.subitems, {
                    [action.subitemIndex]: {
                        ...state.subitems[action.subitemIndex],
                        current: null,
                        shorted: action.shorted,
                        valid: {
                            ...state.subitems[action.subitemIndex].valid,
                            current: true,
                        }
                    }
                })
            })
        default:
            return state
    }
}