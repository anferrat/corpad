
import { UPDATE_SETTING, LOAD_SETTINGS, SET_SURVEY_SAVING_STATUS, LOAD_SURVEY_SETTINGS, RESET_CURRENT_SURVEY_SETTINGS, LOAD_SESSION_STATE, UPDATE_ONBOARDING, SET_EXPORT_MODAL } from "../actions/settings"

const initialState = {
    bottomSheetContent: {  //BottomSheet component
        itemType: 'TEST_POINT',
        content: 'sorting'
    },
    lastImport: {
        itemType: null,
        idList: [],
        importTime: null
    },
    loader: { //FullScreenLoader component
        title: null,
        text: null,
        visible: false
    },
    exportModal: { // ExportModalComponent
        visible: false,
        fileUrl: undefined,
        mimeType: undefined,
    },
    session: {
        userName: null,
        isSigned: null,
        signing: false,
        isInternetOn: true,
        sessionModalVisible: false,
    },
    onboarding: {
        main: false,
        map: false,
        editTestPoint: false,
        editBond: false,
        editReferenceCell: false,
        potentialTypes: false,
        versionOnboarding: null, // displays onboarding screen after updates
    },
    //all currentSurvey props are only for DISPLAY purposes. don't use it for operations with data
    currentSurvey: {
        name: null, // survey name for display purposes only, database 'surveyName' setting is primary for any data related operations
        fileName: null, //file name of current survey. mainly used to be displayed when saving or loading file. the one in db settings has priority over this one
        isLoaded: false, //survey is loaded. if not it'll display survey list screen, if yes it'll display testPoint list
        isCloudSurvey: null, //is current survey on cloud
        homeScreenCloud: false, //indicates what screen should be loaded when survey is not loaded (cloud drive, or device)
        savingInProgress: false, //survey is being saved
        lastSyncTime: null // last time survey was saved or the time when survey was opened
    }

}

const settings = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SETTING:
            if (action.value)
                return {
                    ...state,
                    [action.setting]: action.value,
                }
            else return {
                    ...state,
                    [action.setting]: initialState[action.setting],
                }
        case LOAD_SETTINGS:
            return {
                ...state,
                ...action.settings,
            }
        case RESET_CURRENT_SURVEY_SETTINGS:
            return {
                ...state,
                currentSurvey: {
                    ...initialState.currentSurvey,
                    homeScreenCloud: state.currentSurvey.isCloudSurvey,
                },
                loader: initialState.loader
            }
        case SET_SURVEY_SAVING_STATUS:
            return {
                ...state,
                currentSurvey: {
                    ...state.currentSurvey,
                    savingInProgress: action.savingInProgress,
                },
            }
        case LOAD_SURVEY_SETTINGS:
            return {
                ...state,
                currentSurvey: {
                    name: action.name ?? state.currentSurvey.name,
                    fileName: action.fileName ?? state.currentSurvey.fileName,
                    isLoaded: true,
                    homeScreenCloud: action.homeScreenCloud ?? state.currentSurvey.homeScreenCloud,
                    isCloudSurvey: action.isCloudSurvey ?? state.currentSurvey.isCloudSurvey,
                    savingInProgress: false,
                    lastSyncTime: action.syncTime ?? state.currentSurvey.lastSyncTime
                },
                loader: initialState.loader
            }
        case LOAD_SESSION_STATE:
            return {
                ...state,
                session: {
                    userName: action.userName ?? state.session.userName,
                    isSigned: action.isSigned ?? state.session.isSigned,
                    signing: action.signing ?? state.session.signing,
                    isInternetOn: action.isInternetOn ?? state.session.isInternetOn,
                    sessionModalVisible: action.sessionModalVisible ?? state.session.sessionModalVisible,
                }
            }
        case UPDATE_ONBOARDING:
            return {
                ...state,
                onboarding: {
                    ...state.onboarding,
                    main: action.main ?? state.onboarding.main,
                    map: action.map ?? state.onboarding.map,
                    editTestPoint: action.editTestPoint ?? state.onboarding.editTestPoint,
                    editBond: action.editBond ?? state.onboarding.editBond,
                    editReferenceCell: action.editReferenceCell ?? state.onboarding.editReferenceCell,
                    potentialTypes: action.potentialTypes ?? state.onboarding.potentialTypes,
                    versionOnboarding: action.versionOnboarding ?? state.onboarding.versionOnboarding
                }
            }
        case SET_EXPORT_MODAL:
            return {
                ...state,
                exportModal: {
                    visible: action.visible ?? state.exportModal.visible,
                    fileUrl: action.fileUrl ?? state.exportModal.fileUrl,
                    mimeType: action.mimeType ?? state.exportModal.mimeType,
                }
            }
        default:
            return state
    }
}

export default settings