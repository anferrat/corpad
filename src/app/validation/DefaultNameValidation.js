import { object } from "yup";
import { Validation } from "../utils/Validation";
import { ItemTypes } from "../entities/survey/items/SurveyItem";
import { SubitemTypes } from "../entities/survey/subitems/Subitem";

export class DefaultNameValidation extends Validation {
    constructor() {
        super()
    }

    updateList(obj) {
        return this.validate(obj,
            object({
                defaultNames: object({
                    [ItemTypes.TEST_POINT]: this.name.required().nullable(),
                    [ItemTypes.RECTIFIER]: this.name.required().nullable(),
                    [ItemTypes.PIPELINE]: this.name.required().nullable(),
                    [SubitemTypes.ANODE]: this.name.required().nullable(),
                    [SubitemTypes.BOND]: this.name.required().nullable(),
                    [SubitemTypes.CIRCUIT]: this.name.required().nullable(),
                    [SubitemTypes.COUPON]: this.name.required().nullable(),
                    [SubitemTypes.ISOLATION]: this.name.required().nullable(),
                    [SubitemTypes.PIPELINE]: this.name.required().nullable(),
                    [SubitemTypes.REFERENCE_CELL]: this.name.required().nullable(),
                    [SubitemTypes.RISER]: this.name.required().nullable(),
                    [SubitemTypes.SHUNT]: this.name.required().nullable(),
                    [SubitemTypes.STRUCTURE]: this.name.required().nullable(),
                    [SubitemTypes.TEST_LEAD]: this.name.required().nullable(),
                }),
                pipelineNameAsDefault: this.bool
            }))
    }
}