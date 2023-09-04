import { PipelineSurveyFile } from "../../../../../entities/survey/survey/PipelineSurveyFile"

export class SurveyJsonExport {
    constructor(surveyRepo, testPointRepo, rectifierRepo, pipelineRepo, subitemRepo, potentialRepo, potentialTypeRepo, referenceCellRepo, mapLayerRepo, assetRepo) {
        this.surveyRepo = surveyRepo
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.subitemRepo = subitemRepo
        this.potentialRepo = potentialRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.referenceCellRepo = referenceCellRepo
        this.mapLayerRepo = mapLayerRepo
        this.assetRepo = assetRepo
    }

    async execute() {
        const [survey, testPoints, rectifiers, pipelines, subitems, potentials, potentialTypes, referenceCells, mapLayers, assets] = await Promise.all([
            this.surveyRepo.getSurvey(),
            this.testPointRepo.getAll(),
            this.rectifierRepo.getAll(),
            this.pipelineRepo.getAll(),
            this.subitemRepo.getAll(),
            this.potentialRepo.getAll(),
            this.potentialTypeRepo.getAll(),
            this.referenceCellRepo.getAll(),
            this.mapLayerRepo.getAll(),
            this.assetRepo.getAll()

        ])
        return new PipelineSurveyFile(survey, testPoints, rectifiers, pipelines, potentialTypes, referenceCells, subitems, potentials, assets, mapLayers)
    }

}