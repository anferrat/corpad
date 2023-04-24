import { FileSystemLocations } from "../../../entities/survey/other/properties"

export class CopySurveyFileToDownloads {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(path) {
        const fileName = path.substring(path.lastIndexOf('/') + 1, path.length)
        await this.fileSystemRepo.copyFile(fileName, path, FileSystemLocations.DOWNLOADS)
    }
}