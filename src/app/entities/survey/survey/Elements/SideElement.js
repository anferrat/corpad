import { SurveyFileDataFields } from "../PipelineSurveyFile"
import { Element } from "./Element"

export class SideElement extends Element {
    constructor(id, sideAId, sideBId, parentCardId) {
        super(SurveyFileDataFields.SIDES)
        this.id = id
        this.sideAId = sideAId
        this.sideBId = sideBId
        this.parentCardId = parentCardId
    }
}