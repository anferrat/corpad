import { object } from "yup"
import { Validation } from "../utils/Validation"

export class SurveyValidation extends Validation {
    constructor() {
        super()
    }
    updateName(obj) {
        return this.validate(obj,
            object({
                name: this.name.required(),
            }))
    }
}