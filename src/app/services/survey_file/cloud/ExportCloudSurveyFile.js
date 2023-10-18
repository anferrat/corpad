import { FileMimeTypes, FileSystemLocations } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"

export class ExportCloudSurveyFile {
    constructor(fileSystemRepo, cloudFileSystemRepo, networkRepo, convertFileToSurveyService, surveyFileConverterOutput, downloadFiles, assetFileDownloadControl, warningHandler, compressTempSurveyService) {
        this.fileSystemRepo = fileSystemRepo
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.networkRepo = networkRepo
        this.convertFileToSurveyService = convertFileToSurveyService
        this.surveyFileConverterOutput = surveyFileConverterOutput
        this.downloadFiles = downloadFiles
        this.assetFileDownloadControl = assetFileDownloadControl
        this.warningHandler = warningHandler
        this.compressTempSurveyService = compressTempSurveyService
    }

    async _copyAssets(assets, uid, onDownload) {
        const cloudFileList = await this.cloudFileSystemRepo.readSurveyAssetFolder(uid)
        const { missingAssets } = this.assetFileDownloadControl.execute(assets, cloudFileList, [])
        const confirm = missingAssets.length === 0 || await this.warningHandler.execute(`Survey has ${missingAssets.length} missing assets (e.g. photos). It is possible that some of the assets was not yet uploaded, or there was un error in the past when saving survey. If you continue, the missing assets will be removed from exported the survey.`, 'Continue', 'Cancel')
        if (confirm) {
            const tempSurveyAssetFolder = await this.fileSystemRepo.getLocation(FileSystemLocations.TEMP_ASSETS)
            await this.downloadFiles.execute(cloudFileList, tempSurveyAssetFolder, ({ total, current }) => onDownload ? onDownload(total, current + 1) : null)
        }
        else throw new Error(errors.GENERAL, 'Unable to copy assets', 'User cancelled operation', 101)
    }


    async execute(cloudId, onDownload) {
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            const { file, fileName } = await this.cloudFileSystemRepo.readFile(cloudId)
            const { surveyFile } = await this.convertFileToSurveyService.execute(file)
            const surveyFileContent = JSON.stringify(this.surveyFileConverterOutput.execute(surveyFile))
            if (surveyFile.assets.length === 0)
                return {
                    mimeType: FileMimeTypes.JSON,
                    path: await this.fileSystemRepo.writeFile(surveyFileContent, fileName, FileSystemLocations.TEMP, true)
                }
            else {
                await this._copyAssets(surveyFile.assets, surveyFile.survey.uid, onDownload)
                await this.fileSystemRepo.writeFile(surveyFileContent, 'survey.json', FileSystemLocations.TEMP_SURVEY, true)
                const zipPath = await this.compressTempSurveyService.execute(fileName)
                return {
                    mimeType: FileMimeTypes.ZIP,
                    path: zipPath
                }
            }
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }
}