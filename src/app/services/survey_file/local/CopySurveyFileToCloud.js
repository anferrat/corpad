import { Error, errors } from "../../../utils/Error"

export class CopySurveyFileToCloud {
    constructor(cloudFileSystemRepo, fileSystemRepo, networkRepo) {
        this.fileSystemRepo = fileSystemRepo
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.networkRepo = networkRepo
    }

    async execute(path) {
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            const fileName = path.substring(path.lastIndexOf('/') + 1, path.length)
            const content = await this.fileSystemRepo.readFile(path)
            await this.cloudFileSystemRepo.createFile(fileName, content)
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }

}