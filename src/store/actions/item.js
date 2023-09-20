export const UPDATE_EDIT_ITEM_PROPERTY = 'UPDATE_EDIT_ITEM_PROPERTY'
export const LOAD_VIEW_STATE = 'LOAD_VIEW_STATE'
export const LOAD_EDIT_STATE = 'LOAD_EDIT_STATE'
export const SAVE_STATE = 'SAVE_STATE'
export const UPDATE_VIEW_PROPERTY = 'UPDATE_VIEW_PROPERTY'
export const UPDATE_EDIT_DATA = 'UPDATE_EDIT_DATA'
export const RESET_STATE = 'RESET_STATE'
export const RESET_RUN_SAVE_EFFECT = 'RESET_RUN_SAVE_EFFECT'
export const VALIDATE_PROPERTY = 'VALIDATE_PROPERTY'
export const UPDATE_CURRENT_COORDINATES = 'UPDATE_CURRENT_COORDINATES'
export const UPDATE_TAP_SETTING = 'UPDATE_TAP_SETTING'
export const RESET_EDIT_STATE = 'RESET_EDIT_STATE'
export const VALIDATE_VIEW_PROPERTY = 'VALIDATE_VIEW_PROPERTY'
export const SUBMIT_VIEW_PROPERTY = 'SUBMIT_VIEW_PROPERTY'
export const ADD_EDIT_IMAGE = 'ADD_EDIT_IMAGE'
export const DELETE_EDIT_IMAGE = 'DELETE_EDIT_IMAGE'

export const updateEditItemProperty = (value, property, valid = undefined) => {
    return { type: UPDATE_EDIT_ITEM_PROPERTY, value: value, property: property, valid: valid }
}

export const validateProperty = (property) => {
    return { type: VALIDATE_PROPERTY, property: property }
}

export const resetState = () => {
    return { type: RESET_STATE }
}

export const loadViewState = (itemObject) => {
    return { type: LOAD_VIEW_STATE, itemObject: itemObject }
}

export const resetRunSafeEffect = () => {
    return { type: RESET_RUN_SAVE_EFFECT }
}

export const loadEditState = (itemObject) => {
    return { type: LOAD_EDIT_STATE, itemObject: itemObject }
}

export const saveState = () => {
    return { type: SAVE_STATE }
}

export const updateViewProperty = (value, property) => {
    return { type: UPDATE_VIEW_PROPERTY, value: value, property: property }
}

export const addEditImage = (uri) => (
    { type: ADD_EDIT_IMAGE, uri }
)

export const deleteEditImage = (index) => (
    { type: DELETE_EDIT_IMAGE, index }
)

export const submitViewProperty = (value, property, timeModified = undefined) => {
    return { type: SUBMIT_VIEW_PROPERTY, value: value, property: property, timeModified }
}

export const validateViewProperty = (value, property, valid = false) => {
    return { type: VALIDATE_VIEW_PROPERTY, value: value, property: property, valid }
}

export const updateCurrentCoordinates = (latitude, longitude) => {
    return { type: UPDATE_CURRENT_COORDINATES, latitude, longitude }
}

export const updateTapSetting = (tapSetting) => {
    return { type: UPDATE_TAP_SETTING, tapSetting }
}

export const resetEditState = () => {
    return { type: RESET_EDIT_STATE }
}