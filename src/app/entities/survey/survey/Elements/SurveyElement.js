import { SurveyFileDataFields } from "../PipelineSurveyFile"
import { Element } from "./Element"

export class SurveyElement extends Element {
    constructor(uid, name, technician) {
        super(SurveyFileDataFields.SURVEY)
        this.uid = uid
        this.name = name
        this.technician = technician
    }
}