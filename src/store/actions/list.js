// with regards of type of the list creates action that dispatches changes to the correct store. referencing actions for rectifierList, testPointList, pipelineList
export const SET_RESFRESH = 'SET_RESFRESH'
export const SET_DISPLAYED_READING = 'SET_DISPLAYED_READING'
export const SET_SORTING_SETTING = 'SET_SORTING_SETTING'
export const APPLY_FILTER = 'APPLY_FILTER'
export const RESET_FILTERS = 'RESET_FILTERS'
export const SET_OFFSET = 'SET_OFFSET'
export const LOAD_LIST_STATE = 'LOAD_LIST_STATE'
export const RESET_LIST_STATE = 'RESET_LIST_STATE'
export const UPDATE_LIST = 'UPDATE_LIST'
export const DELETE_ITEM_FROM_LIST = 'DELETE_ITEM_FROM_LIST'

export const resetListState = (listType) => {
    return { type: listType + '_' + RESET_LIST_STATE }
}

export const setRefresh = (listType) => {
    return { type: listType + '_' + SET_RESFRESH }
}

export const setDisplayedReading = (listType, displayedReading) => {
    return { type: listType + '_' + SET_DISPLAYED_READING, displayedReading: displayedReading }
}

export const setSortingSetting = (listType, sorting) => {
    return { type: listType + '_' + SET_SORTING_SETTING, sorting: sorting}
}

export const applyFilter = (listType, filter, filterValue) => {
    return { type: listType + '_' + APPLY_FILTER, filter: filter, filterValue: filterValue }
}

export const setOffset = (listType, offset) => {
    return { type: listType + '_' + SET_OFFSET, offset: offset }
}

export const resetFilters = (listType) => {
    return { type: listType + '_' + RESET_FILTERS }
}

export const loadListState = (listType, itemList, idList) => {
    return { type: listType + '_' + LOAD_LIST_STATE, idList: idList, itemList: itemList }
}

export const updateList = (listType, itemId, itemObject) => {
    return { type: listType + '_' + UPDATE_LIST, itemObject: itemObject, itemId: itemId }
}

export const deleteItemFromList = (listType, itemId) => {
    return { type: listType + '_' + DELETE_ITEM_FROM_LIST, itemId: itemId }
}