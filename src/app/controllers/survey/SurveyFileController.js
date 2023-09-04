import { DeleteCloudSurveyFile } from "../../services/survey_file/cloud/DeleteCloudSurveyFile"
import { GetCloudSurveyFileLink } from "../../services/survey_file/cloud/GetCloudSurveyFileLink"
import { GetCloudSurveyFileList } from "../../services/survey_file/cloud/GetCloudSurveyFileList"
import { CopySurveyFileToCloud } from "../../services/survey_file/local/CopySurveyFileToCloud"
import { DeleteSurveyFile } from "../../services/survey_file/local/DeleteSurveyFile"
import { GetSurveyFileList } from "../../services/survey_file/local/GetSurveyFileList"
import { Controller } from "../../utils/Controller"
import { SurveyFileValidation } from "../../validation/SurveyFileValidation"
import { PickExternalSurveyFile } from "../../services/survey_file/local/PickExternalSurveyFile"
import { fileSystemRepo, googleDriveFileSystemRepo, networkRepo } from "../_instances/repositories"
import { assetFileDownloadControl, convertFileToSurveyService, createSurveyFromTemplateService, createSurveyService, deleteAssetsService, downloadFiles, exportCloudSurveyFile, exportSurveyFile, loadCloudSurveyFileService, loadExternalSurveyFileService, loadLocalSurveyFileService, uploadAssets } from "../_instances/survey_file"
import { surveyFileListPresenter } from "../_instances/presenters"
import { documentPicker, permissions, shareService } from "../_instances/general_services"
import { surveyFileConverterOutput } from "../_instances/converters"
import { ShareSurveyFile } from "../../services/survey_file/local/ShareSurveyFile"
import { SaveSurveyFileToDownloads } from "../../services/survey_file/local/SaveSurveyFileToDownloads"
import { CopyCloudSurveyFileToLocal } from "../../services/survey_file/cloud/CopyCloudSurveyFileToLocal"


class SurveyFileController extends Controller {
    constructor(fileSystemRepo, cloudFileSystemRepo, networkRepo, loadLocalSurveyFileService, loadCloudSurveyFileService, loadExternalServiceFileService, createSurveyService, createSurveyFromTemplateService, surveyFileListPresenter, shareService, permissions, documentPicker, convertFileToSurveyService, surveyFileConverterOutput, uploadAssets, downloadFiles, exportSurveyFile, exportCloudSurveyFile, deleteAssetsService, assetFileDownloadControl) {
        super()

        this.getLocalSurveyFileListService = new GetSurveyFileList(fileSystemRepo, surveyFileListPresenter)
        this.getCloudSurveyFileListService = new GetCloudSurveyFileList(cloudFileSystemRepo, surveyFileListPresenter, networkRepo)
        this.deleteCloudSurveyFileService = new DeleteCloudSurveyFile(cloudFileSystemRepo, networkRepo, deleteAssetsService)
        this.deleteSurveyFileService = new DeleteSurveyFile(fileSystemRepo, deleteAssetsService)

        this.loadSurveyFileService = loadLocalSurveyFileService
        this.loadCloudSurveyFileService = loadCloudSurveyFileService

        this.pickExternalSurveyFileService = new PickExternalSurveyFile(loadExternalServiceFileService, documentPicker)

        this.getCloudSurveyFileLinkService = new GetCloudSurveyFileLink(cloudFileSystemRepo, networkRepo, shareService)
        this.copySurveyFileToCloudService = new CopySurveyFileToCloud(cloudFileSystemRepo, fileSystemRepo, networkRepo, convertFileToSurveyService, surveyFileConverterOutput, uploadAssets)
        this.copyCloudSurveyFileService = new CopyCloudSurveyFileToLocal(cloudFileSystemRepo, fileSystemRepo, networkRepo, convertFileToSurveyService, surveyFileConverterOutput, downloadFiles, assetFileDownloadControl)

        this.createSurveyService = createSurveyService
        this.createSurveyFromTemplateService = createSurveyFromTemplateService

        this.shareCloudSurveyFile = new ShareSurveyFile(exportCloudSurveyFile, fileSystemRepo, shareService)
        this.saveCloudSurveyFileToDownloads = new SaveSurveyFileToDownloads(exportCloudSurveyFile, fileSystemRepo, permissions)

        this.shareSurveyFile = new ShareSurveyFile(exportSurveyFile, fileSystemRepo, shareService)

        this.saveSurveyFileToDownloads = new SaveSurveyFileToDownloads(exportSurveyFile, fileSystemRepo, permissions)

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
            const { isCloud, path, hash, cloudId, uid } = this.validation.deleteFile(params)
            if (isCloud)
                return await this.deleteCloudSurveyFileService.execute(cloudId, uid)
            else
                return await this.deleteSurveyFileService.execute(path, hash, uid)
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

    pickExternalFile(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 420, async () => {
            const { onStatusChanged } = params
            return await this.pickExternalSurveyFileService.execute(onStatusChanged)
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
            return await this.copyCloudSurveyFileService.execute(cloudId)
        })
    }

