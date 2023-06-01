import { SET_IMPORT_ITEM_TYPE, SET_IMPORT_DATA, ADD_IMPORT_SUBITEM, SET_IMPORT_PROPERTY, RESET_IMPORT_ITEM, SET_IMPORT_SUBITEM_SETTING, ADD_IMPORT_SUBITEM_POTENTIAL, REMOVE_IMPORT_SUBITEM_POTENTAIL, REMOVE_IMPORT_SUBITEM, SET_IMPORT_ITEM_SETTING } from "../actions/importData"
import { getItem, getSubitem, getPotentialParameter } from "../../features/import/models/models"

const initialItemType = 'TEST_POINT'

const initialState = {
    data: [],
    fields: [],
    defaultNames: [],
    fileName: null,
    uri: null,
    item: getItem(initialItemType),
    subitems: [],
    itemType: initialItemType,
    extraData: {
        potentialTypes: [],
        pipelineList: [],
        referenceCellList: [],
        autoCreatePotentials: false
    }
}


const importData = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMPORT_ITEM_TYPE:
            return {
                ...state,
                itemType: action.itemType,
                item: getItem(action.itemType),
                subitems: initialState.subitems
            }
        case SET_IMPORT_DATA:
            return {
                ...state,
                fields: action.fields,
                data: action.data,
                fileName: action.fileName,
                uri: action.uri,
                defaultNames: action.defaultNames,
                extraData: {
                    potentialTypes: action.potentialTypes,
                    pipelineList: action.pipelines,
                    referenceCellList: action.referenceCells,
                    autoCreatePotentials: action.autoCreatePotentials
                }
            }
        case SET_IMPORT_PROPERTY: {
            if (action.subitemIndex === null && action.potentialIndex === null)
                return {
                    ...state,
                    item: {
                        ...state.item,
                        [action.property]:
                        {
                            ...state.item[action.property],
                            ...action.value
                        }
                    },
                }
            else if (action.potentialIndex === null)
                return {
                    ...state,
                    subitems: Object.assign([], state.subitems, {
                        [action.subitemIndex]: {
                            ...state.subitems[action.subitemIndex],
                            [action.property]: {
                                ...state.subitems[action.subitemIndex][action.property],
                                ...action.value,
                            }
                        }
                    })
                }
            else return {
                ...state,
                subitems: Object.assign([], state.subitems, {
                    [action.subitemIndex]: {
                        ...state.subitems[action.subitemIndex],
                        potentials: Object.assign([], state.subitems[action.subitemIndex].potentials, {
                            [action.potentialIndex]: {
                                ...state.subitems[action.subitemIndex].potentials[action.potentialIndex],
                                ...action.value,
                            }
                        })
                    }
                })
            }
        }
        case SET_IMPORT_SUBITEM_SETTING: {
            if (action.subitemIndex === null || action.property === null)
                return state
            else return {
                ...state,
                subitems: Object.assign([], state.subitems, {
                    [action.subitemIndex]: {
                        ...state.subitems[action.subitemIndex],
                        [action.property]: action.value
                    }
                })
            }
        }

        case SET_IMPORT_ITEM_SETTING: {
            if (state.item[action.property] === undefined)
                return state
            else return {
                ...state,
                item: {
                    ...state.item,
                    [action.property]: action.value
                }
            }
        }

        case ADD_IMPORT_SUBITEM_POTENTIAL:
            return {
                ...state,
                subitems: Object.assign([], state.subitems, {
                    [action.subitemIndex]: {
                        ...state.subitems[action.subitemIndex],
                        potentials: state.subitems[action.subitemIndex].potentials.concat(getPotentialParameter(action.potentialTypeIndex, action.referenceCellIndex))
                    }
                })
            }
        case REMOVE_IMPORT_SUBITEM_POTENTAIL:
            return {
                ...state,
                subitems: Object.assign([], state.subitems, {
                    [action.subitemIndex]: {
                        ...state.subitems[action.subitemIndex],
                        potentials: state.subitems[action.subitemIndex].potentials.filter((_, i) => i !== action.potentialIndex)
                    }
                })
            }
        case ADD_IMPORT_SUBITEM:
            return {
                ...state,
                subitems: state.subitems.concat(getSubitem(action.subitemType, action.autoCreatePotentials, action.initialPotentials))
            }
        case REMOVE_IMPORT_SUBITEM:
            return {
                ...state,
                subitems: state.subitems.filter((_, i) => action.subitemIndex !== i)
            }
        case RESET_IMPORT_ITEM:
            return initialState

        default: return state
    }
}

export default importData