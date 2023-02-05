import { SurveyFileDataFields } from "../PipelineSurveyFile"
import { Element } from "./Element"

export class ReferenceCellElement extends Element {
    constructor(id, uid, rcType, name, mainReference) {
        super(SurveyFileDataFields.REFERENCE_CELLS)
        this.id = id
        this.uid = uid
        this.rcType = rcType
        this.name = name
        this.mainReference = mainReference
    }
}