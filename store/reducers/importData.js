import { SET_IMPORT_ITEM_TYPE, SET_IMPORT_DATA, SET_IMPORT_ITEM_PROPERTY, RESET_IMPORT_ITEM } from "../actions/importData"

const initialState = {
    data: [],
    fields: [],
    fileName: null,
    item: {
        testPointType: 0,
    },
    itemImportedProperties: {
        name: 0
    },
    subitems: [],
    itemType: 'TEST_POINT',
}

const importData = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMPORT_ITEM_TYPE:
            return {
                ...state,
                itemType: action.itemType
            }
        case SET_IMPORT_DATA:
            return {
                ...state,
                fields: action.fields,
                data: action.data,
                fileName: action.fileName,
            }
        case SET_IMPORT_ITEM_PROPERTY:
            return {
                ...state,
                item: action.fromFile ? state.item : {
                    ...state.item,
                    [action.property]: action.value
                },
                itemImportedProperties: action.fromFile ? {
                    ...state.itemImportedProperties,
                    [action.property]: action.value,
                } : state.itemImportedProperties
            }
        case RESET_IMPORT_ITEM:
            return {
                ...state,
                item: initialState.item,
                itemImportedProperties: initialState.itemImportedProperties
            }
        default: return state
    }
}

export default importData