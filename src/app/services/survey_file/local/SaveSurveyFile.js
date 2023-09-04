import { FileSystemLocations } from "../../../../constants/global"

export class SaveSurveyFile {
    constructor(fileSystemRepo, surveyFileConverterOutput, assetFileSaveControl) {
        this.fileSystemRepo = fileSystemRepo
        this.surveyFileConverterOutput = surveyFileConverterOutput
        this.assetFileSaveControl = assetFileSaveControl
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

    async _saveAssets(uid, assets) {
        const surveyAssetFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.ASSETS, uid)
        const currentAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.CURRENT_ASSETS)
        const surveyAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.ASSETS, uid)
        const { localFilesToCopy, localFilesToDelete, missingAssets } = this.assetFileSaveControl.execute(assets, currentAssetFiles, surveyAssetFiles)
        await this.fileSystemRepo.copyFiles(surveyAssetFolderPath, localFilesToCopy)
        await Promise.all(localFilesToDelete.map(({ path }) => this.fileSystemRepo.unlink(path)))
    }

    async execute(surveyFile, fileId, isSurveyNew, hash) {
        //fileId same as file name
        const surveyFileContent = JSON.stringify(this.surveyFileConverterOutput.execute(surveyFile))
        const path = `${(await this.fileSystemRepo.getLocation(FileSystemLocations.SURVEYS))}/${fileId}`
        const isNew = isSurveyNew || !((await this.fileSystemRepo.getHash(path)) === hash)
        const file = await this._saveSurveyFile(isNew, fileId, surveyFileContent)
        const newHash = await this.fileSystemRepo.getHash(file.path)
        await this._saveAssets(surveyFile.survey.uid, surveyFile.assets)
        return {
            fileName: file.name,
            cloudId: null,
            hash: newHash
        }
    }
}