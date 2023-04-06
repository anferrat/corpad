import { array, object } from "yup";
import { Validation } from "../../utils/Validation";

export class PotentialSchema extends Validation {
    constructor () {
        super()
    }

    execute() {
        return array().of(object({
            value: this.number,
            potentialTypeId: this.id,
            referenceCellId: this.id,
            unit: this.potentialUnit,
        })).strict(false).required()
    }
}