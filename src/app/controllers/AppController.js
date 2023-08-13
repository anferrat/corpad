import { SurveyFileConverterInput } from "../converters/survey_file/v1/SurveyFileConverterInput"
import { SurveyFileConverterOutput } from "../converters/survey_file/v1/SurveyFileConverterOutput"
import { BluetoothRepository } from "../repository/bluetooth/BluetoothRepository"
import { GoogleDriveAuthorizationRepository } from "../repository/cloud_drive/GoogleDriveAuthorizationRepository"
import { GoogleDriveFileSystemRepository } from "../repository/cloud_drive/GoogleDriveFileSystemRepository"
import { FileSystemRepository } from "../repository/fs/FileSystemRepository"
import { NetworkRepository } from "../repository/network/NetworkRepository"
import { AppRepository } from "../repository/sqlite/AppRepository"
import { DefaultNameRepository } from "../repository/sqlite/DefaultNameRepository"
import { PipelineRepository } from "../repository/sqlite/PipelineRepository"
import { PotentialRepository } from "../repository/sqlite/PotentialRepository"
import { PotentialTypeRepository } from "../repository/sqlite/PotentialTypeRepository"
import { RectifierRepository } from "../repository/sqlite/RectifierRepository"
import { ReferenceCellRepository } from "../repository/sqlite/ReferenceCellRepository"
import { SettingRepository } from "../repository/sqlite/SettingRepository"
import { SubitemRepository } from "../repository/sqlite/SubitemRepository"
import { SurveyRepository } from "../repository/sqlite/SurveyRepository"
import { TestPointRepository } from "../repository/sqlite/TestPointRepository"
import { AppInitialization } from "../services/app/AppInitialization"
import { OpenExternalSurvey } from "../services/app/OpenExternalSurvey"
import { Linking } from "../services/other/Linking"
import { SubitemFactory } from "../services/other/SubitemFactory"
import { WarningHandler } from "../services/other/WarningHandler"
import { GetCurrentSurveyStatus } from "../services/survey/manager/GetCurrentSurveyStatus"
import { LoadSurvey } from "../services/survey/manager/LoadSurvey"
import { ResetCurrentSurvey } from "../services/survey/manager/ResetCurrentSurvey"
import { SaveCurrentSurvey } from "../services/survey/manager/SaveCurrentSurvey"
import { SurveyJsonExport } from "../services/survey/manager/export/json/SurveyJsonExport"
import { AdvancedJsonImport } from "../services/survey/manager/import/json/AdvancedJsonImport"
import { SimpleJsonImport } from "../services/survey/manager/import/json/SimpleJsonImport"
import { DatabaseInitialization } from "../services/survey/other/DatabaseInitialization"
import { SettingInitialization } from "../services/survey/other/SettingInitialization"
import { DefaultNameInitialization } from "../services/survey/other/default_names/DeafultNameInitialization"
import { MultimeterInitialization } from "../services/survey/other/multimeter/MultimeterInitialization"
import { MultimeterFactory } from "../services/survey/other/multimeter/_devices/MultimeterFactory"
import { SaveCloudSurveyFile } from "../services/survey_file/cloud/SaveCloudSurveyFile"
import { ReadExternalSurveyFile } from "../services/survey_file/local/ReadExternalSurveyFile"
import { SaveSurveyFile } from "../services/survey_file/local/SaveSurveyFile"
import { Controller } from "../utils/Controller"
import { SurveyFileContentValidation } from "../validation/survey_file_content/v1/SurveyFileContentValidation"
import { FileSystemInitialization } from "../services/survey_file/local/FileSystemInitialization"
import { SurveyFileListener } from "../services/app/SurveyFileListener"
import { AppStateListener } from "../services/other/AppStateListenerService"

