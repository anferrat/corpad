import { object, string, array } from "yup";
import { Validation } from "../utils/Validation";

export class CalculatorValidation extends Validation {
    constructor() {
        super()
    }

    save(obj) {
        return this.validate(obj,
            object({
                calculatorType: this.calculatorType,
                name: string().required(),
                latitude: this.latitude.nullable(),
                longitude: this.longitude.nullable(),
                timeCreated: this.timestamp,
                data: object()
            }))
    }

    getList(obj) {
        return this.validate(obj,
            object({
                calculatorType: this.calculatorType
            }))
    }

    delete(obj) {
        return this.validate(obj,
            object({
                id: this.id
            }))
    }

    getById(obj) {
        return this.validate(obj,
            object({
                id: this.id
            }))
    }

    deleteAll(obj) {
        return this.validate(obj,
            object({
                calculatorType: this.calculatorType
            }))
    }

    writeToFile(obj) {
        return this.validate(obj,
            object({
                data: array(),
                fileName: string()
            }))
    }
}