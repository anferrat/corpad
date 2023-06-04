export const UPDATE_SETTING = 'UPDATE_SETTING'
export const LOAD_SETTINGS = 'LOAD_SETTINGS'
export const SET_SURVEY_SAVING_STATUS = 'SET_SURVEY_SAVING_STATUS'
export const LOAD_SURVEY_SETTINGS = 'LOAD_SURVEY_SETTINGS'
export const RESET_CURRENT_SURVEY_SETTINGS = 'RESET_CURRENT_SURVEY_SETTINGS'
export const LOAD_SESSION_STATE = 'LOAD_SESSION_STATE'
export const UPDATE_ONBOARDING = 'UPDATE_ONBOARDING'
export const SET_EXPORT_MODAL = 'SET_EXPORT_MODAL'
export const UPDATE_LOADER = 'UPDATE_LOADER'
export const UPDATE_SESSION = 'UPDATE_SESSION'
export const UPDATE_NETWORK_STATUS = 'UPDATE_NETWORK_STATUS'
export const SET_SESSION_MODAL_VISIBLE = 'SET_SESSION_MODAL_VISIBLE'
export const UPDATE_CURRENT_SURVEY_SETTINGS = 'UPDATE_CURRENT_SURVEY_SETTINGS'
export const SET_SETTINGS_ON_APP_LOAD = 'SET_SETTINGS_ON_APP_LOAD'
export const SET_SURVEY_SETTINGS = 'SET_SURVEY_SETTINGS'
export const SET_INTERNET_ON = 'SET_INTERNET_ON'
export const UPDATE_BOTTOM_SHEET_CONTENT = 'UPDATE_BOTTOM_SHEET_CONTENT'
export const SET_BLUETOOTH_SCANNING = 'SET_BLUETOOTH_SCANNING'
export const SET_BLUETOOTH_STATUS = 'SET_BLUETOOTH_STATUS'
export const SET_ACTIVE_MULTIMETER = 'SET_ACTIVE_MULTIMETER'

export const updateSetting = (setting, value) => {
    return { type: UPDATE_SETTING, setting: setting, value: value }
}

export const updateLoader = (visible, title, text) => (
    { type: UPDATE_LOADER, visible: visible, title, text }
)

export const loadSettings = (settings) => {
    return { type: LOAD_SETTINGS, settings: settings }
}

export const updateCurrentSurveySettings = (syncTime, fileName) => {
    return { type: UPDATE_CURRENT_SURVEY_SETTINGS, syncTime, fileName }
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

export const setSurveySettings = (name, fileName, syncTime, isCloudSurvey, isLoaded) => ({
    type: SET_SURVEY_SETTINGS, name, fileName, syncTime, isCloudSurvey, isLoaded
})

export const loadSession = (session) => {
    return { type: LOAD_SESSION_STATE, userName: session.userName, isSigned: session.isSigned, signing: session.signing, isInternetOn: session.isInternetOn, sessionModalVisible: session.sessionModalVisible }
}

export const updateOnboarding = (onboardingScreen, versionOnboarding = null) => {
    return { type: UPDATE_ONBOARDING, onboardingScreen: onboardingScreen, versionOnboarding }
}

export const setExportModal = (visible, fileUrl, mimeType) => {
    return { type: SET_EXPORT_MODAL, visible: visible, fileUrl: fileUrl, mimeType: mimeType }
}

export const updateSession = (isSigned, signing = undefined, userName = undefined) => {
    return { type: UPDATE_SESSION, isSigned, signing, userName }
}

export const updateNetworkStatus = (isInternetOn) => {
    return { type: UPDATE_NETWORK_STATUS, isInternetOn }
}

export const setSessionModalVisible = (visible) => {
    return { type: SET_SESSION_MODAL_VISIBLE, visible }
}

export const setSettingsOnAppLoad = (isLoaded, syncTime, name, fileName, isCloud, isSigned, userName, isInternetOn, onboarding) => {
    return { type: SET_SETTINGS_ON_APP_LOAD, isLoaded, syncTime, name, fileName, isCloud, isSigned, userName, isInternetOn, onboarding }
}

export const updateBottomSheetContent = (itemType, content) => ({
    type: UPDATE_BOTTOM_SHEET_CONTENT, itemType, content
})

export const setActiveMultimeter = (paired, id, name, connected) => ({
    type: SET_ACTIVE_MULTIMETER, paired, id, name, connected
})

export const setBluetoothScanning = (scanning) => ({
    type: SET_BLUETOOTH_SCANNING, scanning
})

export const setBluetoothStatus = (isBluetoothOn) => ({
    type: SET_BLUETOOTH_STATUS, isBluetoothOn
})