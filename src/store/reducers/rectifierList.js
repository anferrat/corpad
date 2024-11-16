import { LOAD_LIST_STATE, UPDATE_LIST, DELETE_ITEM_FROM_LIST, SET_RESFRESH, SET_DISPLAYED_READING, SET_OFFSET, RESET_LIST_STATE, SET_SORTING_SETTING } from '../actions/rectifierList'

const initialState = {
    itemList: [],
    idList: [],
    settings: {
        idListLoaded: false,
        refreshing: true,
        offset: 0,
        limit: 20,
        updating: false,
        endReached: false,
        displayedReading: 0,
        sorting: 0,
    }
}

const rectifierList = (state = initialState, action) => {
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
                        refreshing: false
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
        case RESET_LIST_STATE:
            return initialState
        default: return state
    }
}

export default rectifierList