    copyToCloud(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 417, async () => {
            const { path } = params
            return await this.copySurveyFileToCloudService.execute(path)
        })
    }

    shareFile(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 430, async () => {
            const { cloudId, path, isCloud } = params
            if (isCloud)
                return await this.shareCloudSurveyFile.execute(cloudId)
            else
                return await this.shareSurveyFile.execute(path)
        })
    }

    copyToDownloads(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 416, async () => {
            const { path, cloudId, isCloud } = params
            if (isCloud)
                return await this.saveCloudSurveyFileToDownloads.execute(cloudId)
            else
                return await this.saveSurveyFileToDownloads.execute(path)
        })
    }

    async create(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 415, async () => {
            const { isBlank, isCloud, path, name } = params
            if (isBlank || path === null)
                return await this.createSurveyService.execute(name, isCloud)
            else
                return await this.createSurveyFromTemplateService.execute(name, isCloud, path)
        })
    }

}

const surveyFileController = new SurveyFileController(
    fileSystemRepo,
    googleDriveFileSystemRepo,
    networkRepo,
    loadLocalSurveyFileService,
    loadCloudSurveyFileService,
    loadExternalSurveyFileService,
    createSurveyService,
    createSurveyFromTemplateService,
    surveyFileListPresenter,
    shareService,
    permissions,
    documentPicker,
    convertFileToSurveyService,
    surveyFileConverterOutput,
    uploadAssets,
    downloadFiles,
    exportSurveyFile,
    exportCloudSurveyFile,
    deleteAssetsService,
    assetFileDownloadControl
)

export const getSurveyFileList = ({ isCloud }, onError, onSuccess) => surveyFileController.getList({ isCloud }, onError, onSuccess)

export const deleteSurveyFile = ({ isCloud, path, hash, cloudId, uid }, onError, onSuccess) => surveyFileController.deleteFile({ isCloud, path, hash, cloudId, uid }, onError, onSuccess)

export const loadSurveyFile = ({ isCloud, path, cloudId }, onError, onSuccess) => surveyFileController.loadFile({ isCloud, path, cloudId }, onError, onSuccess)

export const pickExternalSurveyFile = (onError, onSuccess) => surveyFileController.pickExternalFile(onError, onSuccess)

export const getCloudSurveyFileLink = ({ cloudId }, onError, onSuccess) => surveyFileController.getFileLink({ cloudId }, onError, onSuccess)

export const copySurveyFileToCloud = ({ path }, onError, onSuccess) => surveyFileController.copyToCloud({ path }, onError, onSuccess)

export const copyCloudSurveyFileToDevice = ({ cloudId }, onError, onSuccess) => surveyFileController.copyToDevice({ cloudId }, onError, onSuccess)

export const copySurveyFileToDownloads = ({ cloudId, isCloud, path }, onError, onSuccess) => surveyFileController.copyToDownloads({ cloudId, isCloud, path }, onError, onSuccess)

export const createSurvey = ({ isBlank, isCloud, path, name }, onError, onSuccess) => surveyFileController.create({ isBlank, isCloud, path, name }, onError, onSuccess)

export const shareFile = ({ cloudId, path, isCloud, mimeType }, onError, onSuccess) => surveyFileController.shareFile({ cloudId, path, isCloud, mimeType }, onError, onSuccess)