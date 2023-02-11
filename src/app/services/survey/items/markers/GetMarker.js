import { ItemTypes } from "../../../../entities/survey/items/SurveyItem"

export class GetMarker {
    constructor(testPointRepo, rectifierRepo) {
        this.rectifierRepo = rectifierRepo
        this.testPointRepo = testPointRepo
    }

    execute(itemType, id) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.testPointRepo.getById([id]).getMarker()
            case ItemTypes.RECTIFIER:
                return this.rectifierRepo.getById([id]).getMarker()
            default: throw new Error('CorpadError', `No marker exists with id ${id} and type ${itemType}`)
        }
    }
}