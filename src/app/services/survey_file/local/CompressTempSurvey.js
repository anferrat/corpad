import { FileSystemLocations } from "../../../../constants/global"

export class CompressTempSurvey {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    _convertFileName(filename) {
        if (filename.endsWith('.json'))
            return filename.slice(0, -5) + '.corpad'
        else return filename + '.corpad'
    }

    async execute(filename) {
        //Add error handling if temp survey is empty, or there is not enough space etc.
        const tempFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.TEMP)
        const tempSurveyFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.TEMP_SURVEY)
        const path = await this.fileSystemRepo.zip(tempSurveyFolderPath, `${tempFolderPath}/${this._convertFileName(filename)}`)
        await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP_SURVEY)
        return path
    }
}