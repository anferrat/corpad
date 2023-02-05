import { SurveyFileDataFields } from "../PipelineSurveyFile"
import { Element } from "./Element"

export class RectifierElement extends Element {
    constructor(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent) {
        super(SurveyFileDataFields.RECTIFIERS)
        this.id = id
        this.uid = uid
        this.name = name
        this.status = status
        this.timeCreated = timeCreated
        this.timeModified = timeModified
        this.comment = comment
        this.location = location
        this.latitude = latitude
        this.longitude = longitude
        this.model = model
        this.serialNumber = serialNumber
        this.powerSource = powerSource
        this.acVoltage = acVoltage
        this.acCurrent = acCurrent
        this.tapSetting = tapSetting
        this.tapValue = tapValue
        this.tapCoarse = tapCoarse
        this.tapFine = tapFine
        this.maxVoltage = maxVoltage
        this.maxCurrent = maxCurrent
    }
}