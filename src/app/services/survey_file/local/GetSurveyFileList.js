import { FileSystemLocations } from "../../../entities/survey/other/properties"

export class GetSurveyFileList {
    constructor(fileSystemRepo, surveyFileListPresenter) {
        this.fileSystemRepo = fileSystemRepo
        this.surveyFileListPresenter = surveyFileListPresenter
    }

    async _getMetaDataFromFile(path) {
        try {
            const [file, hash, stat] = await Promise.all([
                this.fileSystemRepo.readFile(path),
                this.fileSystemRepo.getHash(path),
                this.fileSystemRepo.getStat(path)
            ])
            const surveyObject = JSON.parse(file)
            const fileName = path.substring(path.lastIndexOf('/') + 1, path.length)
            const timeModified = stat.mtime.getTime()
            return this.surveyFileListPresenter.executeForLocalFile(surveyObject, fileName, timeModified, path, hash)
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