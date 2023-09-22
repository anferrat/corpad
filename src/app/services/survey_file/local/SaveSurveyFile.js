import { FileSystemLocations } from "../../../../constants/global"

export class SaveSurveyFile {
    constructor(fileSystemRepo, surveyFileConverterOutput, assetFileSaveControl, warningHandler) {
        this.fileSystemRepo = fileSystemRepo
        this.surveyFileConverterOutput = surveyFileConverterOutput
        this.assetFileSaveControl = assetFileSaveControl
        this.warningHandler = warningHandler
    }

    async _saveSurveyFile(isNew, filename, content) {
        if (!isNew)
            return {
                name: filename,
                path: await this.fileSystemRepo.writeFile(content, filename, FileSystemLocations.SURVEYS, true),
            }
        else {
            const newFileName = await this.fileSystemRepo.getFileName(filename, FileSystemLocations.SURVEYS)
            return {
                name: newFileName,
                path: await this.fileSystemRepo.writeFile(content, newFileName, FileSystemLocations.SURVEYS, false),
            }
        }
    }

    async _assetControl(uid, assets) {
        const currentAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.CURRENT_ASSETS)
        const surveyAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.ASSETS, uid)
        const { localFilesToCopy, localFilesToDelete, missingAssets } = this.assetFileSaveControl.execute(assets, currentAssetFiles, surveyAssetFiles)
        const removeMissingAssets = missingAssets.length !== 0 && await this.warningHandler.execute(`There are ${missingAssets.length} missing images found in this survey. Would you like to remove  records of them from the survey?`, 'Remove', 'Leave as is')
        return {
            localFilesToCopy,
            localFilesToDelete,
            missingAssets,
            removeMissingAssets,
        }
    }

    async _copyNewAssetFiles(uid, localFilesToCopy) {
        const surveyAssetFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.ASSETS, uid)
        await this.fileSystemRepo.copyFiles(surveyAssetFolderPath, localFilesToCopy)
    }

    async _deleteOldAssetFiles(localFilesToDelete) {
        await Promise.all(localFilesToDelete.map(({ path }) => this.fileSystemRepo.unlink(path)))
    }

    _deleteMissingAssets(surveyFile, missingAssets, removeMissingAssets) {
        if (removeMissingAssets) {
            surveyFile.assets = surveyFile.assets.filter(({ id }) => !~missingAssets.findIndex((missingAsset) => missingAsset.id === id))
        }
    }

    async execute(surveyFile, fileId, isSurveyNew, hash) {
        //fileId same as file name
        const { localFilesToCopy, localFilesToDelete, missingAssets, removeMissingAssets } = await this._assetControl(surveyFile.survey.uid, surveyFile.assets)
        this._deleteMissingAssets(surveyFile, missingAssets, removeMissingAssets)
        const surveyFileContent = JSON.stringify(this.surveyFileConverterOutput.execute(surveyFile))
        const path = `${(await this.fileSystemRepo.getLocation(FileSystemLocations.SURVEYS))}/${fileId}`
        const isNew = isSurveyNew || !((await this.fileSystemRepo.getHash(path)) === hash)
        const file = await this._saveSurveyFile(isNew, fileId, surveyFileContent)
        const newHash = await this.fileSystemRepo.getHash(file.path)
        await this._copyNewAssetFiles(surveyFile.survey.uid, localFilesToCopy)
        await this._deleteOldAssetFiles(localFilesToDelete)
        return {
            fileName: file.name,
            cloudId: null,
            hash: newHash
        }
    }
}