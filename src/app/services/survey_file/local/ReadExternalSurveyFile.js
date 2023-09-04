import { ExternalFileTypes, FileSystemLocations } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"
import { guid } from "../../../utils/guid"
import RNFS from 'react-native-fs'

export class ReadExternalSurveyFile {
    constructor(fileSystemRepo, convertFileToSurveyService) {
        this.fileSystemRepo = fileSystemRepo
        this.convertFileToSurveyService = convertFileToSurveyService
    }

    _getContent(file) {
        try {
            return JSON.parse(file)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Unable to read external file', er, 411)
        }
    }

    async _readExternalFile(pathToSurveyFile) {
        const file = await this.fileSystemRepo.readFile(pathToSurveyFile)
        const content = this._getContent(file)
        const { surveyFile, isRecovered } = this.convertFileToSurveyService.execute(content)
        const surveyUid = guid()
        surveyFile.survey.reset(surveyUid)
        return {
            fileName: null,
            surveyFile,
            hash: null,
            isCloud: false,
            cloudId: null,
            isNew: true,
            isRecovered,
        }
    }

    async _copyAssets() {
        const localAssetsFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.CURRENT_ASSETS)
        const tempAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.TEMP_ASSETS)
        await this.fileSystemRepo.copyFiles(localAssetsFolderPath, tempAssetFiles)
    }

    async _readExternalFileWithAssets(path) {
        await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP)
        const tempFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.TEMP)
        const tempSurveyFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.TEMP_SURVEY)
        await this.fileSystemRepo.copyFile(path, `${tempFolderPath}/survey.zip`)
        await this.fileSystemRepo.unzip(`${tempFolderPath}/survey.zip`, tempSurveyFolderPath)
        await this.fileSystemRepo.deleteFile(FileSystemLocations.TEMP, 'survey.zip')
        const { fileName, surveyFile, hash, isCloud, cloudId, isNew, isRecovered } = await this._readExternalFile(`${tempSurveyFolderPath}/survey.json`)
        await this._copyAssets()
        await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP)
        return {
            fileName,
            surveyFile,
            hash,
            isCloud,
            cloudId,
            isNew,
            isRecovered,
        }
    }

    async execute(externalFile) {
        const path = externalFile.getPath()
        const type = externalFile.getFileType()
        if (type === ExternalFileTypes.SURVEY)
            return await this._readExternalFile(path)
        else if (type === ExternalFileTypes.SURVEY_WITH_ASSETS)
            return await this._readExternalFileWithAssets(path)
        else if (type === ExternalFileTypes.UNKNOWN_FILE) {
            try {
                return await this._readExternalFile(path)
            }
            catch (er) {
                return await this._readExternalFileWithAssets(path)
            }
        }
        else throw new Error(errors.FILESYSTEM, 'Unable to read external file', 'File is not supported', 411)
    }
}