class AppController extends Controller {
    constructor(surveyRepo, settingRepo, appRepo, defaultNameRepo, networkService, googleDriveAuthorizationService, testPointRepo, rectifierRepo, pipelineRepo, subitemRepo, potentialTypeRepo, referenceCellRepo, potentialRepo, fileSystemRepo, bluetoothRepo, surveyFileContentValidation, surveyFileConverterInput, surveyFileConverterOutput, cloudFileSystemRepo, warningHandler, appStateListener) {
        super()
        this.linkingService = new Linking()
        this.networkService = networkService
        this.bluetoothRepo = bluetoothRepo
        this.currentSurveyStatusService = new GetCurrentSurveyStatus(surveyRepo, settingRepo)
        this.defaultNameInitializationService = new DefaultNameInitialization(defaultNameRepo)

        this.jsonImportService = new SimpleJsonImport(surveyRepo)
        this.advancedJsonImportService = new AdvancedJsonImport(testPointRepo, rectifierRepo, pipelineRepo, subitemRepo, potentialTypeRepo, surveyRepo, referenceCellRepo, potentialRepo)
        this.readExternalFileService = new ReadExternalSurveyFile(fileSystemRepo)
        this.loadExternalSurveyService = new LoadSurvey(this.jsonImportService, this.advancedJsonImportService, this.readExternalFileService, surveyFileContentValidation, surveyRepo, settingRepo, surveyFileConverterInput, this.currentSurveyStatusService, warningHandler)

        this.jsonExportService = new SurveyJsonExport(surveyRepo, testPointRepo, rectifierRepo, pipelineRepo, subitemRepo, potentialRepo, potentialTypeRepo, referenceCellRepo)
        this.saveSurveyToFileService = new SaveSurveyFile(fileSystemRepo)
        this.saveSurveyToCloudFileService = new SaveCloudSurveyFile(cloudFileSystemRepo, networkService)
        this.saveCurrentSurveyService = new SaveCurrentSurvey(this.jsonExportService, surveyFileConverterOutput, settingRepo, surveyRepo, this.saveSurveyToFileService, this.saveSurveyToCloudFileService, warningHandler)
        this.resetCurrentSurveyService = new ResetCurrentSurvey(surveyRepo)

        this.openExternalSurveyService = new OpenExternalSurvey(this.loadExternalSurveyService, this.saveCurrentSurveyService, warningHandler, this.currentSurveyStatusService, this.resetCurrentSurveyService, fileSystemRepo)

        this.appSettingInitializationService = new SettingInitialization(settingRepo)
        this.databaseInitializationService = new DatabaseInitialization(appRepo)

        this.multimeterFactory = new MultimeterFactory(bluetoothRepo)
        this.multimeterInitializationService = new MultimeterInitialization(bluetoothRepo, settingRepo, this.multimeterFactory)

        this.fileSystemInitializationService = new FileSystemInitialization(fileSystemRepo)

        this.surveyFileListenerService = new SurveyFileListener(this.linkingService, this.openExternalSurveyService, appStateListener)

        this.appInitializationService = new AppInitialization(this.currentSurveyStatusService, googleDriveAuthorizationService, surveyRepo, this.multimeterInitializationService, this.defaultNameInitializationService, settingRepo, this.openExternalSurveyService, this.appSettingInitializationService, this.databaseInitializationService, this.fileSystemInitializationService, this.linkingService)
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
        return this.networkService.addNetworkListener((isInternetOn) =>
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
    new SurveyRepository(),
    new SettingRepository(),
    new AppRepository(),
    new DefaultNameRepository(),
    new NetworkRepository(),
    new GoogleDriveAuthorizationRepository(),
    new TestPointRepository(),
    new RectifierRepository(),
    new PipelineRepository(),
    new SubitemRepository(),
    new PotentialTypeRepository(),
    new ReferenceCellRepository(),
    new PotentialRepository(),
    new FileSystemRepository(),
    new BluetoothRepository(),
    new SurveyFileContentValidation(),
    new SurveyFileConverterInput(new SubitemFactory()),
    new SurveyFileConverterOutput(),
    new GoogleDriveFileSystemRepository(),
    new WarningHandler(),
    new AppStateListener()
)

export const initializeApp = (onError, onSuccess) => appController.init(onError, onSuccess)

export const addFileUrlListener = (callback, onError, onSuccess) => appController.addFileUrlListener(callback, onError, onSuccess)

export const addNetworkStatusListener = (onInternetStatusChanged, onError, onSuccess) => appController.addNetworkStatusListener(onInternetStatusChanged, onError, onSuccess)

export const addBluetoothStatusListener = (callback, onError, onSuccess) => appController.addBluetoothStatusListener(callback, onError, onSuccess)