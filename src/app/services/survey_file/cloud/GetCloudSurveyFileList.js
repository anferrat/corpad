import { SurveyFile } from "../../../entities/survey/other/SurveyFile"
import { Error, errors } from "../../../utils/Error"

export class GetCloudSurveyFileList {
    constructor(cloudFileSystemRepo, surveyFileListPresenter, networkRepo) {
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.surveyFileListPresenter = surveyFileListPresenter
        this.networkRepo = networkRepo
    }

    async _getSurveyFile(cloudId, timeModified, name) {
        try {
            const { file } = await this.cloudFileSystemRepo.readFile(cloudId)
            const surveyFile = new SurveyFile(name, true, null, null, cloudId, timeModified, file)
            surveyFile.getMetaData()
            return this.surveyFileListPresenter.execute(surveyFile)
        }
        catch (er) {
            return null
        }
    }

    async execute() {
        const internetOn = this.networkRepo.checkConnection()
        if (internetOn) {
            const files = await this.cloudFileSystemRepo.readAppFolder()
            const surveys = files
                .filter(({ name }) => name.endsWith('.json'))
                .sort((a, b) => b.timeModified - a.timeModified)

            return this.surveyFileListPresenter.executeForList(
                await Promise.all(surveys.map(({ timeModified, name, cloudId }) =>
                    this._getSurveyFile(cloudId, timeModified, name))))
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No Internet', 102)
    }
}
