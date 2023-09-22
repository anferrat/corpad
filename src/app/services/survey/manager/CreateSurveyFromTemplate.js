import { Error, errors } from "../../../utils/Error"
import { guid } from "../../../utils/guid"
import { FileSystemLocations } from "../../../../constants/global"

export class CreateSurveyFromTemplate {
    constructor(fileSystemRepo, validation, jsonImportService, surveyFileConverter, surveyLoadStatusService, settingRepo) {
        this.fileSystemRepo = fileSystemRepo
        this.validation = validation
        this.jsonImportService = jsonImportService
        this.surveyFileConverter = surveyFileConverter
        this.surveyLoadStatusService = surveyLoadStatusService
        this.settingRepo = settingRepo
    }

    async _copyAssets(includeAssets, uid) {
        if (includeAssets) {
            const currentAssetsFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.CURRENT_ASSETS)
            const localAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.ASSETS, uid)
            await this.fileSystemRepo.copyFiles(currentAssetsFolderPath, localAssetFiles)
        }
    }

    async execute(name, isCloud, path, includeAssets) {
        const isLoaded = await this.surveyLoadStatusService.execute()
        // 1. Checking isLoaded. If there is already survey loaded returning its value instead of ovewriting database
        if (!isLoaded.isLoaded) {
            //2. Read file from local file system
            const content = await this.fileSystemRepo.readFile(path)
            const file = JSON.parse(content)
            const { valid, corrupted } = this.validation.validateFile(file)
            if (!valid || corrupted)
                //3. If local file invalid or corrupted(partially invalid) - throw error
                throw new Error(errors.VALIDATION, 'Survey file corrupted, unable to use it as template', 'Corrupted survey file', 413)
            else {
                //4. Convert to surveyFile
                const version = this.validation.getVersion(file)
                const surveyFile = this.surveyFileConverter.execute(file, version)
                //5. Reset surveyFile (potential values, statuses and some subitem values will be reset to null, new survey uid is assigned)
                const newSurveyUid = guid()
                const originalUid = surveyFile.survey.uid
                surveyFile.resetValues(newSurveyUid, name)
                if (!includeAssets)
                    surveyFile.resetAssets()
                //6. Import to database with fast method.
                await this.jsonImportService.execute(surveyFile)
                //7. Copy assets from original survey to current asset folder
                await this._copyAssets(includeAssets, originalUid)
                await this.settingRepo.updateSurveySettings({ isSurveyNew: 1, isCloud, originalHash: null, fileName: null, cloudId: null, lastSync: null })
                return {
                    name,
                    fileName: null,
                    syncTime: null,
                    isCloud,
                    uid: newSurveyUid
                }
            }
        }
        else {
            const { name, fileName, syncTime, isCloud, uid } = isLoaded
            return { name, fileName, syncTime, isCloud, uid }
        }
    }
}