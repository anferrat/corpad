import { Error, errors } from "../../utils/Error";
import { SurveyFileConverterInputV1 } from "./v1/SurveyFileConverterInputV1";
import { SurveyFileConverterInputV2 } from "./v2/SurveyFileConverterInputV2";

export class SurveyFileConverterInput {
    //Converts survey file object to JS Class PipelineSurveyfile based on version
    constructor(subitemFactory) {
        this.inputConverterV1 = new SurveyFileConverterInputV1(subitemFactory)
        this.inputConverterV2 = new SurveyFileConverterInputV2()
    }

    execute(dataObject, version) {
        switch (version) {
            case 1:
                return this.inputConverterV1.execute(dataObject)
            case 2:
                return this.inputConverterV2.execute(dataObject)
            default:
                throw new Error(errors.GENERAL, 'Unable select survey file input converter service', 'Unsupported database schema version')
        }
    }
}