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

    async _saveSurveyFile(surveyFile, fileName, isSurveyNew, cloudId) {
        const isNewFile = isSurveyNew || !(await this.cloudFileSystemRepo.isFileExist(cloudId))
        const surveyFileContent = JSON.stringify(this.surveyFileConverterOutput.execute(surveyFile))
        return isNewFile ?
            await this.cloudFileSystemRepo.createFile(fileName, surveyFileContent)
            :
            await this.cloudFileSystemRepo.updateFile(cloudId, surveyFileContent)
    }

    async _assetControl(uid, assets) {
        const cloudAssetList = await this.cloudFileSystemRepo.readSurveyAssetFolder(uid)
        const surveyAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.ASSETS, uid)
        const localAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.CURRENT_ASSETS)
        const { localFilesToUpload, cloudFilesToDelete, missingAssets } = this.assetFileUploadControl.execute(assets, cloudAssetList, localAssetFiles)
        const { localFilesToCopy, localFilesToDelete } = await this.assetFileSaveControl.execute(assets, localAssetFiles, surveyAssetFiles)
        const removeMissingAssets = missingAssets.length !== 0 && await this.warningHandler.execute(`There are ${missingAssets.length} missing images found in this survey. Would you like to remove records of them from the survey?`, 'Remove', 'Leave as is')
        return {
            localFilesToUpload,
            cloudFilesToDelete,
            missingAssets,
            removeMissingAssets,
            localFilesToCopy,
            localFilesToDelete
        }
    }

    async _uploadAssetFiles(localFilesToUpload, uid, onUpload) {
        await this.uploadAssets.execute(localFilesToUpload, uid,
            ({ total, current }) => onUpload ? onUpload(total, current + 1) : null)
    }

    async _deleteAssetFiles(cloudFilesToDelete, localFilesToDelete) {
        await this.cloudFileSystemRepo.deleteFiles(cloudFilesToDelete)
        await Promise.all(localFilesToDelete.map(({ path }) => this.fileSystemRepo.unlink(path)))
    }

    async _copyAssetFiles(uid, localFilesToCopy) {
        const surveyAssetFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.ASSETS, uid)
        await this.fileSystemRepo.copyFiles(surveyAssetFolderPath, localFilesToCopy)
    }

    _deleteMissingAssets(surveyFile, missingAssets, removeMissingAssets) {
        if (removeMissingAssets)
            surveyFile.assets = surveyFile.assets.filter(({ id }) => !~missingAssets.findIndex((missingAsset) => missingAsset.id === id))
    }

    async execute(surveyFile, fileName, isSurveyNew, cloudId, onUpload) {
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            const {
                localFilesToUpload,
                cloudFilesToDelete,
                missingAssets,
                removeMissingAssets,
                localFilesToCopy,
                localFilesToDelete
            } = await this._assetControl(surveyFile.survey.uid, surveyFile.assets)
            this._deleteMissingAssets(surveyFile, missingAssets, removeMissingAssets)
            await Promise.all([
                this._uploadAssetFiles(localFilesToUpload, surveyFile.survey.uid, onUpload),
                this._deleteAssetFiles(cloudFilesToDelete, localFilesToDelete),
                this._copyAssetFiles(surveyFile.survey.uid, localFilesToCopy)])
            const { fileId } = await this._saveSurveyFile(surveyFile, fileName, isSurveyNew, cloudId)
            return {
                fileName: fileName,
                cloudId: fileId,
                hash: null
            }
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }
}