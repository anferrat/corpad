export class GetCurrentSurveyStatus {
    constructor(surveyRepo, settingRepo) {
        this.surveyRepo = surveyRepo
        this.settingRepo = settingRepo
    }

    async execute() {
        try {
            const [{ name, uid }, { isCloud, lastSync, fileName }] = await Promise.all([
                this.surveyRepo.getSurvey(),
                await this.settingRepo.get()
            ])
            return {
                isLoaded: true,
                syncTime: lastSync,
                name: name,
                fileName: fileName,
                isCloud: isCloud,
                uid: uid,
            }
        }
        catch (er) {
            return {
                isLoaded: false,
                syncTime: null,
                name: null,
                fileName: null,
                isCloud: false,
                uid: null,
            }
        }
    }
}