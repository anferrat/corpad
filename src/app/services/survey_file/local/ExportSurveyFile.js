import { FileMimeTypes, FileSystemLocations } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"

export class ExportSurveyFile {
    constructor(fileSystemRepo, convertFileToSurveyService, surveyFileConverterOutput, assetFileUploadControl, warningHandler, compressTempSurveyService) {
        this.fileSystemRepo = fileSystemRepo
        this.convertFileToSurveyService = convertFileToSurveyService
        this.surveyFileConverterOutput = surveyFileConverterOutput
        this.assetFileUploadControl = assetFileUploadControl
        this.warningHandler = warningHandler
        this.compressTempSurveyService = compressTempSurveyService
    }

    _convertFileToObject(file) {
        try {
            return JSON.parse(file)
        }
        catch (er) {
            throw new Error(errors.GENERAL, 'Unable to parse survey file', er)
        }
    }

    async _copyAssets(assets, uid) {
        const localAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.ASSETS, uid)
        const { missingAssets } = await this.assetFileUploadControl.execute(assets, [], localAssetFiles)
        const confirm = missingAssets.length === 0 || await this.warningHandler.execute(`There are missing ${missingAssets.length} assets (e.g. photos) for this survey. They will be removed from exported survey. Do you wish to continue?`, 'Continue', 'Cancel')
        if (confirm) {
            const tempAssetsFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.TEMP_ASSETS)
            await this.fileSystemRepo.copyFiles(tempAssetsFolderPath, localAssetFiles)
        }
        else
            throw new Error(errors.GENERAL, 'Unable to copy assets', 'User cancelled operation', 101)
    }

    async execute(path) {
        const file = await this.fileSystemRepo.readFile(path)
        const filename = path.substring(path.lastIndexOf('/') + 1, path.length)
        const surveyObject = this._convertFileToObject(file)
        const { surveyFile } = this.convertFileToSurveyService.execute(surveyObject)
        const surveyFileContent = JSON.stringify(this.surveyFileConverterOutput.execute(surveyFile))
        if (surveyFile.assets.length === 0)
            return {
                path: await this.fileSystemRepo.writeFile(surveyFileContent, filename, FileSystemLocations.TEMP, true),
                mimeType: FileMimeTypes.JSON,
            }
        else {
            await this._copyAssets(surveyFile.assets, surveyFile.survey.uid)
            await this.fileSystemRepo.writeFile(surveyFileContent, 'survey.json', FileSystemLocations.TEMP_SURVEY, true)
            const zipPath = await this.compressTempSurveyService.execute(filename)
            return {
                path: zipPath,
                mimeType: FileMimeTypes.ZIP
            }
        }
    }
}