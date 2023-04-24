import { Error, errors } from "../../../utils/Error"

export class ReadCloudSurveyfile {
    constructor(cloudFileSystemRepo, networkRepo) {
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.networkRepo = networkRepo
    }

    async execute(cloudId) {
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            const { file, fileName } = await this.cloudFileSystemRepo.readFile(cloudId)
            return {
                fileName,
                file,
                hash: null,
                isCloud: true,
                cloudId: cloudId,
                isNew: false,
            }
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }
}