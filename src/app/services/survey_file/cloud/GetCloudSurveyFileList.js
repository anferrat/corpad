import { Error, errors } from "../../../utils/Error"

export class GetCloudSurveyFileList {
    constructor(cloudFileSystemRepo, surveyFileListPresenter, networkRepo) {
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.surveyFileListPresenter = surveyFileListPresenter
        this.networkRepo = networkRepo
    }

    async _getMetaDataFromFile(cloudId, modifiedTime, name) {
        try {

            const { file } = await this.cloudFileSystemRepo.readFile(cloudId)
            const timeModified = new Date(modifiedTime).getTime()

            return this.surveyFileListPresenter.executeForCloudFile(file, name, timeModified, cloudId)

        }
        catch (er) {
            return null
        }
    }

    async execute() {
        const internetOn = this.networkRepo.checkConnection()
        if (internetOn) {
            const { files } = await this.cloudFileSystemRepo.readAppFolder()
            const surveys = files
                .filter(({ name }) => name.endsWith('.json'))
                .sort((a, b) => new Date(b?.modifiedTime).getTime() - new Date(a?.modifiedTime).getTime())

            return this.surveyFileListPresenter.executeForSurveyList(await Promise.all(surveys.map(({ modifiedTime, name, id }) => this._getMetaDataFromFile(id, modifiedTime, name))))
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No Internet', 102)
    }
}
