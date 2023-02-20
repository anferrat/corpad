import { ItemTypes } from "../../../entities/survey/items/SurveyItem"
import { Error } from "../../../utils/Error"

export class DeleteItemList {
    constructor (testPointRepo, rectifierRepo, pipelineRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
    }

    async execute(idList, itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                await this.testPointRepo.deleteList(idList)
                return
            case ItemTypes.RECTIFIER:
                await this.rectifierRepo.deleteList(idList)
                return
            case ItemTypes.PIPELINE:
                await this.pipelineRepo.deleteList(idList)
                return
            default:
                throw new Error('CorpadError', `No such type ${itemType}. Unable to delete item list`)
        }
    }
}