export class UpdateSurveyName {
    constructor(surveyRepo) {
        this.surveyRepo = surveyRepo
    }

    async execute(name) {
        return await this.surveyRepo.updateName(name)
    }

}