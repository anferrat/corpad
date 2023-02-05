import { ItemTypes } from "../../../../entities/survey/items/SurveyItem";
import { Error } from "../../../../utils/Error";

export class DeleteItem {
    constructor(testPointRepo, rectifierRepo, pipelineRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
    }

    execute(id, itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.testPointRepo.delete(id)
            case ItemTypes.RECTIFIER:
                return this.rectifierRepo.delete(id)
            case ItemTypes.PIPELINE:
                return this.pipelineRepo.delete(id)
            default:
                throw new Error('CorpadError', `No such type ${itemType}. Unable to delete item`, err)
        }
    }
}