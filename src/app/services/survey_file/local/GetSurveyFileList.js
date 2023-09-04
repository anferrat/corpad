import { FileSystemLocations } from "../../../../constants/global"
import { SurveyFile } from "../../../entities/survey/other/SurveyFile"

export class GetSurveyFileList {
    constructor(fileSystemRepo, surveyFileListPresenter) {
        this.fileSystemRepo = fileSystemRepo
        this.surveyFileListPresenter = surveyFileListPresenter
    }

    async _getSurveyFile(path, filename) {
        try {
            const [file, hash, stat] = await Promise.all([
                this.fileSystemRepo.readFile(path),
                this.fileSystemRepo.getHash(path),
                this.fileSystemRepo.getStat(path)
            ])
            const surveyObject = JSON.parse(file)
            const timeModified = stat.mtime.getTime()
            const surveyFile = new SurveyFile(filename, false, hash, path, null, timeModified, surveyObject)
            surveyFile.getMetaData()
            return this.surveyFileListPresenter.execute(surveyFile)
        }
        catch (er) {
            return null
        }
    }

    async execute() {
        const files = await this.fileSystemRepo.readDir(FileSystemLocations.SURVEYS)

        const surveys = files
            .filter(item => item.filename.endsWith('.json') && item.isFile)
            .sort((a, b) => b.timeModified - a.timeModified)

        return this.surveyFileListPresenter.executeForList(
            await Promise.all(surveys.map(({ path, filename }) => this._getSurveyFile(path, filename)))
        )
    }
}