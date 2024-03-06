import { AppInitialization } from "../services/app/AppInitialization"
import { OpenExternalSurvey } from "../services/app/OpenExternalSurvey"
import { DatabaseInitialization } from "../services/survey/other/DatabaseInitialization"
import { SettingInitialization } from "../services/survey/other/SettingInitialization"
import { DefaultNameInitialization } from "../services/survey/other/default_names/DeafultNameInitialization"
import { MultimeterInitialization } from "../services/survey/other/multimeter/MultimeterInitialization"
import { Controller } from "../utils/Controller"
import { FileSystemInitialization } from "../services/survey_file/local/FileSystemInitialization"
import { UrlListener } from "../services/app/UrlListener"
import { currentSurveyStatusService, externalFileContentResolver, loadExternalSurveyFileService } from "./_instances/survey_file"
import { appRepo, bluetoothRepo, defaultNameRepo, fileSystemRepo, geolocationRepo, googleDriveAuthorizationRepo, networkRepo, purchaseRepo, settingRepo, surveyRepo } from "./_instances/repositories"
import { appStateListener, linkingService, multimeterFactory, permissions, urlFileAccessService, warningHandler } from "./_instances/general_services"
import { resetCurrentSurveyService, saveCurrentSurveyService } from "./_instances/survey_manager"
import { InitializePurchases } from "../services/purchases/InitializePurchases"
import { UrlResolver } from "../services/app/UrlResolver"

class AppController extends Controller {
    constructor(currentSurveyStatusService, googleDriveAuthorizationRepo, surveyRepo, bluetoothRepo, settingRepo, multimeterFactory, defaultNameRepo, loadExternalSurveyFileService, saveCurrentSurveyService, warningHandler, resetCurrentSurveyService, fileSystemRepo, appRepo, linkingService, appStateListener, networkRepo, externalFileContentResolver, purchaseRepo, geolocationRepo, permissions, urlFileAccess) {
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

        this.urlResolver = new UrlResolver(urlFileAccess, externalFileContentResolver, this.openExternalSurveyService)

        this.appInitializationService = new AppInitialization(currentSurveyStatusService, googleDriveAuthorizationRepo, surveyRepo, this.multimeterInitializationService, this.defaultNameInitializationService, settingRepo, this.appSettingInitializationService, this.databaseInitializationService, this.fileSystemInitializationService, linkingService, this.purchaseInitializationService, this.urlResolver)

        this.urlListenerService = new UrlListener(linkingService, this.urlResolver)

    }


    init(onError = null, onSuccess = null,) {
        return super.controllerHandler(onSuccess, onError, 107, async () => {
            return await this.appInitializationService.execute()
        })
    }

    addUrlListener(callback, onError, onSuccess) {
        return super.callbackHandler(onSuccess, onError, 420, () => {
            return this.urlListenerService.addListener(callback, onError, onSuccess)
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
    permissions,
    urlFileAccessService
)

export const initializeApp = (onError, onSuccess) => appController.init(onError, onSuccess)

export const addUrlListener = (callback, onError, onSuccess) => appController.addUrlListener(callback, onError, onSuccess)

export const addNetworkStatusListener = (onInternetStatusChanged, onError, onSuccess) => appController.addNetworkStatusListener(onInternetStatusChanged, onError, onSuccess)

export const addBluetoothStatusListener = (callback, onError, onSuccess) => appController.addBluetoothStatusListener(callback, onError, onSuccess)