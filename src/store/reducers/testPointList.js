import { LOAD_LIST_STATE, UPDATE_LIST, DELETE_ITEM_FROM_LIST, SET_RESFRESH, SET_DISPLAYED_READING, SET_SORTING_SETTING, SET_FILTER_VIEW, APPLY_FILTER, RESET_FILTERS, SET_OFFSET, ON_FILTER_BUTTON_PRESS, RESET_LIST_STATE } from '../actions/testPointList'

const initialState = {
    itemList: [],
    idList: [],
    settings: {
        idListLoaded: false,
        refreshing: true,
        offset: 0,
        limit: 25,
        updating: false,
        endReached: false,
        latitude: 0,
        longitude: 0,
        displayedReading: 0,
        sorting: 0,
        filterView: 0,
        filterCounter: 0,
        applyFilters: false,
        appliedFilters: {
            searchString: '',
            hideEmptyTestPoints: false,
            statusFilter: [],
            testPointTypeFilter: [],
            readingTypeFilter: [],
        }
    }
}

const testPointList = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LIST_STATE:
            {
                return {
                    idList: state.settings.idListLoaded ? state.idList : action.idList,
                    itemList: state.settings.idListLoaded ? [...state.itemList, ...action.itemList] : action.itemList,
                    settings: {
                        ...state.settings,
                        endReached: (action.itemList.length < state.settings.limit),
                        idListLoaded: true,
                        refreshing: false,
                        resetFilters: false,
                    },
                }
            }
        case UPDATE_LIST: {
            const index = state.itemList.findIndex(item => item.id === action.itemId)
            const isNew = !(~state.idList.indexOf(action.itemId)) && !~index
            if (isNew)
                return {
                    ...state,
                    itemList: [action.itemObject].concat(state.itemList),
                    idList: state.idList, //do not change Id list when new item is added. It'll mess up with things 
                }
            else {
                if (~index)
                    return {
                        ...state,
                        itemList: Object.assign([], state.itemList, {
                            [index]: action.itemObject,
                        })
                    }
                else return state
            }
        }
        case DELETE_ITEM_FROM_LIST:
            return {
                itemList: state.itemList.filter(item => item.id !== action.itemId),
                idList: state.idList.filter(id => id !== action.itemId),
                settings:
                {
                    ...state.settings,
                    updating: null,
                },

            }
        case SET_RESFRESH:
            return {
                itemList: [],
                idList: [],
                settings: {
                    ...state.settings,
                    offset: 0,
                    idListLoaded: false,
                    endReached: false,
                    refreshing: true
                }
            }
        case SET_DISPLAYED_READING:
            return {
                itemList: [],
                idList: [],
                settings:
                {
                    ...state.settings,
                    offset: 0,
                    idListLoaded: false,
                    endReached: false,
                    refreshing: true,
                    displayedReading: action.displayedReading
                }
            }
        case SET_SORTING_SETTING:
            return {
                itemList: state.itemList,
                idList: [],
                settings: {
                    ...state.settings,
                    idListLoaded: false,
                    refreshing: true,
                    offset: 0,
                    endReached: false,
                    sorting: action.sorting,
                    latitude: action.latitude,
                    longitude: action.longitude,
                }
            }
        case SET_FILTER_VIEW:
            return { ...state, settings: { ...state.settings, filterView: action.filterView } } //maybe remove later, only applied for testPoints
        case APPLY_FILTER:
            return {
                itemList: action.filter === 'readingTypeFilter' ? [] : state.itemList,
                idList: [],
                settings: {
                    ...state.settings,
                    idListLoaded: false,
                    refreshing: true,
                    offset: 0,
                    filterView: 0,
                    endReached: false,
                    applyFilters: false,
                    filterCounter: Array.isArray(state.settings.appliedFilters[action.filter]) ? state.settings.filterCounter - (state.settings.appliedFilters[action.filter].length) + action.filterValue.length : state.settings.filterCounter + (action.filterValue ? 1 : -1),
                    appliedFilters: { ...state.settings.appliedFilters, [action.filter]: action.filterValue }
                }
            }
        case ON_FILTER_BUTTON_PRESS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    applyFilters: true,
                }
            }
        case SET_OFFSET:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    offset: state.settings.offset + 1,
                    refreshing: true
                }
            }
        case RESET_FILTERS:
            return {
                itemList: state.itemList,
                idList: [],
                settings: {
                    ...state.settings,
                    idListLoaded: false,
                    refreshing: true,
                    offset: 0,
                    endReached: false,
                    applyFilters: false,
                    filterCounter: 0,
                    filterView: 0,
                    appliedFilters: {
                        hideEmptyTestPoints: false,
                        statusFilter: [],
                        testPointTypeFilter: [],
                        readingTypeFilter: [],
                    }
                }
            }
        case RESET_LIST_STATE:
            return initialState
        default: return state
    }
}

export default testPointList