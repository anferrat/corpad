import { string, object } from "yup";
import { Validation } from "../utils/Validation";

export class ExternalLinkValidation extends Validation {
    constructor() {
        super()
    }

    logExternalLink(obj) {
        return this.validate(obj,
            object({
                tagId: this.number,
                name: this.name,
                linkType: this.externalLinkType,
                technician: this.smallText,
                itemType: this.itemType,
                location: this.smallText,
                link: string().max(2048, 'linkExeedsLengthLimit')
            }))
    }
}