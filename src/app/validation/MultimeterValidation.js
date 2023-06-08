import { object, string } from "yup"
import { Validation } from "../utils/Validation"

export class MultimeterValidation extends Validation {
    constructor() {
        super()
    }

    updateSettings(obj) {
        return this.validate(obj,
            object({
                onTime: this.number,
                offTime: this.number,
                delay: this.number,
                syncMode: this.multimeterSyncMode,
                firstCycle: this.multimeterFirstCycle
            }))
    }

    pairMultimeter(obj) {
        return this.validate(obj,
            object({
                id: string(),
                name: this.name,
                multimeterType: this.multimeterType,
            }))
    }

}