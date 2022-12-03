import { SET_EXPORT_SETTING, SET_ITEM_TYPE, SET_POTENTIALS_CHECKED, SET_READINGS_CHECKED, SET_CIRCUITS_CHECKED, RESET_EXPORT } from '../actions/exportSurvey'

const initialState = {
    itemType: 'TEST_POINT',
    potentialsChecked: false,
    readingsChecked: false,
    circuitsChecked: false,
    sorting: 0,
    selectedReference: 0,
    selectedPipelines: [],
    selectedPotentialTypes: [],
    selectedPotentialReadings: [],
    selectedReadings: [],
    selectedProperties: ['name'],
    selectedCircuitReadings: [],
    extraData: {
        isLoading: true,
        pipelineList: [],
        referenceCellList: [],
        potentialTypes: []
    },
}

const exportSurvey = (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEM_TYPE:
            if (action.value === state.itemType)
                return state
            else
                return {
                    ...initialState,
                    itemType: action.value,
                    extraData: state.extraData,
                    sorting: state.sorting
                }
        case SET_EXPORT_SETTING:
            return {
                ...state,
                [action.property]: action.value
            }
        case RESET_EXPORT:
            return {
                ...initialState,
            }
        case SET_POTENTIALS_CHECKED:
            if (action.value)
                return {
                    ...state,
                    potentialsChecked: true,
                    selectedPipelines: state.extraData.pipelineList.map((_, i) => i)
                }
            else
                return {
                    ...state,
                    potentialsChecked: false,
                    selectedPotentialReadings: initialState.selectedPotentialReadings,
                    selectedPotentialTypes: initialState.selectedPotentialTypes,
                    selectedPipelines: state.extraData.pipelineList.map((_, i) => i),
                    selectedReference: 0,
                }
        case SET_READINGS_CHECKED:
            if (action.value)
                return {
                    ...state,
                    readingsChecked: true
                }
            else return {
                ...state,
                readingsChecked: false,
                selectedReadings: initialState.selectedReadings
            }
        case SET_CIRCUITS_CHECKED:
            if (action.value)
                return {
                    ...state,
                    circuitsChecked: true
                }
            else return {
                ...state,
                circuitsChecked: false,
                selectedCircuitReadings: initialState.selectedCircuitReadings
            }
        default:
            return state
    }
}

export default exportSurvey