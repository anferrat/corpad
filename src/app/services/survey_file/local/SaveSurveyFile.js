import { FileSystemLocations } from "../../../entities/survey/other/properties"

export class SaveSurveyFile {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(surveyFileContent, fileId, isSurveyNew, hash) {
        //fileId same as file name
        const path = `${(await this.fileSystemRepo.getLocation(FileSystemLocations.SURVEYS))}/${fileId}`
        const replaceOld = !isSurveyNew && ((await this.fileSystemRepo.getHash(path)) === hash)
        if (replaceOld) {
            await this.fileSystemRepo.unlink(path)
            const newPath = await this.fileSystemRepo.writeFile(surveyFileContent, fileId, FileSystemLocations.SURVEYS, true)
            const newHash = await this.fileSystemRepo.getHash(newPath)
            return {
                fileName: fileId,
                cloudId: null,
                hash: newHash
            }
        }
        else {
            //Create file name. It will ensure that file name is unique and duplicates will not be overwritten
            const name = await this.fileSystemRepo.getFileName(fileId, FileSystemLocations.SURVEYS)
            const newPath = await this.fileSystemRepo.writeFile(surveyFileContent, name, FileSystemLocations.SURVEYS, false)
            const newHash = await this.fileSystemRepo.getHash(newPath)
            return {
                fileName: name,
                hash: newHash,
                cloudId: null
            }
        }
    }
}