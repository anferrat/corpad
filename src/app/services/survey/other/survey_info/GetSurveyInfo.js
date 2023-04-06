import { ItemStatuses } from "../../../../entities/survey/items/SurveyItem"

export class GetSurveyInfo {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, potentialRepo, referenceCellRepo, surveyRepo, geolocationCalculator) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.potentialRepo = potentialRepo
        this.referenceCellRepo = referenceCellRepo
        this.geolocationCalculator = geolocationCalculator
        this.surveyRepo = surveyRepo
    }

    async execute() {
        const [testPoints, rectifiers, pipelines, potentials, mainReference, survey] = await Promise.all([
            this.testPointRepo.getAll(),
            this.rectifierRepo.getAll(),
            this.pipelineRepo.getAll(),
            this.potentialRepo.getAll(),
            this.referenceCellRepo.getMainReference(),
            this.surveyRepo.getSurvey(),
        ])
        const tpCount = testPoints.length
        const pipelineCount = pipelines.length
        const rectifierCount = rectifiers.length
        const potentialCount = potentials.length
        const lastUpdated = this._calculateLastUpdated(testPoints, rectifiers, pipelines)
        const testPointStatusCount = this._getStatusCount(testPoints)
        const rectifierStatusCount = this._getStatusCount(rectifiers)
        const surveyRadius = this._getRadius(testPoints, rectifiers)

        return {
            surveyName: survey.name, tpCount, pipelineCount, rectifierCount, potentialCount, lastUpdated, testPointStatusCount, rectifierStatusCount, surveyRadius, mainReference: { ...mainReference }
        }
    }

    _getRadius(testPoints, rectifiers) {
        const mixed = [...testPoints, ...rectifiers].filter(({ latitude, longitude }) => latitude !== null && longitude !== null)
        if (mixed <= 1)
            return null
        else {
            const { maxLat, maxLon, minLat, minLon } = this.geolocationCalculator.calculateRegionCorners(mixed)
            return Math.floor(this.geolocationCalculator.haversine(maxLat, maxLon, minLat, minLon).distance / 2)
        }
    }

    _getStatusCount(items) {
        return {
            success: this._countStatus(items, ItemStatuses.GOOD),
            warning: this._countStatus(items, ItemStatuses.ATTENTION),
            danger: this._countStatus(items, ItemStatuses.BAD),
            basic: this._countStatus(items, ItemStatuses.UNKNOWN),
        }
    }

    _countStatus(items, selectedStatus) {
        return items.filter(({ status }) => status === selectedStatus).length
    }

    _calculateLastUpdated(testPoints, rectifiers, pipelines) {
        const mixed = [...testPoints, ...rectifiers, ...pipelines]
        let lastUpdated = null
        let highestTime = 0
        mixed.forEach((item) => {
            const { timeModified } = item
            if (timeModified > highestTime) {
                highestTime = timeModified
                lastUpdated = item
            }
        })
        return lastUpdated
    }
}