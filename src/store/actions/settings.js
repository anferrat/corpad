export const UPDATE_SETTING = 'UPDATE_SETTING'
export const LOAD_SETTINGS = 'LOAD_SETTINGS'
export const SET_SURVEY_SAVING_STATUS = 'SET_SURVEY_SAVING_STATUS'
export const UPDATE_SURVEY_NAME = 'UPDATE_SURVEY_NAME'
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
export const SET_ACTIVE_MULTIMETER = 'SET_ACTIVE_MULTIMETER'
export const SET_ACTIVE_MULTIMETER_STATUS = 'SET_ACTIVE_MULTIMETER_STATUS'
export const SET_TIME_ADJUSTMENT = 'SET_IS_TIME_SYNCED'
export const SET_ACTIVE_MULTIMETER_SETTINGS = 'SET_ACTIVE_MULTIMETER_SETTINGS'
export const UPDATE_LOADER_PROGRESS = 'UPDATE_LOADER_PROGRESS'
export const HIDE_LOADER = 'HIDE_LOADER'
export const UPDATE_SUBSCRIPTION_STATUS = 'UPDATE_SUBSCRIPTION_STATUS'
export const SHOW_PAYWALL = 'SHOW_PAYWALL'
export const HIDE_PAYWALL = 'HIDE_PAYWALL'
export const SET_ACTIVE_MULTIMETER_CONNECTING = 'SET_ACTIVE_MULTIMETER_CONNECTING'
export const SET_ACTIVE_MULTIMETER_EXECUTING = 'SET_ACTIVE_MULTIMETER_EXECUTING'
export const SET_ACTIVE_MULTIMETER_TOGGLE_STATUS = 'SET_ACTIVE_MULTIMETER_TOGGLE_STATUS'

export const updateSetting = (setting, value) => {
    return { type: UPDATE_SETTING, setting: setting, value: value }
}

export const updateLoader = (title, text) => (
    { type: UPDATE_LOADER, title, text }
)

export const updateLoaderProgress = (visible, title, total, count) => (
    { type: UPDATE_LOADER_PROGRESS, visible: visible, title, total, count }
)

export const hideLoader = () => (
    { type: HIDE_LOADER }
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

export const updateSurveyName = (name) => {
    return { type: UPDATE_SURVEY_NAME, name }
}

export const setSurveySettings = (name, fileName, syncTime, isCloudSurvey, isLoaded, uid) => ({
    type: SET_SURVEY_SETTINGS, name, fileName, syncTime, isCloudSurvey, isLoaded, uid
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

export const setSettingsOnAppLoad = (isLoaded, syncTime, name, uid, fileName, isCloud, isSigned, userName, onboarding, multimeter, subscriptionStatus, subscriptionExpirationTime) => {
    return { type: SET_SETTINGS_ON_APP_LOAD, isLoaded, syncTime, name, uid, fileName, isCloud, isSigned, userName, onboarding, multimeter, subscriptionStatus, subscriptionExpirationTime }
}

export const updateBottomSheetContent = (itemType, content, params) => ({
    type: UPDATE_BOTTOM_SHEET_CONTENT, itemType, content, params
})

export const setActiveMultimeter = (paired, id, name, multimeterType, connected = undefined) => ({
    type: SET_ACTIVE_MULTIMETER, paired, id, name, multimeterType, connected
})

export const setActiveMultimeterStatus = (connected) => ({
    type: SET_ACTIVE_MULTIMETER_STATUS, connected
})

export const setActiveMultimeterConnecting = (connecting) => ({
    type: SET_ACTIVE_MULTIMETER_CONNECTING, connecting
})

export const setBluetoothScanning = (scanning) => ({
    type: SET_BLUETOOTH_SCANNING, scanning
})

export const setIsTimeSynced = (isSynced, isSyncing) => ({
    type: SET_TIME_ADJUSTMENT, isSynced, isSyncing
})

export const setMultimeterSettings = (syncMode, onTime, offTime, firstCycle, onSetup, offDelay, onOffCaptureActive, captureRate, timeSyncMode) => ({
    type: SET_ACTIVE_MULTIMETER_SETTINGS, syncMode, onTime, offTime, firstCycle, onSetup, offDelay, onOffCaptureActive, captureRate, timeSyncMode
})

export const setActiveMultimeterExecuting = (executing) => (
    { type: SET_ACTIVE_MULTIMETER_EXECUTING, executing }
)

export const updateSubscriptionStatus = (status, expirationTime = 0) => ({
    type: UPDATE_SUBSCRIPTION_STATUS, status, expirationTime
})

export const showPaywall = () => ({
    type: SHOW_PAYWALL
})

export const hidePaywall = () => ({
    type: HIDE_PAYWALL
})

export const setActiveMultimeterToggleStatus = (toggleStatus) => {
    console.log(toggleStatus)
    return ({
        type: SET_ACTIVE_MULTIMETER_TOGGLE_STATUS, toggleStatus
    })
}