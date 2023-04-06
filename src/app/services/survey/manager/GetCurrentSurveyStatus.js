export class GetCurrentSurveyStatus {
    constructor(surveyRepo, settingRepo) {
        this.surveyRepo = surveyRepo
        this.settingRepo = settingRepo
    }

    async execute() {
        const { isCloud, lastSync, isSurveyNew, fileName } = await this.settingRepo.get()
        const isLoaded = isCloud !== null && isSurveyNew !== null
        if (isLoaded) {
            const { name } = await this.surveyRepo.getSurvey()
            return {
                isLoaded,
                syncTime: lastSync,
                name: name,
                fileName: fileName,
                isCloud: isCloud
            }
        }
        else
            return { isLoaded }
    }
}