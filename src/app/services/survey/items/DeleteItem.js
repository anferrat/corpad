import { ItemTypes } from "../../../entities/survey/items/SurveyItem";
import { Error } from "../../../utils/Error";

export class DeleteItem {
    constructor (testPointRepo, rectifierRepo, pipelineRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
    }

    execute(id, itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                this.testPointRepo.delete(id)
                return
            case ItemTypes.RECTIFIER:
                this.rectifierRepo.delete(id)
                return 
            case ItemTypes.PIPELINE:
                this.pipelineRepo.delete(id)
                return 
            default:
                throw new Error('CorpadError', `No such type ${itemType}. Unable to delete item`)
        }
    }
}