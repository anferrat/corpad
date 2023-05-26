import { FileSystemLocations } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"

export class CopyCloudSurveyFile {
    constructor(fileSystemRepo, cloudFileSystemRepo, networkRepo) {
        this.fileSystemRepo = fileSystemRepo
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.networkRepo = networkRepo
    }

    async execute(cloudId, location) {
        const internetOn = await this.networkRepo.checkConnection()
        if (internetOn) {
            //Double work here, parse/unparse JSON. Maybe implement alternative to readFile without JSON parsing
            const { file, fileName } = await this.cloudFileSystemRepo.readFile(cloudId)
            const content = JSON.stringify(file)
            const newFileName = await this.fileSystemRepo.getFileName(fileName, location)
            await this.fileSystemRepo.writeFile(content, newFileName, location, false)
        }
        else throw new Error(errors.NETWORK, 'Unable to connect to internet', 'No internet', 102)
    }

    async executeToDownloads(cloudId) {
        await this.execute(cloudId, FileSystemLocations.DOWNLOADS)
    }

    async executeToAppFolder(cloudId) {
        await this.execute(cloudId, FileSystemLocations.SURVEYS)
    }
}