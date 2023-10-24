import { calculateCouponDensity, currentCalculation, factorCalculation } from "../../helpers/functions"
import fieldValidation from '../../helpers/validation'
import { convertLength } from "../../app/controllers/survey/other/ConverterController"
import { UPDATE_SUBITEM_PROPERTY, LOAD_SUBITEM_STATE, SAVE_SUBITEM_STATE, RESET_SUBITEM_STATE, UPDATE_SUBITEM_SHORTED, UPDATE_SUBITEM_RATIO, UPDATE_SUBITEM_FACTOR, UPDATE_SUBITEM_VOLTAGE_DROP, VALIDATE_SUBITEM_PROPERTY, UPDATE_SUBITEM_COUPON_PROPERTY, ADD_SUBITEM_SOIL_RESISTIVITY_LAYER, DELETE_SUBITEM_SOIL_RESISTIVITY_LAYER, UPDATE_SUBITEM_SPACING_UNIT, ADD_SUBITEM_ANODE_BED_ANODE, DELETE_SUBITEM_ANODE_BED_ANODE, UPDATE_SUBITEM_SUB_PROPERTY, VALIDATE_SUBITEM_SUB_PROPERTY, SET_SUBITEM_ANODE_WIRE_PROPERTIES } from "../actions/subitem"

const initialState = {
    name: null,
    type: undefined,
    defaultName: null,
    valid: {
        name: true
    },
    sideA: [],
    sideB: [],
    pipelineNameAsDefault: false,
    pipelineList: [],
    cardList: [],
    loading: true,
    saving: false
}

