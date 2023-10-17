export class CreateSurvey {
    constructor(surveyRepo, potentialTypeRepo, surveyLoadStatusService, pipelineRepo, referenceCellRepo, settingRepo, getDefaultPipelineSerivice, getDefaultPotentialTypesService, getDefaultSurveyService, getDefaultReferenceCellService) {
        this.surveyRepo = surveyRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.surveyLoadStatusService = surveyLoadStatusService
        this.pipelineRepo = pipelineRepo
        this.referenceCellRepo = referenceCellRepo
        this.settingRepo = settingRepo
        this.getDefaultPipelineService = getDefaultPipelineSerivice
        this.getDefaultSurveyService = getDefaultSurveyService
        this.getDefaultPotentialTypesService = getDefaultPotentialTypesService
        this.getDefaultReferenceCellService = getDefaultReferenceCellService
    }

    async execute(name, isCloud) {
        const isLoaded = await this.surveyLoadStatusService.execute()
        if (!isLoaded.isLoaded) {
            const survey = this.getDefaultSurveyService.execute(name)
            const potentialTypes = this.getDefaultPotentialTypesService.execute()
            const pipeline = this.getDefaultPipelineService.execute()
            const referenceCell = this.getDefaultReferenceCellService.execute()
            const syncTime = null
            const fileName = null
            await Promise.all([
                this.surveyRepo.create(survey),
                this.pipelineRepo.create(pipeline),
                Promise.all(potentialTypes.map(potentialType => this.potentialTypeRepo.create(potentialType))),
                this.referenceCellRepo.create(referenceCell),
                this.settingRepo.updateSurveySettings({ isSurveyNew: 1, isCloud, originalHash: null, fileName, cloudId: null, lastSync: syncTime })
            ])
            return {
                syncTime,
                name,
                fileName,
                isCloud,
                uid: survey.uid
            }
        }
        else {
            const { name, fileName, isCloud, syncTime, uid } = isLoaded
            return { name, fileName, isCloud, syncTime, uid }
        }
    }

}