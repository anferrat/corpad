import { EventRegister } from "react-native-event-listeners"
import { ItemTypes } from "../../../entities/survey/items/SurveyItem"
import { Error } from "../../../utils/Error"

export class UpdateItemProperty {
    constructor(testPointRepo, rectifierRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
    }

    async execute(id, itemType, propertyType, value) {
        const currentTime = Date.now()
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                await this.testPointRepo.updateProperty(id, propertyType, value, currentTime)
                break
            case ItemTypes.RECTIFIER:
                await this.rectifierRepo.updateProperty(id, propertyType, value, currentTime)
                break
            case ItemTypes.PIPELINE:
                throw new Error('CorpadError', 'Update property for pipelines is not implemented')
            default: throw new Error('CorpadError', `Unknown item type ${itemType}`)
        }
        EventRegister.emit('ITEM_UPDATED', { id, itemType, timeModified: currentTime })
        return { timeModified: currentTime }
    }
}