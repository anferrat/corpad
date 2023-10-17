import { guid } from "../../../../utils/guid"
import { Survey } from "../../../../entities/survey/other/Survey"

export class GetDefaultSurvey {
    constructor() {
    }

    execute(name) {
        return new Survey(guid(), name, 'Wade Watts')
    }
}