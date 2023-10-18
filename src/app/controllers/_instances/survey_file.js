import { ConvertFileToSurvey } from "../../services/survey/manager/ConvertFileToSurvey";
import { CreateSurvey } from "../../services/survey/manager/CreateSurvey";
import { CreateSurveyFromTemplate } from "../../services/survey/manager/CreateSurveyFromTemplate";
import { GetCurrentSurveyStatus } from "../../services/survey/manager/GetCurrentSurveyStatus";
import { LoadSurvey } from "../../services/survey/manager/LoadSurvey";
import { GetDefaultPipeline } from "../../services/survey/manager/create/GetDefaultPipelines";
import { GetDefaultPotentialTypes } from "../../services/survey/manager/create/GetDefaultPotentialTypes";
import { GetDefaultReferenceCell } from "../../services/survey/manager/create/GetDefaultReferenceCell";
import { GetDefaultSurvey } from "../../services/survey/manager/create/GetDefaultSurvey";
import { AdvancedJsonImport } from "../../services/survey/manager/import/json/AdvancedJsonImport";
import { SimpleJsonImport } from "../../services/survey/manager/import/json/SimpleJsonImport";
import { AssetFileDownloadControl } from "../../services/survey_file/assets/AssetFileDownloadControl";
import { AssetFileSaveControl } from "../../services/survey_file/assets/AssetFileSaveControl";
import { AssetFileUploadControl } from "../../services/survey_file/assets/AssetFileUploadControl";
import { DeleteAssets } from "../../services/survey_file/assets/DeleteAssets";
import { DownloadFiles } from "../../services/survey_file/cloud/DownloadFiles";
import { ExportCloudSurveyFile } from "../../services/survey_file/cloud/ExportCloudSurveyFile";
import { ReadCloudSurveyFile } from "../../services/survey_file/cloud/ReadCloudSurveyFile";
import { UploadAssets } from "../../services/survey_file/cloud/UploadAssets";
import { CompressTempSurvey } from "../../services/survey_file/local/CompressTempSurvey";
import { ExportSurveyFile } from "../../services/survey_file/local/ExportSurveyFile";
import { ExtrenalFileContentResolver } from "../../services/survey_file/local/ExternalFileContentResolver";
import { ReadExternalSurveyFile } from "../../services/survey_file/local/ReadExternalSurveyFile";
import { ReadSurveyFile } from "../../services/survey_file/local/ReadSurveyFile";
import { SurveyFileContentValidation } from "../../validation/survey_file_content/SurveyFileContentValidation";
import { surveyFileConverterInput, surveyFileConverterOutput } from "./converters";
import { warningHandler } from "./general_services";
import { assetRepo, fileSystemRepo, googleDriveFileSystemRepo, mapLayerRepo, networkRepo, pipelineRepo, potentialRepo, potentialTypeRepo, rectifierRepo, referenceCellRepo, settingRepo, subitemRepo, surveyRepo, testPointRepo } from "./repositories";

export const downloadFiles = new DownloadFiles(googleDriveFileSystemRepo, fileSystemRepo)

export const uploadAssets = new UploadAssets(googleDriveFileSystemRepo)

const jsonImportService = new SimpleJsonImport(surveyRepo)

const advancedJsonImportService = new AdvancedJsonImport(testPointRepo, rectifierRepo, pipelineRepo, subitemRepo, potentialTypeRepo, surveyRepo, referenceCellRepo, potentialRepo, mapLayerRepo, assetRepo)

const surveyFileValidation = new SurveyFileContentValidation()

export const assetFileDownloadControl = new AssetFileDownloadControl()

export const assetFileUploadControl = new AssetFileUploadControl()

export const assetFileSaveControl = new AssetFileSaveControl()

export const deleteAssetsService = new DeleteAssets(fileSystemRepo, googleDriveFileSystemRepo)

const compressTempSurveyService = new CompressTempSurvey(fileSystemRepo)

export const convertFileToSurveyService = new ConvertFileToSurvey(surveyFileConverterInput, surveyFileValidation, warningHandler)

export const exportSurveyFile = new ExportSurveyFile(fileSystemRepo, convertFileToSurveyService, surveyFileConverterOutput, assetFileUploadControl, warningHandler, compressTempSurveyService)

export const exportCloudSurveyFile = new ExportCloudSurveyFile(fileSystemRepo, googleDriveFileSystemRepo, networkRepo, convertFileToSurveyService, surveyFileConverterOutput, downloadFiles, assetFileDownloadControl, warningHandler, compressTempSurveyService)

const readLocalSurveyFileService = new ReadSurveyFile(fileSystemRepo, convertFileToSurveyService)

const readCloudSurveyFileService = new ReadCloudSurveyFile(googleDriveFileSystemRepo, fileSystemRepo, networkRepo, convertFileToSurveyService, downloadFiles, assetFileDownloadControl)

const readExternalSurveyFileService = new ReadExternalSurveyFile(fileSystemRepo, convertFileToSurveyService)


export const currentSurveyStatusService = new GetCurrentSurveyStatus(surveyRepo, settingRepo)

export const loadLocalSurveyFileService = new LoadSurvey(jsonImportService, advancedJsonImportService, readLocalSurveyFileService, settingRepo, currentSurveyStatusService, warningHandler)

export const loadCloudSurveyFileService = new LoadSurvey(jsonImportService, advancedJsonImportService, readCloudSurveyFileService, settingRepo, currentSurveyStatusService, warningHandler)

export const loadExternalSurveyFileService = new LoadSurvey(jsonImportService, advancedJsonImportService, readExternalSurveyFileService, settingRepo, currentSurveyStatusService, warningHandler)

const getDefaultPipelineSerivice = new GetDefaultPipeline()

const getDefaultSurveyService = new GetDefaultSurvey()

const getDefaultPotentialTypesService = new GetDefaultPotentialTypes()

const getDefaultReferenceCellService = new GetDefaultReferenceCell()

export const createSurveyService = new CreateSurvey(surveyRepo, potentialTypeRepo, currentSurveyStatusService, pipelineRepo, referenceCellRepo, settingRepo, getDefaultPipelineSerivice, getDefaultPotentialTypesService, getDefaultSurveyService, getDefaultReferenceCellService)

export const createSurveyFromTemplateService = new CreateSurveyFromTemplate(fileSystemRepo, surveyFileValidation, jsonImportService, surveyFileConverterInput, currentSurveyStatusService, settingRepo)

export const externalFileContentResolver = new ExtrenalFileContentResolver(fileSystemRepo)

