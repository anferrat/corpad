import { mixed, object } from "yup";
import { Validation } from "../utils/Validation";

export class MapLayerValidation extends Validation {
    constructor() {
        super()
    }

    create(obj) {
        return this.validate(obj,
            object({
                name: this.name.nullable(),
                comment: this.comment,
                color: this.strokeColor,
                width: this.strokeWidth,
                data: mixed(),
                defaultName: this.name,
            }))
    }

    update(obj) {
        return this.validate(obj,
            object({
                id: this.id,
                name: this.name.nullable(),
                comment: this.comment,
                color: this.strokeColor,
                width: this.strokeWidth,
                visible: this.bool,
                defaultName: this.name,
            }))
    }

    getById(obj) {
        return this.validate(obj,
            object({
                id: this.id
            }))
    }

    delete(obj) {
        return this.validate(obj,
            object({
                id: this.id
            }))
    }
}