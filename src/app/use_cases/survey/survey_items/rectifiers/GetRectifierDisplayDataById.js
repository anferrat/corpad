import { RectifierRepository } from "../../../../repository/sqlite/RectifierRepository"
import { ItemTypes } from "../../../../entities/survey/items/SurveyItem"
import { DisplayedReadingOptions } from "../../../../entities/survey/other/properties"

export class GetRectifierDisplayDataById {
    constructor() {
        this.rectifierRepo = new RectifierRepository()
    }

    async getSubitemList(id, displayedReading) {
        switch (displayedReading) {
            case DisplayedReadingOptions[ItemTypes.RECTIFIER].CURRENT:
                return await this.rectifierRepo.getSubitemListWithCurrent(id)
            case DisplayedReadingOptions[ItemTypes.RECTIFIER].VOLTAGE:
                return await this.rectifierRepo.getSubitemListWithVoltage(id)
            case DisplayedReadingOptions[ItemTypes.RECTIFIER].CURRENT_TARGET:
                return await this.rectifierRepo.getSubitemListWithTargets(id)
            default: throw new Error('CorpadError', `Displayed setting ${displayedReading} is not supported for rectifiers`)
        }
    }

    async execute(id, displayedReading) {
        const rectifier = await this.rectifierRepo.getById(id)
        const subitemList = await this.getSubitemList(id, displayedReading)
        return rectifier.setSubitemList(subitemList)
    }
}