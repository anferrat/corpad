export const UPDATE_SETTING = 'UPDATE_SETTING'
export const LOAD_SETTINGS = 'LOAD_SETTINGS'
export const SET_SURVEY_SAVING_STATUS = 'SET_SURVEY_SAVING_STATUS'
export const LOAD_SURVEY_SETTINGS = 'LOAD_SURVEY_SETTINGS'
export const RESET_CURRENT_SURVEY_SETTINGS = 'RESET_CURRENT_SURVEY_SETTINGS'
export const LOAD_SESSION_STATE = 'LOAD_SESSION_STATE'
export const UPDATE_ONBOARDING = 'UPDATE_ONBOARDING'

export const updateSetting = (setting, value) => {
    return { type: UPDATE_SETTING, setting: setting, value: value }
}

export const loadSettings = (settings) => {
    return { type: LOAD_SETTINGS, settings: settings }
}

export const setSurveySaving = (savingInProgress) => {
    return { type: SET_SURVEY_SAVING_STATUS, savingInProgress: savingInProgress }
}

export const resetCurrentSurveySettings = () => {
    return { type: RESET_CURRENT_SURVEY_SETTINGS }
}

export const loadSurveySettings = (settings) => {
    return { type: LOAD_SURVEY_SETTINGS, name: settings.name, fileName: settings.fileName, syncTime: settings.syncTime, isCloudSurvey: settings.isCloudSurvey }
}

export const loadSession = (session) => {
    return { type: LOAD_SESSION_STATE, userName: session.userName, isSigned: session.isSigned, signing: session.signing, isInternetOn: session.isInternetOn, sessionModalVisible: session.sessionModalVisible }
}

export const updateOnboarding = (onboarding) => {
    return { type: UPDATE_ONBOARDING, main: onboarding.main, map: onboarding.map, editTestPoint: onboarding.editTestPoint, editBond: onboarding.editBond, editReferenceCell: onboarding.editReferenceCell, potentialTypes: onboarding.potentialTypes }
}