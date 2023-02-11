import { ItemTypes } from "../../../entities/survey/items/SurveyItem";
import { Error } from "../../../utils/Error";

export class GetItem {
    constructor (testPointRepo, rectifierRepo, pipelineRepo, defaultNameRepo, basicPresenter, itemPresenter) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.defaultNameRepo = defaultNameRepo
        this.itemPresenter = itemPresenter
        this.basicPresenter = basicPresenter
    }

    async executeWithDefaultName(id, itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                const [testPoint, testPointName] = await Promise.all([
                    this.testPointRepo.getById([id]),
                    this.defaultNameRepo.getByType(itemType)
                ])
                return this.itemPresenter.execute(testPoint[0], testPointName)
            case ItemTypes.RECTIFIER:
                const [rectifier, rectifierName] = await Promise.all([
                    this.rectifierRepo.getById([id]),
                    this.defaultNameRepo.getByType(itemType)
                ])
                return this.itemPresenter.execute(rectifier[0], rectifierName)
            case ItemTypes.PIPELINE:
                const [pipeline, pipelineName] = await Promise.all([
                    this.pipelineRepo.getById([id]),
                    this.defaultNameRepo.getByType(itemType)
                ])
                return this.itemPresenter.execute(pipeline[0], pipelineName)
            default:
                throw new Error('CorpadError', `No such type ${itemType}. Unable to delete item`, err)
        }
    }

    async execute(id, itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.basicPresenter.execute((await this.testPointRepo.getById([id]))[0])
            case ItemTypes.RECTIFIER:
                return this.basicPresenter.execute((await this.rectifierRepo.getById([id]))[0])
            case ItemTypes.PIPELINE:
                return this.basicPresenter.execute((await this.pipelineRepo.getById([id]))[0])
            default:
                throw new Error('CorpadError', `No such type ${itemType}. Unable to get item`, err)
        }
    }
}