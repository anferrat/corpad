export const UPDATE_PROPERTY = 'UPDATE_PROPERTY'
export const LOAD_VIEW_STATE = 'LOAD_VIEW_STATE'
export const LOAD_EDIT_STATE = 'LOAD_EDIT_STATE'
export const SAVE_STATE = 'SAVE_STATE'
export const UPDATE_VIEW_PROPERTY = 'UPDATE_VIEW_PROPERTY'
export const UPDATE_EDIT_DATA = 'UPDATE_EDIT_DATA'
export const RESET_STATE = 'RESET_STATE'
export const RESET_RUN_SAVE_EFFECT = 'RESET_RUN_SAVE_EFFECT'

export const updateProperty = (value, property, valid = undefined) => {
    return { type: UPDATE_PROPERTY, value: value, property: property, valid: valid }
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

export const updateViewProperty = (value, property, valid = undefined) => {
    return { type: UPDATE_VIEW_PROPERTY, value: value, property: property, valid: valid }
}