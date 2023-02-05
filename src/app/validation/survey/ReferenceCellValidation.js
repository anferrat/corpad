import { object } from "yup"
import { Validation } from "../../utils/Validation"

export class ReferenceCellValidation extends Validation {
    constructor() {
        super()
    }
    updateMain(obj) {
        return this.validate(obj,
            object({
                id: this.id.required()
            }))
    }

    create(obj) {
        return this.validate(obj,
            object({
                name: this.name.required(),
                rcType: this.rcType.required()
            }))
    }

    delete(obj) {
        return this.validate(obj,
            object({
                id: this.id.required()
            }))
    }

}