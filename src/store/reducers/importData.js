import { SET_IMPORT_ITEM_TYPE, SET_IMPORT_DATA, SET_IMPORT_ITEM_PROPERTY_FIELD_INDEX, SET_IMPORT_ITEM_PROPERTY, RESET_IMPORT_ITEM } from "../actions/importData"
import { Input, ITEM, Select } from '../../features/import/models/models' //change it

const initialItemType = 'TEST_POINT'

const initialState = {
    data: [],
    fields: [],
    defaultNames: [],
    fileName: null,
    item: new ITEM(initialItemType),
    subitems: [],
    itemType: initialItemType,
}


const importData = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMPORT_ITEM_TYPE:
            return {
                ...state,
                itemType: action.itemType,
                item: new ITEM(action.itemType)
            }
        case SET_IMPORT_DATA:
            return {
                ...state,
                fields: action.fields,
                data: action.data,
                fileName: action.fileName,
                defaultNames: action.defaultNames,
            }
        case SET_IMPORT_ITEM_PROPERTY_FIELD_INDEX:
            return {
                ...state,
                item: state.item.setPropertyFieldIndex(action.property, action.index)
            }
        case SET_IMPORT_ITEM_PROPERTY: {
            return {
                ...state,
                item: state.item[action.property] instanceof Select ? state.item.setSelectProperty(action.property, action.value) : state.item.setProperty(action.property, action.value),
            }
        }

        case RESET_IMPORT_ITEM:
            return initialState

        default: return state
    }
}

export default importData