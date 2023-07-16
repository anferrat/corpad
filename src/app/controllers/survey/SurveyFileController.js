import { SurveyFileConverterInput } from "../../converters/survey_file/v1/SurveyFileConverterInput"
import { SurveyFileListPresenter } from "../../presenters/SurveyFileListPresenter"
import { GoogleDriveFileSystemRepository } from "../../repository/cloud_drive/GoogleDriveFileSystemRepository"
import { FileSystemRepository } from "../../repository/fs/FileSystemRepository"
import { NetworkRepository } from "../../repository/network/NetworkRepository"
import { PipelineRepository } from "../../repository/sqlite/PipelineRepository"
import { PotentialRepository } from "../../repository/sqlite/PotentialRepository"
import { PotentialTypeRepository } from "../../repository/sqlite/PotentialTypeRepository"
import { RectifierRepository } from "../../repository/sqlite/RectifierRepository"
import { ReferenceCellRepository } from "../../repository/sqlite/ReferenceCellRepository"
import { SettingRepository } from "../../repository/sqlite/SettingRepository"
import { SubitemRepository } from "../../repository/sqlite/SubitemRepository"
import { SurveyRepository } from "../../repository/sqlite/SurveyRepository"
import { TestPointRepository } from "../../repository/sqlite/TestPointRepository"
import { DocumentPicker } from "../../services/other/DocumentPicker"
import { Permissions } from "../../services/other/Permissions"
import { Share } from "../../services/other/Share"
import { SubitemFactory } from "../../services/other/SubitemFactory"
import { WarningHandler } from "../../services/other/WarningHandler"
import { CreateSurvey } from "../../services/survey/manager/CreateSurvey"
import { CreateSurveyFromTemplate } from "../../services/survey/manager/CreateSurveyFromTemplate"
import { GetCurrentSurveyStatus } from "../../services/survey/manager/GetCurrentSurveyStatus"
import { LoadSurvey } from "../../services/survey/manager/LoadSurvey"
import { AdvancedJsonImport } from "../../services/survey/manager/import/json/AdvancedJsonImport"
import { SimpleJsonImport } from "../../services/survey/manager/import/json/SimpleJsonImport"
import { CopyCloudSurveyFile } from "../../services/survey_file/cloud/CopyCloudSurveyFile"
import { DeleteCloudSurveyFile } from "../../services/survey_file/cloud/DeleteCloudSurveyFile"
import { GetCloudSurveyFileLink } from "../../services/survey_file/cloud/GetCloudSurveyFileLink"
import { GetCloudSurveyFileList } from "../../services/survey_file/cloud/GetCloudSurveyFileList"
import { ReadCloudSurveyfile } from "../../services/survey_file/cloud/ReadCloudSurveyFile"
import { CopySurveyFileToCloud } from "../../services/survey_file/local/CopySurveyFileToCloud"
import { CopySurveyFileToDownloads } from "../../services/survey_file/local/CopySurveyFileToDownloads"
import { DeleteSurveyFile } from "../../services/survey_file/local/DeleteSurveyFile"
import { GetSurveyFileList } from "../../services/survey_file/local/GetSurveyFileList"
import { ReadExternalSurveyFile } from "../../services/survey_file/local/ReadExternalSurveyFile"
import { ReadSurveyFile } from "../../services/survey_file/local/ReadSurveyFile"
import { Controller } from "../../utils/Controller"
import { SurveyFileValidation } from "../../validation/SurveyFileValidation"
import { SurveyFileContentValidation } from "../../validation/survey_file_content/v1/SurveyFileContentValidation"


class SurveyFileController extends Controller {
    constructor(fileSystemRepo, cloudFileSystemRepo, networkRepo, surveyFileListPresenter, surveyFileContentValidation, surveyRepo, settingRepo, subitemFactory, warningHandler, testPointRepo, rectifierRepo, pipelineRepo, subitemRepo, potentialTypeRepo, referenceCellRepo, potentialRepo, shareService, permissions) {
        super()

        this.getLocalSurveyFileListService = new GetSurveyFileList(fileSystemRepo, surveyFileListPresenter)
        this.getCloudSurveyFileListService = new GetCloudSurveyFileList(cloudFileSystemRepo, surveyFileListPresenter, networkRepo)
        this.deleteCloudSurveyFileService = new DeleteCloudSurveyFile(cloudFileSystemRepo, networkRepo)
        this.deleteSurveyFileService = new DeleteSurveyFile(fileSystemRepo)

        this.readExternalSurveyFileService = new ReadExternalSurveyFile(fileSystemRepo)
        this.readSurveyFileService = new ReadSurveyFile(fileSystemRepo)
        this.readCloudSurveyFileService = new ReadCloudSurveyfile(cloudFileSystemRepo, networkRepo)

        this.surveyLoadStatusService = new GetCurrentSurveyStatus(surveyRepo, settingRepo)
        this.surveyFileConverterInputService = new SurveyFileConverterInput(subitemFactory)
        this.documentPickerService = new DocumentPicker()

        this.jsonImportService = new SimpleJsonImport(surveyRepo)
        this.jsonAdvancedImportService = new AdvancedJsonImport(testPointRepo, rectifierRepo, pipelineRepo, subitemRepo, potentialTypeRepo, surveyRepo, referenceCellRepo, potentialRepo)

        this.loadExternalSurveyService = new LoadSurvey(this.jsonImportService, this.jsonAdvancedImportService, this.readExternalSurveyFileService, surveyFileContentValidation, surveyRepo, settingRepo, this.surveyFileConverterInputService, this.surveyLoadStatusService, warningHandler)
        this.loadSurveyFileService = new LoadSurvey(this.jsonImportService, this.jsonAdvancedImportService, this.readSurveyFileService, surveyFileContentValidation, surveyRepo, settingRepo, this.surveyFileConverterInputService, this.surveyLoadStatusService, warningHandler)
        this.loadCloudSurveyFileService = new LoadSurvey(this.jsonImportService, this.jsonAdvancedImportService, this.readCloudSurveyFileService, surveyFileContentValidation, surveyRepo, settingRepo, this.surveyFileConverterInputService, this.surveyLoadStatusService, warningHandler)

        this.getCloudSurveyFileLinkService = new GetCloudSurveyFileLink(cloudFileSystemRepo, networkRepo, shareService)
        this.copyCloudSurveyFileService = new CopyCloudSurveyFile(fileSystemRepo, cloudFileSystemRepo, networkRepo)
        this.copySurveyFileToCloudService = new CopySurveyFileToCloud(cloudFileSystemRepo, fileSystemRepo, networkRepo)
        this.copySurveyFileToDownloadsService = new CopySurveyFileToDownloads(fileSystemRepo, permissions)

        this.createSurveyService = new CreateSurvey(surveyRepo, potentialTypeRepo, this.surveyLoadStatusService, pipelineRepo, referenceCellRepo, settingRepo)
        this.createSurveyFromTemplateService = new CreateSurveyFromTemplate(fileSystemRepo, surveyFileContentValidation, this.jsonImportService, this.surveyFileConverterInputService, this.surveyLoadStatusService)

        this.validation = new SurveyFileValidation()
    }

