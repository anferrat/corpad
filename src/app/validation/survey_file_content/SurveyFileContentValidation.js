import { Error, errors } from "../../utils/Error";
import { Validation } from "../../utils/Validation";
import { SurveyFileContentValidationV1 } from "./v1/SurveyFileContentValidationV1";
import { SurveyFileContentValidationV2 } from "./v2/SurveyFileContentValidationV2";

export class SurveyFileContentValidation extends Validation {
    constructor() {
        super()
        this.surveyfileValidationV1 = new SurveyFileContentValidationV1()
        this.surveyfileValidationV2 = new SurveyFileContentValidationV2()
    }

    getVersion(obj) {
        try {
            return obj.version ?? null
        }
        catch (er) {
            return null
        }
    }

    //returns Boolean - confirms if survey file data structure could be interpreted in any way to generate survey (check the most basic schema)
    validateStructure(obj) {
        const version = this.getVersion(obj)
        switch (version) {
            case 1:
                return this.surveyfileValidationV1.validateStructure(obj)
            case 2:
                return this.surveyfileValidationV2.validateStructure(obj)
            default:
                //Maybe need to add error handling for the future versions, 
                return false
        }
    }

    //return object {valid: <Boolean>, corrupted: <Boolean>}. valid indicate if the object can be interpreted as surveyFile entity, corrupted is true, when there is at least one value that doesnt meet survey file schema inside survey file
    validateFile(obj) {
        const version = this.getVersion(obj)
        switch (version) {
            case 1:
                return this.surveyfileValidationV1.validateFile(obj)
            case 2:
                return this.surveyfileValidationV2.validateFile(obj)
            default:
                return { valid: false, corrupted: false }
        }
    }

    //return survey file, where corrupted values are either removed or replaced
    recoverFile(obj) {
        const version = this.getVersion(obj)
        switch (version) {
            case 1:
                return this.surveyfileValidationV1.recoverFile(obj)
            case 2:
                return this.surveyfileValidationV2.recoverFile(obj)
            default:
                throw new Error(errors.DATABASE, 'Unable to recover survey file', 'survey file version is not supported')
        }
    }

}