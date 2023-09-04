import { Error, errors } from "../../utils/Error";
import { SurveyFileConverterOutputV1 } from "./v1/SurveyFileConverterOutputV1";
import { SurveyfileConverterOutputV2 } from "./v2/SurveyFileConverterOutputV2";

export class SurveyFileConverterOutput {
    // Generates survey file data objects
    constructor() {
        this.outputConverterV1 = new SurveyFileConverterOutputV1()
        this.outputConverterV2 = new SurveyfileConverterOutputV2()
        this.OUTPUT_FILE_VERSION = 2 //update this to change converter schemas. (downgrading schemas can lead to data loss, USE ONLY FOR TESTING!!!)
    }

    execute(surveyFile) {
        switch (this.OUTPUT_FILE_VERSION) {
            case 1:
                return this.outputConverterV1.execute(surveyFile)
            case 2:
                return this.outputConverterV2.execute(surveyFile)
            default:
                throw new Error(errors.GENERAL, 'Unable to select output converter service', 'Schema version is not supported')
        }
    }
}