    getList(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 421, async () => {
            const { isCloud } = this.validation.getList(params)

            if (isCloud) {
                return await this.getCloudSurveyFileListService.execute()
            }
            else
                return await this.getLocalSurveyFileListService.execute()
        })
    }

    deleteFile(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 422, async () => {
            const { isCloud, path, hash, cloudId } = this.validation.deleteFile(params)
            if (isCloud)
                return await this.deleteCloudSurveyFileService.execute(cloudId)
            else
                return await this.deleteSurveyFileService.execute(path, hash)
        })
    }

    loadFile(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 423, async () => {
            const { isCloud, path, cloudId } = this.validation.loadFile(params)
            if (isCloud)
                return await this.loadCloudSurveyFileService.execute(cloudId)
            else
                return await this.loadSurveyFileService.execute(path)
        })
    }

    loadExternalFile(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 420, async () => {
            const { onStatusChanged } = params
            const file = await this.documentPickerService.pickSurveyFile(onStatusChanged)
            return await this.loadExternalSurveyService.execute(file.uri)
        })
    }

    getFileLink(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 419, async () => {
            const { cloudId } = params
            return await this.getCloudSurveyFileLinkService.execute(cloudId)
        })
    }

    copyToDevice(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 418, async () => {
            const { cloudId } = params
            return await this.copyCloudSurveyFileService.executeToAppFolder(cloudId)
        })
    }

    copyToCloud(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 417, async () => {
            const { path } = params
            return await this.copySurveyFileToCloudService.execute(path)
        })
    }

    copyToDownloads(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 416, async () => {
            const { path, cloudId, isCloud } = params
            if (isCloud)
                return await this.copyCloudSurveyFileService.executeToDownloads(cloudId)
            else
                return await this.copySurveyFileToDownloadsService.execute(path)
        })
    }

    async create(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 415, async () => {
            const { isBlank, isCloud, path, name } = params
            if (isBlank)
                return await this.createSurveyService.execute(name, isCloud)
            else
                return await this.createSurveyFromTemplateService.execute(name, isCloud, path)
        })
    }

}

const surveyFileController = new SurveyFileController(
    new FileSystemRepository(),
    new GoogleDriveFileSystemRepository(),
    new NetworkRepository(),
    new SurveyFileListPresenter(),
    new SurveyFileContentValidation(),
    new SurveyRepository(),
    new SettingRepository(),
    new SubitemFactory(),
    new WarningHandler(),
    new TestPointRepository(),
    new RectifierRepository(),
    new PipelineRepository(),
    new SubitemRepository(),
    new PotentialTypeRepository(),
    new ReferenceCellRepository(),
    new PotentialRepository(),
    new Share(),
    new Permissions()
)

export const getSurveyFileList = ({ isCloud }, onError, onSuccess) => surveyFileController.getList({ isCloud }, onError, onSuccess)

export const deleteSurveyFile = ({ isCloud, path, hash, cloudId }, onError, onSuccess) => surveyFileController.deleteFile({ isCloud, path, hash, cloudId }, onError, onSuccess)

export const loadSurveyFile = ({ isCloud, path, cloudId }, onError, onSuccess) => surveyFileController.loadFile({ isCloud, path, cloudId }, onError, onSuccess)

export const loadExternalSurveyFile = (onError, onSuccess) => surveyFileController.loadExternalFile(onError, onSuccess)

export const getCloudSurveyFileLink = ({ cloudId }, onError, onSuccess) => surveyFileController.getFileLink({ cloudId }, onError, onSuccess)

export const copySurveyFileToCloud = ({ path }, onError, onSuccess) => surveyFileController.copyToCloud({ path }, onError, onSuccess)

export const copyCloudSurveyFileToDevice = ({ cloudId }, onError, onSuccess) => surveyFileController.copyToDevice({ cloudId }, onError, onSuccess)

export const copySurveyFileToDownloads = ({ cloudId, isCloud, path }, onError, onSuccess) => surveyFileController.copyToDownloads({ cloudId, isCloud, path }, onError, onSuccess)

export const createSurvey = ({ isBlank, isCloud, path, name }, onError, onSuccess) => surveyFileController.create({ isBlank, isCloud, path, name }, onError, onSuccess)