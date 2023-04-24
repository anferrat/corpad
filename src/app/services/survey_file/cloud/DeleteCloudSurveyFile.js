import { Error, errors } from "../../../utils/Error"

export class DeleteCloudSurveyFile {
    constructor(cloudFileSystemRepo, networkRepo) {
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.networkRepo = networkRepo
    }

    async execute(cloudId) {
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            await this.cloudFileSystemRepo.deleteFile(cloudId)
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }
}