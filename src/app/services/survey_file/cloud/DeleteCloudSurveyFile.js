import { Error, errors } from "../../../utils/Error"

export class DeleteCloudSurveyFile {
    constructor(cloudFileSystemRepo, networkRepo, deleteAssetsService) {
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.networkRepo = networkRepo
        this.deleteAssetsService = deleteAssetsService
    }

    async execute(cloudId, uid) {
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            await Promise.all([
                this.cloudFileSystemRepo.deleteFile(cloudId),
                this.deleteAssetsService.execute(uid, true)
            ])

        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }
}