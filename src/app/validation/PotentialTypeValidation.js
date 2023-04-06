import { object } from "yup"
import { Validation } from "../utils/Validation"

export class PotentialTypeValidation extends Validation {
    constructor() {
        super()
    }

    create(obj) {
        return this.validate(obj,
            object({
                name: this.name,
            }))
    }

    delete(obj) {
        return this.validate(obj,
            object({
                id: this.id,
            }))
    }

    updateAutoCreate(obj) {
        return this.validate(obj,
            object({
                autoCreate: this.bool
            }))
    }

    updateUnit(obj) {
        return this.validate(obj,
            object({
                unit: this.potentialUnit
            }))
    }

}