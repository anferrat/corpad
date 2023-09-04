import { FileSystemLocations } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"

export class ReadSurveyFile {
    constructor(fileSystemRepo, convertFileToSurveyService) {
        this.fileSystemRepo = fileSystemRepo
        this.convertFileToSurveyService = convertFileToSurveyService
    }

    _getContent(file) {
        try {
            return JSON.parse(file)
        }
        catch (er) {
            throw new Error(errors.FILESYSTEM, 'Unable to read file', er, 411)
        }
    }

    async execute(path) {
        const [file, hash] = await Promise.all([
            this.fileSystemRepo.readFile(path),
            this.fileSystemRepo.getHash(path)
        ])
        const fileName = path.substring(path.lastIndexOf('/') + 1, path.length)
        const content = this._getContent(file)
        const { surveyFile, isRecovered } = this.convertFileToSurveyService.execute(content)
        const currentAssetsFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.CURRENT_ASSETS)
        const localAssetFiles = await this.fileSystemRepo.readDir(FileSystemLocations.ASSETS, surveyFile.survey.uid)
        await this.fileSystemRepo.copyFiles(currentAssetsFolderPath, localAssetFiles)
        return {
            fileName,
            surveyFile,
            hash: hash,
            isCloud: false,
            cloudId: null,
            isNew: false,
            isRecovered,
        }
    }
}