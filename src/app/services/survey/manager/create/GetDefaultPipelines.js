import { Pipeline } from "../../../../entities/survey/items/Pipeline";
import { guid } from "../../../../utils/guid";

export class GetDefaultPipeline {
    constructor() {
    }

    execute() {
        const currentTime = Date.now()
        return new Pipeline(null, guid(), 'Pipeline', currentTime, currentTime, null, null, null, true, null, null, null)
    }
}