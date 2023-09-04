import { ResetCurrentSurvey } from "../../services/survey/manager/ResetCurrentSurvey"
import { SaveCurrentSurvey } from "../../services/survey/manager/SaveCurrentSurvey"
import { SurveyJsonExport } from "../../services/survey/manager/export/json/SurveyJsonExport"
import { SaveCloudSurveyFile } from "../../services/survey_file/cloud/SaveCloudSurveyFile"
import { SaveSurveyFile } from "../../services/survey_file/local/SaveSurveyFile"
import { surveyFileConverterOutput } from "./converters"
import { warningHandler } from "./general_services"
import { assetRepo, fileSystemRepo, googleDriveFileSystemRepo, mapLayerRepo, networkRepo, pipelineRepo, potentialRepo, potentialTypeRepo, rectifierRepo, referenceCellRepo, settingRepo, subitemRepo, surveyRepo, testPointRepo } from "./repositories"
import { assetFileSaveControl, assetFileUploadControl, uploadAssets } from "./survey_file"

const surveyJsonExportService = new SurveyJsonExport(surveyRepo, testPointRepo, rectifierRepo, pipelineRepo, subitemRepo, potentialRepo, potentialTypeRepo, referenceCellRepo, mapLayerRepo, assetRepo)

const saveSurveyFileService = new SaveSurveyFile(fileSystemRepo, surveyFileConverterOutput, assetFileSaveControl)

const saveCloudSurveyFileService = new SaveCloudSurveyFile(googleDriveFileSystemRepo, networkRepo, surveyFileConverterOutput, assetFileUploadControl, uploadAssets, fileSystemRepo, warningHandler, assetFileSaveControl)

export const saveCurrentSurveyService = new SaveCurrentSurvey(surveyJsonExportService, settingRepo, surveyRepo, saveSurveyFileService, saveCloudSurveyFileService, warningHandler)

export const resetCurrentSurveyService = new ResetCurrentSurvey(surveyRepo, fileSystemRepo)