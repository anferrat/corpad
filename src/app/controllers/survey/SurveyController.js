import { SurveyFileConverterOutput } from "../../converters/survey_file/v1/SurveyFileConverterOutput"
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
import { WarningHandler } from "../../services/other/WarningHandler"
import { ResetCurrentSurvey } from "../../services/survey/manager/ResetCurrentSurvey"
import { SaveCurrentSurvey } from "../../services/survey/manager/SaveCurrentSurvey"
import { SurveyJsonExport } from "../../services/survey/manager/export/json/SurveyJsonExport"
import { SaveCloudSurveyFile } from "../../services/survey_file/cloud/SaveCloudSurveyFile"
import { SaveSurveyFile } from "../../services/survey_file/local/SaveSurveyFile"
import { Controller } from "../../utils/Controller"

class SurveyController extends Controller {
    constructor(settingRepo, surveyRepo, testPointRepo, rectifierRepo, pipelineRepo, subitemRepo, potentialRepo, potentialTypeRepo, referenceCellRepo, fileSystemRepo, cloudFileSystemRepo, networkRepo, surveyFileConverterOutput, warningHandler) {
        super()

        this.surveyJsonExportService = new SurveyJsonExport(surveyRepo, testPointRepo, rectifierRepo, pipelineRepo, subitemRepo, potentialRepo, potentialTypeRepo, referenceCellRepo)
        this.saveSurveyFileService = new SaveSurveyFile(fileSystemRepo)
        this.saveCloudSurveyFileService = new SaveCloudSurveyFile(cloudFileSystemRepo, networkRepo)

        this.saveCurrentSurveyService = new SaveCurrentSurvey(this.surveyJsonExportService, surveyFileConverterOutput, settingRepo, surveyRepo, this.saveSurveyFileService, this.saveCloudSurveyFileService, warningHandler)
        this.resetCurrentSurveyService = new ResetCurrentSurvey(surveyRepo)

    }

    async saveAndReset(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 400, async () => {
            const { fileName, isCloud, syncTime, cloudId } = await this.saveCurrentSurveyService.execute()
            await this.resetCurrentSurveyService.execute()
            return { fileName, isCloud, syncTime, cloudId }
        })
    }

    async save(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 400, async () => {
            return await this.saveCurrentSurveyService.execute()
        })
    }

    async reset(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 400, async () => {
            return await this.resetCurrentSurveyService.execute()
        })
    }
}

const surveyController = new SurveyController(
    new SettingRepository(),
    new SurveyRepository(),
    new TestPointRepository(),
    new RectifierRepository(),
    new PipelineRepository(),
    new SubitemRepository(),
    new PotentialRepository(),
    new PotentialTypeRepository(),
    new ReferenceCellRepository(),
    new FileSystemRepository(),
    new GoogleDriveFileSystemRepository(),
    new NetworkRepository(),
    new SurveyFileConverterOutput(),
    new WarningHandler()
)

export const saveAndResetSurvey = (onError, onSuccess) => surveyController.saveAndReset(onError, onSuccess)

export const saveSurvey = (onError, onSuccess) => surveyController.save(onError, onSuccess)

export const resetSurvey = (onError, onSuccess) => surveyController.reset(onError, onSuccess)