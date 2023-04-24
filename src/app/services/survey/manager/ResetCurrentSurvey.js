export class ResetCurrentSurvey {
    constructor(surveyRepo) {
        this.surveyRepo = surveyRepo
    }

    async execute() {
        await this.surveyRepo.reset()
    }
}