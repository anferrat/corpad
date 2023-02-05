import { SurveyFileDataFields } from "../PipelineSurveyFile"
import { Element } from "./Element"

export class PotentialTypeElement extends Element {
    constructor(id, uid, name, custom, permType) {
        super(SurveyFileDataFields.POTENTIAL_TYPES)
        this.id = id
        this.uid = uid
        this.name = name
        this.custom = custom
        this.permType = permType
    }
}