import { Error, errors } from "../../../utils/Error"

export class GetCloudSurveyFileLink {
    constructor(cloudSurveyFileSystem, networkRepo, shareService) {
        this.cloudSurveyFileSystem = cloudSurveyFileSystem
        this.networkRepo = networkRepo
        this.shareService = shareService
    }

    async execute(cloudId) {
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            const { link } = await this.cloudSurveyFileSystem.getLink(cloudId)
            this.shareService.shareLink(link, 'Pipeline survey')
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }
}