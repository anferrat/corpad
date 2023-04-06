import { RESET_RUN_SAVE_EFFECT, RESET_STATE, UPDATE_EDIT_ITEM_PROPERTY, LOAD_VIEW_STATE, LOAD_EDIT_STATE, SAVE_STATE, UPDATE_VIEW_PROPERTY, UPDATE_EDIT_DATA, VALIDATE_PROPERTY, UPDATE_CURRENT_COORDINATES, UPDATE_TAP_SETTING, RESET_EDIT_STATE, VALIDATE_VIEW_PROPERTY, SUBMIT_VIEW_PROPERTY } from "../actions/item"
import fieldValidation from '../../helpers/validation'

const initialState = {
    view: {
        loading: true
    },
    edit:
    {
        loading: true,
        saving: false
    }
}

const item = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case UPDATE_EDIT_DATA:
            return state
        case UPDATE_EDIT_ITEM_PROPERTY:
            if (state.edit.hasOwnProperty(action.property) && action.value !== undefined) {

                const newValidState = action.valid !== undefined ? { ...state.edit.valid, [action.property]: action.valid } : state.edit.valid
                return {
                    ...state,
                    edit: { ...state.edit, valid: newValidState, [action.property]: action.value }
                }
            }
            else return state
        case VALIDATE_PROPERTY:
            if (state.edit.hasOwnProperty(action.property)) {
                const validate = fieldValidation(state.edit[action.property], action.property)
                return {
                    ...state,
                    edit: {
                        ...state.edit,
                        [action.property]: validate.value,
                        valid: { ...state.edit.valid, [action.property]: validate.valid }
                    }
                }
            }
            else return state
        case UPDATE_CURRENT_COORDINATES:
            if (state.edit.hasOwnProperty('latitude') && state.edit.hasOwnProperty('longitude')) {
                const lat = fieldValidation(action.latitude, 'latitude')
                const lon = fieldValidation(action.longitude, 'longitude')
                return {
                    ...state,
                    edit: {
                        ...state.edit,
                        latitude: lat.value,
                        longitude: lon.value,
                        valid: {
                            ...state.edit.valid,
                            latitude: lat.valid,
                            longitude: lon.valid
                        }
                    }
                }
            }
            else return state
        case UPDATE_TAP_SETTING:
            if (action.tapSetting !== state.tapSetting)
                return {
                    ...state,
                    edit: {
                        ...state.edit,
                        tapSetting: action.tapSetting,
                        tapValue: null,
                        tapCoarse: null,
                        tapFine: null,
                        valid: {
                            ...state.edit.valid,
                            tapValue: true
                        }
                    }
                }
            else return state
        case SUBMIT_VIEW_PROPERTY:
            if (state.view.hasOwnProperty(action.property)) {
                const valid = state.view.valid.hasOwnProperty(action.property) ? { ...state.valid, [action.property]: true } : state.view.valid
                return {
                    ...state,
                    edit: {
                        ...state.edit,
                        timeModified: action.timeModified ?? state.edit.timeModified,
                        [action.property]: action.value,
                    },
                    view: {
                        ...state.view,
                        timeModified: action.timeModified ?? state.view.timeModified,
                        [action.property]: action.value,
                        valid: valid
                    }
                }
            }
            else return state
        case UPDATE_VIEW_PROPERTY: // updates both view and edit to keep data same across two screens. No valid prop, updaing view prop is ok only after validation
            if (state.view.hasOwnProperty(action.property))
                return {
                    ...state,
                    view: {
                        ...state.view,
                        [action.property]: action.value,
                    }
                }
            else return state
        case VALIDATE_VIEW_PROPERTY:
            if (state.view.hasOwnProperty(action.property))
                return {
                    ...state,
                    view: {
                        ...state.view,
                        [action.property]: action.value,
                        valid: { ...state.view.valid, [action.property]: action.valid }
                    }
                }
            else return state
        case LOAD_VIEW_STATE:
            return {
                edit: {
                    ...state.edit,
                    ...action.itemObject,
                    loading: false,
                    saving: false
                },
                view: {
                    ...state.view,
                    ...action.itemObject,
                    loading: false,
                }
            }
        case LOAD_EDIT_STATE:
            return {
                ...state,
                edit: {
                    ...state.edit,
                    ...action.itemObject,
                    loading: false,
                    saving: false,
                },
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
        case RESET_EDIT_STATE:
            return {
                ...state,
                edit: {
                    ...state.view,
                    loading: true,
                    saving: false
                }
            }
        default: return state
    }
}

export default item