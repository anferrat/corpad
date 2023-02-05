import { Element } from "./Element"
import { SurveyFileDataFields } from "../PipelineSurveyFile"

export class TestPointElement extends Element {
    constructor(id, uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified) {
        super(SurveyFileDataFields.TEST_POINTS)
        this.id = id
        this.uid = uid
        this.name = name
        this.location = location
        this.latitude = latitude
        this.longitude = longitude
        this.comment = comment
        this.testPointType = testPointType
        this.status = status
        this.timeCreated = timeCreated
        this.timeModified = timeModified
    }
}