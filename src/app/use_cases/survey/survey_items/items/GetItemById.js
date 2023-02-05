import { ItemTypes } from "../../../../entities/survey/items/SurveyItem";
import { Error } from "../../../../utils/Error";

export class GetItem {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, defaultNameRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.defaultNameRepo = defaultNameRepo
    }

    async executeWithDefaultName(id, itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                const [testPoint, testPointName] = await Promise.all([
                    this.testPointRepo.getById([id]),
                    this.defaultNameRepo.getByType(itemType)
                ])
                testPoint[0].setDefaultName(testPointName)
                return testPoint[0]
            case ItemTypes.RECTIFIER:
                const [rectifier, rectifierName] = await Promise.all([
                    this.rectifierRepo.getById([id]),
                    this.defaultNameRepo.getByType(itemType)
                ])
                rectifier[0].setDefaultName(rectifierName)
                return rectifier[0]
            case ItemTypes.PIPELINE:
                const [pipeline, pipelineName] = await Promise.all([
                    this.pipelineRepo.getById([id]),
                    this.defaultNameRepo.getByType(itemType)
                ])
                pipeline[0].setDefaultName(pipelineName)
                return pipeline[0]
            default:
                throw new Error('CorpadError', `No such type ${itemType}. Unable to delete item`, err)
        }
    }

    async execute(id, itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return (await this.testPointRepo.getById([id]))[0]
            case ItemTypes.RECTIFIER:
                return (await this.rectifierRepo.getById([id]))[0]
            case ItemTypes.PIPELINE:
                return (await this.pipelineRepo.getById([id]))[0]
            default:
                throw new Error('CorpadError', `No such type ${itemType}. Unable to delete item`, err)
        }
    }
}