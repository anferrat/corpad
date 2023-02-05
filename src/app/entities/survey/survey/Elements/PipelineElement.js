import { SurveyFileDataFields } from "../PipelineSurveyFile"
import { Element } from "./Element"

export class PipelineElement extends Element {
    constructor(id, uid, name, nps, material, coating, licenseNumber, timeCreated, timeModified, product, comment) {
        super(SurveyFileDataFields.PIPELINES)
        this.id = id
        this.uid = uid
        this.name = name
        this.nps = nps
        this.material = material
        this.coating = coating
        this.licenseNimber = licenseNumber
        this.timeCerated = timeCreated
        this.timeModified = timeModified
        this.product = product
        this.comment = comment
    }
}