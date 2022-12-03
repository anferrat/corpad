export const LOAD_SURVEY_LIST = 'LOAD_SURVEY_LIST'
export const REFRESH_SURVEY_LIST = 'REFRESH_SURVEY_LIST'
export const ADD_SURVEY_TO_LIST = 'ADD_SURVEY_TO_LIST'
export const DELETE_SURVEY_FROM_LIST = 'DELETE_SURVEY_FROM_LIST'
export const RESET_SURVEY_LIST = 'RESET_SURVEY_LIST'

export const loadSurveyList = (list, listType = 'LOCAL') => {
    return { type: LOAD_SURVEY_LIST, list: list, listType: listType }
}

export const refreshSurveyList = (listType = 'LOCAL') => {
    return { type: REFRESH_SURVEY_LIST, listType: listType }
}

export const addSurveyToList = (listType = 'LOCAL', meta) => {
    return { type: ADD_SURVEY_TO_LIST, listType: listType, meta: meta }
}

export const deleteSurveyFromList = (listType = 'LOCAL', path) => {
    return { type: DELETE_SURVEY_FROM_LIST, listType: listType, path: path }
}

export const resetSurveyList = (listType = 'LOCAL') => {
    return { type: RESET_SURVEY_LIST, listType: listType }
}