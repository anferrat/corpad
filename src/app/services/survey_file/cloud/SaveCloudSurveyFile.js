import { Error, errors } from "../../../utils/Error"

export class SaveCloudSurveyFile {
    constructor(cloudFileSystemRepo, networkRepo) {
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.networkRepo = networkRepo
    }

    async execute(surveyFileContent, fileName, isSurveyNew, cloudId) {
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            const createNew = isSurveyNew || !(await this.cloudFileSystemRepo.isFileExist(cloudId))
            const { fileId } = createNew ?
                await this.cloudFileSystemRepo.createFile(fileName, surveyFileContent)
                :
                await this.cloudFileSystemRepo.updateFile(cloudId, surveyFileContent)

            return {
                fileName: fileName,
                cloudId: fileId,
                hash: null
            }
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }

}