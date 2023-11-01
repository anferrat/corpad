import { AppInitialization } from "../services/app/AppInitialization"
import { OpenExternalSurvey } from "../services/app/OpenExternalSurvey"
import { DatabaseInitialization } from "../services/survey/other/DatabaseInitialization"
import { SettingInitialization } from "../services/survey/other/SettingInitialization"
import { DefaultNameInitialization } from "../services/survey/other/default_names/DeafultNameInitialization"
import { MultimeterInitialization } from "../services/survey/other/multimeter/MultimeterInitialization"
import { Controller } from "../utils/Controller"
import { FileSystemInitialization } from "../services/survey_file/local/FileSystemInitialization"
import { SurveyFileListener } from "../services/app/SurveyFileListener"
import { currentSurveyStatusService, externalFileContentResolver, loadExternalSurveyFileService } from "./_instances/survey_file"
import { appRepo, bluetoothRepo, defaultNameRepo, fileSystemRepo, geolocationRepo, googleDriveAuthorizationRepo, networkRepo, purchaseRepo, settingRepo, surveyRepo } from "./_instances/repositories"
import { appStateListener, linkingService, multimeterFactory, permissions, warningHandler } from "./_instances/general_services"
import { resetCurrentSurveyService, saveCurrentSurveyService } from "./_instances/survey_manager"
import { InitializePurchases } from "../services/purchases/InitializePurchases"

class AppController extends Controller {
    constructor(currentSurveyStatusService, googleDriveAuthorizationRepo, surveyRepo, bluetoothRepo, settingRepo, multimeterFactory, defaultNameRepo, loadExternalSurveyFileService, saveCurrentSurveyService, warningHandler, resetCurrentSurveyService, fileSystemRepo, appRepo, linkingService, appStateListener, networkRepo, externalFileContentResolver, purchaseRepo, geolocationRepo, permissions) {
        super()

        this.networkRepo = networkRepo

        this.bluetoothRepo = bluetoothRepo

        this.purchaseInitializationService = new InitializePurchases(purchaseRepo, networkRepo, geolocationRepo, settingRepo, permissions)

        this.openExternalSurveyService = new OpenExternalSurvey(loadExternalSurveyFileService, saveCurrentSurveyService, warningHandler, currentSurveyStatusService, resetCurrentSurveyService, fileSystemRepo)

        this.defaultNameInitializationService = new DefaultNameInitialization(defaultNameRepo)

        this.appSettingInitializationService = new SettingInitialization(settingRepo)

        this.databaseInitializationService = new DatabaseInitialization(appRepo)

        this.multimeterInitializationService = new MultimeterInitialization(bluetoothRepo, settingRepo, multimeterFactory)

        this.fileSystemInitializationService = new FileSystemInitialization(fileSystemRepo)

        this.appInitializationService = new AppInitialization(currentSurveyStatusService, googleDriveAuthorizationRepo, surveyRepo, this.multimeterInitializationService, this.defaultNameInitializationService, settingRepo, this.openExternalSurveyService, this.appSettingInitializationService, this.databaseInitializationService, this.fileSystemInitializationService, linkingService, externalFileContentResolver, this.purchaseInitializationService)

        this.surveyFileListenerService = new SurveyFileListener(linkingService, this.openExternalSurveyService, appStateListener, externalFileContentResolver)



    }


    init(onError = null, onSuccess = null,) {
        return super.controllerHandler(onSuccess, onError, 107, async () => {
            return await this.appInitializationService.execute()
        })
    }

    addFileUrlListener(callback, onError, onSuccess) {
        return super.callbackHandler(onSuccess, onError, 420, () => {
            return this.surveyFileListenerService.addListener(callback, onError, onSuccess)
        })
    }

    addNetworkStatusListener(onInternetStatusChanged, onError, onSuccess) {
        return this.networkRepo.addNetworkListener((isInternetOn) =>
            super.controllerHandler(onSuccess, onError, 301, () => {
                return onInternetStatusChanged(isInternetOn)
            }))
    }

    addBluetoothStatusListener(callback, onError, onSuccess) {
        return super.callbackHandler(onSuccess, onError, 110, () => {
            return this.bluetoothRepo.bluetoothStatusListener(callback)
        })
    }
}

const appController = new AppController(
    currentSurveyStatusService,
    googleDriveAuthorizationRepo,
    surveyRepo,
    bluetoothRepo,
    settingRepo,
    multimeterFactory,
    defaultNameRepo,
    loadExternalSurveyFileService,
    saveCurrentSurveyService,
    warningHandler,
    resetCurrentSurveyService,
    fileSystemRepo,
    appRepo,
    linkingService,
    appStateListener,
    networkRepo,
    externalFileContentResolver,
    purchaseRepo,
    geolocationRepo,
    permissions
)

export const initializeApp = (onError, onSuccess) => appController.init(onError, onSuccess)

export const addFileUrlListener = (callback, onError, onSuccess) => appController.addFileUrlListener(callback, onError, onSuccess)

export const addNetworkStatusListener = (onInternetStatusChanged, onError, onSuccess) => appController.addNetworkStatusListener(onInternetStatusChanged, onError, onSuccess)

export const addBluetoothStatusListener = (callback, onError, onSuccess) => appController.addBluetoothStatusListener(callback, onError, onSuccess)