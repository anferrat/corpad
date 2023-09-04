import { FileSystemLocations } from "../../../../constants/global"

export class ResetCurrentSurvey {
    constructor(surveyRepo, fileSystemRepo) {
        this.surveyRepo = surveyRepo
        this.fileSystemRepo = fileSystemRepo
    }

    async execute() {
        await Promise.all([
            this.surveyRepo.reset(),
            this.fileSystemRepo.removeDir(FileSystemLocations.CURRENT_ASSETS)
        ])
    }
}