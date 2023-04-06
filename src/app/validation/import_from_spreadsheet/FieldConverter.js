import { ItemStatuses, TestPointTypes } from "../../entities/survey/items/SurveyItem"

export class FieldConverter {
    constructor () {}

    convertName(name) {
        //make sure this matches reg expression in Validation.name!
        return name.replace(new RegExp(`[^-a-zA-Z0-9_.\s() ]`, 'g'), '')
    }

    truncate(string, length) {
        return string.trim().slice(0, length)
    }

    defaultTestPointType() {
        return TestPointTypes.TEST_STATION
    }

    defaultStatus() {
        return ItemStatuses.UNKNOWN
    }

}