import { ItemTypes } from "../../../../entities/survey/items/SurveyItem"
import { Error } from "../../../../utils/Error"

export class GetItemWithDisplayValues {
    constructor(testPointRepo, rectifierRepo, pipelineRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
    }

    async execute() {
        
    }
}