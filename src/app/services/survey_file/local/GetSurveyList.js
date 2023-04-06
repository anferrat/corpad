import { FileSystemLocations } from "../../../entities/survey/other/properties"

export class GetSurveyList {
    constructor(fileSystemRepo, surveyFileListPresenter) {
        this.fileSystemRepo = fileSystemRepo
        this.surveyFileListPresenter = surveyFileListPresenter
    }

    async _getMetaDataFromFile(filePath) {
        try {
            const [file, hash, stat] = await Promise.all([
                this.fileSystemRepo.readFile(filePath),
                this.fileSystemRepo.getHash(filePath),
                this.fileSystemRepo.getStat(filePath)
            ])
            const surveyObject = JSON.parse(file)
            const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length)
            const timeModified = stat.mtime.getTime()
            return this.surveyFileListPresenter.executeForLocalFile(surveyObject, fileName, timeModified, filePath, hash)
        }
        catch (er) {
            return null
        }
    }

    async execute() {
        const files = await this.fileSystemRepo.readDir(FileSystemLocations.SURVEYS)
     
        const surveys = files
            .filter(item => item.name.endsWith('.json') && item.isFile())
            .sort((a, b) => b?.mtime.getTime() - a?.mtime.getTime())
           
        return this.surveyFileListPresenter.executeForSurveyList(await Promise.all(surveys.map(({ path }) => this._getMetaDataFromFile(path))))
    }
}