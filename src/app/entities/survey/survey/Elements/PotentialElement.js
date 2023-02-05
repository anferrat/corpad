import { SurveyFileDataFields } from "../PipelineSurveyFile";
import { Element } from "./Element";

export class PotentialElement extends Element {
    constructor(id, cardId, uid, value, type, unit, portableReferenceId, permanentReferenceId) {
        super(SurveyFileDataFields.POTENTIALS)
        this.id = id
        this.uid = uid
        this.cardId = cardId
        this.value = value
        this.type = type
        this.unit = unit
        this.portablereferenceId = portableReferenceId
        this.permanentreferenceId = permanentReferenceId
    }
}
