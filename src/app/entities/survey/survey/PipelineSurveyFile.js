export class PipelineSurveyFile {
    constructor(survey, testPoints, rectifiers, pipelines, potentialTypes, referenceCells, subitems, potentials, assets, mapLayers) {
        this.survey = survey
        this.testPoints = testPoints
        this.rectifiers = rectifiers
        this.pipelines = pipelines
        this.potentialTypes = potentialTypes
        this.referenceCells = referenceCells
        this.subitems = subitems
        this.potentials = potentials
        this.assets = assets
        this.mapLayers = mapLayers
    }

    resetValues(surveyUid) {
        this.testPoints.forEach(testPoint => {
            testPoint.reset()
        })

        this.rectifiers.forEach(rectifier => {
            rectifier.reset()
        })

        this.subitems.forEach(subitem => {
            subitem.reset()
        })

        this.potentials.forEach(potential => {
            potential.reset()
        })

        this.survey.reset(surveyUid)
    }
}



