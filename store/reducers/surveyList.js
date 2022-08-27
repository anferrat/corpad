import { LOAD_SURVEY_LIST, REFRESH_SURVEY_LIST, RESET_SURVEY_LIST, ADD_SURVEY_TO_LIST, DELETE_SURVEY_FROM_LIST } from "../actions/surveyList"

const initialState = {
    local: [{
        title: 'Today',
        data: [],
    },
    {
        title: 'Earlier',
        data: []
    }
    ],
    cloud: [{
        title: 'Today',
        data: [],
    },
    {
        title: 'Earlier',
        data: []
    }
    ],
    exportedFiles: [],
    refreshingLocal: true,
    refreshingCloud: true,
    refreshingExportedFiles: true,
}

const sortBySection = (listState, data) => {
    const currentTime = new Date()
    const todayList = data.filter(meta => {
        const metaDate = new Date(meta.timeModified)
        return currentTime.toDateString() === metaDate.toDateString()
    })
    const earlierList = data.filter(meta => {
        const metaDate = new Date(meta.timeModified)
        return currentTime.toDateString() !== metaDate.toDateString()
    })
    return [{ ...listState[0], data: todayList }, { ...listState[1], data: earlierList }]
}

const surveyList = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SURVEY_LIST:
            switch (action.listType) {
                case 'LOCAL':
                    return {
                        ...state,
                        local: sortBySection(state.local, action.list),
                        refreshingLocal: false
                    }
                case 'CLOUD':
                    return {
                        ...state,
                        cloud: sortBySection(state.cloud, action.list),
                        refreshingCloud: false
                    }
                default:
                    return {
                        ...state,
                        exportedFiles: action.list,
                        refreshingExportedFiles: false
                    }
            }
        case REFRESH_SURVEY_LIST:
            switch (action.listType) {
                case 'LOCAL':
                    return {
                        ...state,
                        refreshingLocal: true
                    }
                case 'CLOUD':
                    return {
                        ...state,
                        refreshingCloud: true
                    }
                case 'ALL':
                    return {
                        ...state,
                        refreshingCloud: true,
                        refreshingLocal: true,
                        refreshingExportedFiles: true
                    }
                default:
                    return {
                        ...state,
                        refreshingExportedFiles: true
                    }
            }
        case RESET_SURVEY_LIST:
            switch (action.listType) {
                case 'LOCAL':
                    return {
                        ...state,
                        local: initialState.local,
                        refreshingLocal: true
                    }
                case 'CLOUD':
                    return {
                        ...state,
                        cloud: initialState.cloud,
                        refreshingCloud: true
                    }
                case 'ALL':
                    return {
                        ...state,
                        refreshingCloud: true,
                        refreshingLocal: true,
                        refreshingExportedFiles: true
                    }
                default:
                    return {
                        ...state,
                        refreshingExportedFiles: true
                    }
            }
        case ADD_SURVEY_TO_LIST:
            switch (action.listType) {
                case 'LOCAL':
                    return {
                        ...state,
                        local: [{ ...state.local[0], data: [action.meta, ...state.local[0].data] }, state.local[1]]
                    }
                case 'CLOUD':
                    return {
                        ...state,
                        cloud: [{ ...state.cloud[0], data: [action.meta, ...state.cloud[0].data] }, state.cloud[1]]
                    }
                default:
                    return state
            }
        case DELETE_SURVEY_FROM_LIST:
            switch (action.listType) {
                case 'LOCAL':
                    return {
                        ...state,
                        local: [{ ...state.local[0], data: state.local[0].data.filter(item => item.filePath !== action.path) }, { ...state.local[1], data: state.local[1].data.filter(item => item.filePath !== action.path) }]
                    }
                case 'CLOUD':
                    return {
                        ...state,
                        cloud: [{ ...state.cloud[0], data: state.cloud[0].data.filter(item => item.cloudId !== action.path) }, { ...state.cloud[1], data: state.cloud[1].data.filter(item => item.cloudId !== action.path) }]
                    }
                default:
                    return state
            }
        default:
            return state
    }
}

export default surveyList