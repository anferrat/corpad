import { RESET_RUN_SAVE_EFFECT, RESET_STATE, UPDATE_PROPERTY, LOAD_VIEW_STATE, LOAD_EDIT_STATE, SAVE_STATE, UPDATE_VIEW_PROPERTY, UPDATE_EDIT_DATA } from "../actions/item"

const initialState = {
    view: {},
    edit:
    {
        name: null,
        status: null,
        defaultName: null,
        valid: {
            name: true
        },
    },
    runSaveEffect: false,
}

const item = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_EDIT_DATA:
            return state
        case UPDATE_PROPERTY:
            if (state.edit.hasOwnProperty(action.property) && action.value !== undefined) {

                const newValidState = action.valid !== undefined ? { ...state.edit.valid, [action.property]: action.valid } : state.edit.valid
                return {
                    ...state,
                    edit: { ...state.edit, valid: newValidState, [action.property]: action.value }
                }
            }
            else return state
        case UPDATE_VIEW_PROPERTY: // updates both view and edit to keep data same across two screens. No valid prop, updaing view prop is ok only after validation
            if (state.view.hasOwnProperty(action.property) && action.value !== undefined) {
                return {
                    ...state,
                    edit: { ...state.edit, [action.property]: action.value },
                    view: { ...state.view, [action.property]: action.value },
                }
            }
            else return state
        case LOAD_VIEW_STATE:
            return {
                edit: action.itemObject,
                view: action.itemObject,
                runSaveEffect: false,
            }
        case LOAD_EDIT_STATE:
            return {
                ...state,
                edit: action.itemObject,
                runSaveEffect: false
            }
        case RESET_RUN_SAVE_EFFECT:
            return {
                ...state,
                runSaveEffect: false
            }
        case SAVE_STATE:
            {
                const timeNow = Date.now()
                const newName = (state.edit.name === null || state.edit.name === '') ? state.edit.defaultName : state.edit.name
                const status = state.edit.status !== null ? state.edit.status : 3
                return {
                    edit: {
                        ...state.edit,
                        status: status,
                        timeModified: timeNow,
                        name: newName,
                    },
                    view: {
                        ...state.edit,
                        tpCount: state.view.tpCount, //for pipelines counter of number of testPoints.
                        status: status,
                        timeModified: timeNow,
                        name: newName,
                    },
                    runSaveEffect: true,
                }
            }
        case RESET_STATE:
            return initialState
        default: return state
    }
}

export default item