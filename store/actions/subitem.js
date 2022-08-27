export const UPDATE_SUBITEM_PROPERTY = 'UPDATE_SUBITEM_PROPERTY'
export const LOAD_SUBITEM_STATE = 'LOAD_SUBITEM_STATE'
export const SAVE_SUBITEM_STATE = 'SAVE_SUBITEM_STATE'
export const RESET_SUBITEM_STATE = 'RESET_SUBITEM_STATE'

export const updateSubitemProperty = (value, property, valid = undefined) => {
    return { type: UPDATE_SUBITEM_PROPERTY, value: value, property: property, valid: valid }
}

export const loadSubitemState = (cardObject) => {
    return { type: LOAD_SUBITEM_STATE, cardObject: cardObject }
}

export const resetSubitemState = () => {
    return { type: RESET_SUBITEM_STATE }
}

export const saveSubitemState = (cardId, testPointId) => {
    return { type: SAVE_SUBITEM_STATE, cardId: cardId, testPointId: testPointId }
}