const subitem = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SUBITEM_PROPERTY:
            if (state.hasOwnProperty(action.property) && action.value !== undefined) {
                const newValidState = action.valid !== undefined ? { ...state.valid, [action.property]: action.valid } : state.valid
                return { ...state, valid: newValidState, [action.property]: action.value }
            }
            else return state
        case VALIDATE_SUBITEM_PROPERTY:
            if (state.hasOwnProperty(action.property)) {
                const validate = fieldValidation(state[action.property], action.property)
                return {
                    ...state,
                    [action.property]: validate.value,
                    valid: {
                        ...state.valid,
                        [action.property]: validate.valid
                    }
                }
            }
            else return state
        case UPDATE_SUBITEM_COUPON_PROPERTY:
            if (action.property === 'current' || action.property === 'area') {
                const validate = fieldValidation(state[action.property], action.property)
                const updated = { ...state, [action.property]: validate.value, valid: { ...state.valid, [action.property]: validate.valid } }
                if (updated.valid.area && updated.valid.current)
                    return {
                        ...updated,
                        density: calculateCouponDensity(updated.current, updated.area)
                    }
                else return {
                    ...updated,
                    density: null
                }
            }
            else return state
        case UPDATE_SUBITEM_SHORTED:
            if (state.hasOwnProperty('shorted'))
                if (action.value)
                    return {
                        ...state,
                        shorted: true,
                        current: null,
                        fromAtoB: true
                    }
                else return {
                    ...state,
                    shorted: false,
                    current: null,
                }
            else return state
        case UPDATE_SUBITEM_RATIO: {
            if (action.property === 'ratioVoltage' || action.property === 'ratioCurrent') {
                if (action.value === undefined) {
                    const validate = fieldValidation(state[action.property], action.property)
                    const updated = { ...state, [action.property]: validate.value, valid: { ...state.valid, [action.property]: validate.valid } }
                    if (updated.valid.ratioVoltage && updated.valid.ratioCurrent && updated.valid.voltageDrop && !state.factorSelected) {
                        const factor = factorCalculation(updated.ratioVoltage, updated.ratioCurrent)
                        return {
                            ...updated,
                            factor: factor,
                            current: currentCalculation(updated.voltageDrop, factor)
                        }
                    }
                    else return updated
                }
                else {
                    return {
                        ...state,
                        [action.property]: action.value,
                        factorSelected: false,
                        factor: null
                    }
                }
            }
            else return state
        }
        case UPDATE_SUBITEM_FACTOR:
            if (action.value !== undefined)
                return {
                    ...state,
                    factor: action.value,
                    factorSelected: true,
                    ratioCurrent: null,
                    ratioVoltage: null
                }
            else {
                const validation = fieldValidation(state.factor, 'factor')
                const updated = { ...state, factor: validation.value, valid: { ...state.valid, factor: validation.valid } }
                if (updated.valid.voltageDrop && updated.valid.factor)
                    return {
                        ...updated,
                        current: currentCalculation(updated.voltageDrop, updated.factor)
                    }
                else return updated
            }
        case UPDATE_SUBITEM_VOLTAGE_DROP:
            const validation = fieldValidation(state.voltageDrop, 'voltageDrop')
            const updated = {
                ...state,
                voltageDrop: validation.value,
                valid: { ...state.valid, voltageDrop: validation.valid }
            }
            if (updated.valid.voltageDrop && updated.valid.factor)
                return {
                    ...updated,
                    current: currentCalculation(updated.voltageDrop, updated.factor)
                }
            else return updated

        case ADD_SUBITEM_SOIL_RESISTIVITY_LAYER:
            return {
                ...state,
                layers: state.layers.concat({
                    resistanceToZero: null,
                    spacing: null
                }),
                valid: {
                    ...state.valid,
                    layers: state.valid.layers.concat({
                        spacing: true,
                        resistanceToZero: true
                    })
                }
            }
        case DELETE_SUBITEM_SOIL_RESISTIVITY_LAYER:
            return {
                ...state,
                layers: state.layers.filter((_, index) => index !== action.index),
                valid: {
                    ...state.valid,
                    layers: state.valid.layers.filter((_, index) => index !== action.index)
                }
            }
        case UPDATE_SUBITEM_SUB_PROPERTY:
            return {
                ...state,
                [action.parentProperty]: Object.assign([], state[action.parentProperty], {
                    [action.index]: {
                        ...state[action.parentProperty][action.index],
                        [action.property]: action.value
                    }
                })
            }
        case VALIDATE_SUBITEM_SUB_PROPERTY: {
            const { valid, value } = fieldValidation(state[action.parentProperty][action.index][action.property], action.property)
            console.log(valid)
            return {
                ...state,
                valid: {
                    ...state.valid,
                    [action.parentProperty]: Object.assign([], state.valid[action.parentProperty], {
                        [action.index]: {
                            ...state.valid[action.parentProperty][action.index],
                            [action.property]: valid
                        }
                    })
                },
                [action.parentProperty]: Object.assign([], state[action.parentProperty], {
                    [action.index]: {
                        ...state[action.parentProperty][action.index],
                        [action.property]: value
                    }
                })
            }
        }
        case UPDATE_SUBITEM_SPACING_UNIT: {
            return {
                ...state,
                spacingUnit: action.unit,
                layers: state.layers.map((layer, index) => {
                    return ({
                        ...layer,
                        spacing: state.valid.layers[index].spacing ? Math.round(convertLength({ value: Number(layer.spacing), inputUnit: state.spacingUnit, outputUnit: action.unit }).response * 1000) / 1000 : layer.spacing
                    })
                })
            }
        }
        case ADD_SUBITEM_ANODE_BED_ANODE:
            return {
                ...state,
                anodes: state.anodes.concat({
                    current: null,
                    wireColor: state.anodes.length === 0 ? null : state.anodes[state.anodes.length - 1].wireColor,
                    wireGauge: state.anodes.length === 0 ? null : state.anodes[state.anodes.length - 1].wireGauge
                }),
                valid: {
                    ...state.valid,
                    anodes: state.valid.anodes.concat({
                        current: true,
                    })
                }
            }
        case DELETE_SUBITEM_ANODE_BED_ANODE:
            return {
                ...state,
                anodes: state.anodes.filter((_, index) => index !== action.index),
                valid: {
                    ...state.valid,
                    anodes: state.valid.anodes.filter((_, index) => index !== action.index)
                }
            }
        case SET_SUBITEM_ANODE_WIRE_PROPERTIES:
            return {
                ...state,
                anodes: state.anodes.map((anode) => ({ ...anode, wireColor: action.wireColor, wireGauge: action.wireGauge })),
            }
        case LOAD_SUBITEM_STATE:
            return {
                ...action.cardObject,
                loading: false,
                saving: false
            }
        case SAVE_SUBITEM_STATE:
            return {
                ...state,
                name: (state.name === null || state.name === '') ? state.defaultName : state.name,
                runSaveEffect: true,
            }
        case RESET_SUBITEM_STATE:
            return initialState
        default:
            return state
    }
}

export default subitem