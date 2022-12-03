// with regards of type of the list creates action that dispatches changes to the correct store. referencing actions for rectifierList, testPointList, pipelineList
export const SET_RESFRESH = 'SET_RESFRESH'
export const SET_DISPLAYED_READING = 'SET_DISPLAYED_READING'
export const SET_SORTING_SETTING = 'SET_SORTING_SETTING'
export const SET_FILTER_VIEW = 'SET_FILTER_VIEW'
export const APPLY_FILTER = 'APPLY_FILTER'
export const RESET_FILTERS = 'RESET_FILTERS'
export const SET_OFFSET = 'SET_OFFSET'
export const SET_UPDATING = 'SET_UPDATING'
export const LOAD_LIST_STATE = 'LOAD_LIST_STATE'
export const RESET_LIST_STATE = 'RESET_LIST_STATE'
export const UPDATE_LIST = 'UPDATE_LIST'
export const DELETE_ITEM_FROM_LIST = 'DELETE_ITEM_FROM_LIST'
export const ADD_ITEM_TO_LIST = 'ADD_ITEM_TO_LIST'
export const ON_FILTER_BUTTON_PRESS = 'ON_FILTER_BUTTON_PRESS'

export const addItemToList = (listType, itemId, item) => {
    return { type: listType + '_' + ADD_ITEM_TO_LIST, itemId: itemId, item: item }
}

export const resetListState = (listType) => {
    return { type: listType + '_' + RESET_LIST_STATE }
}

export const setRefresh = (listType) => {
    return { type: listType + '_' + SET_RESFRESH }
}

export const setDisplayedReading = (listType, displayedReading) => {
    return { type: listType + '_' + SET_DISPLAYED_READING, displayedReading: displayedReading }
}

export const setSortingSetting = (listType, sorting, latitude = 0, longitude = 0) => {
    return { type: listType + '_' + SET_SORTING_SETTING, sorting: sorting, latitude: latitude, longitude: longitude }
}

export const setFilterView = (listType, filterView) => {
    return { type: listType + '_' + SET_FILTER_VIEW, filterView: filterView }
}

export const applyFilter = (listType, filter, filterValue) => {
    return { type: listType + '_' + APPLY_FILTER, filter: filter, filterValue: filterValue }
}

export const filterHandler = (listType) => {
    return { type: listType + '_' + ON_FILTER_BUTTON_PRESS }
}

export const setOffset = (listType, offset) => {
    return { type: listType + '_' + SET_OFFSET, offset: offset }
}

export const setUpdating = (listType, id, listAction) => {
    return { type: listType + '_' + SET_UPDATING, id: id, listAction: listAction }
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