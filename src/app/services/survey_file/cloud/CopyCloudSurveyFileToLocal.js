import { FileSystemLocations } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"
import { guid } from "../../../utils/guid"

export class CopyCloudSurveyFileToLocal {
    constructor(cloudFileSystemRepo, fileSystemRepo, networkRepo, convertFileToSurveyService, surveyToFileConverterOutput, downloadFiles, assetFileDownloadControl) {
        this.fileSystemRepo = fileSystemRepo
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.networkRepo = networkRepo
        this.convertFileToSurveyService = convertFileToSurveyService
        this.surveyToFileConverterOutput = surveyToFileConverterOutput
        this.downloadFiles = downloadFiles
        this.assetFileDownloadControl = assetFileDownloadControl
    }


    async _copyAssets(oldUid, newUid, assets, onDownload) {
        console.log(onDownload)
        const localAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.ASSETS, oldUid)
        const cloudAssetFiles = await this.cloudFileSystemRepo.readSurveyAssetFolder(oldUid)
        const { cloudFilesToDownload } = this.assetFileDownloadControl.execute(assets, cloudAssetFiles, localAssetFiles)
        const newLocalAssetPath = await this.fileSystemRepo.getLocation(FileSystemLocations.ASSETS, newUid)
        await this.downloadFiles.execute(cloudFilesToDownload, newLocalAssetPath, ({ total, current }) => onDownload ? onDownload(total, current + 1) : null)
        await this.fileSystemRepo.copyFiles(newLocalAssetPath, localAssetFiles)
    }



    async execute(cloudId, onDownload) {
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            const { fileName, file } = await this.cloudFileSystemRepo.readFile(cloudId)
            const { surveyFile } = this.convertFileToSurveyService.execute(file)
            const oldUid = surveyFile.survey.uid
            const newUid = guid()
            surveyFile.survey.reset(newUid)
            const content = JSON.stringify(this.surveyToFileConverterOutput.execute(surveyFile))
            const newFileName = await this.fileSystemRepo.getFileName(fileName, FileSystemLocations.SURVEYS)
            await this.fileSystemRepo.writeFile(content, newFileName, FileSystemLocations.SURVEYS, false)
            await this._copyAssets(oldUid, newUid, surveyFile.assets, onDownload)
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }

}