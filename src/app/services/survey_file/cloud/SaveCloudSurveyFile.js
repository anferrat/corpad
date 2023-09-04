import { FileSystemLocations } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"

export class SaveCloudSurveyFile {
    constructor(cloudFileSystemRepo, networkRepo, surveyFileConverterOutput, assetFileUploadControl, uploadAssets, fileSystemRepo, warningHandler, assetFileSaveControl) {
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.networkRepo = networkRepo
        this.surveyFileConverterOutput = surveyFileConverterOutput
        this.assetFileUploadControl = assetFileUploadControl
        this.uploadAssets = uploadAssets
        this.fileSystemRepo = fileSystemRepo
        this.warningHandler = warningHandler
        this.assetFileSaveControl = assetFileSaveControl
    }

    async _saveAssets(assets, uid) {
        const cloudAssetList = await this.cloudFileSystemRepo.readSurveyAssetFolder(uid)
        const surveyAssetFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.ASSETS, uid)
        const surveyAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.ASSETS, uid)
        const localAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.CURRENT_ASSETS)
        const { localFilesToUpload, cloudFilesToDelete, missingAssets } = this.assetFileUploadControl.execute(assets, cloudAssetList, localAssetFiles)
        const removeMissingAssets = missingAssets.length !== 0 ? await this.warningHandler.execute(`There are ${missingAssets.length} assets (e.g. photos). Would you like to remove them from the survey`, 'Remove', 'Leave as is') : false
        await this.uploadAssets.execute(localFilesToUpload, uid, ({ total, current }) => console.log(`total: ${total}, current: ${current}`))
        await this.cloudFileSystemRepo.deleteFiles(cloudFilesToDelete)
        const { localFilesToCopy, localFilesToDelete } = await this.assetFileSaveControl.execute(assets, localAssetFiles, surveyAssetFiles)
        await Promise.all(localFilesToDelete.map(({ path }) => this.fileSystemRepo.unlink(path)))
        await this.fileSystemRepo.copyFiles(surveyAssetFolderPath, localFilesToCopy)
        return {
            missingAssets,
            removeMissingAssets
        }
    }

    async execute(surveyFile, fileName, isSurveyNew, cloudId, uid) {
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            const createNew = isSurveyNew || !(await this.cloudFileSystemRepo.isFileExist(cloudId))
            const { missingAssets, removeMissingAssets } = await this._saveAssets(surveyFile.assets, surveyFile.survey.uid)
            if (removeMissingAssets) {
                surveyFile.assets = surveyFile.assets.filter(({ id }) => !~missingAssets.findIndex((missingAsset) => missingAsset.id === id))
            }
            const surveyFileContent = JSON.stringify(this.surveyFileConverterOutput.execute(surveyFile))
            const { fileId } = createNew ?
                await this.cloudFileSystemRepo.createFile(fileName, surveyFileContent)
                :
                await this.cloudFileSystemRepo.updateFile(cloudId, surveyFileContent)
            return {
                fileName: fileName,
                cloudId: fileId,
                hash: null
            }
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }
}