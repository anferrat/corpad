import { array, object } from "yup";
import { Validation } from "../utils/Validation";

export class PotentialValidation extends Validation {
    constructor() {
        super()
    }

    create(obj) {
        return this.validate(obj,
            object({
                referenceCellIndex: this.index.required(),
                potentialTypeIndex: this.index.required(),
                subitemId: this.id.required(),
                potentialTypes: array().of(object({
                    id: this.id.required(),
                    name: this.name.required()
                })).required(),
                referenceCells: array().of(object({
                    id: this.id.required(),
                    name: this.name.required(),
                    rcType: this.rcType.required().nullable(),
                    isPortable: this.bool.required(),
                })).required()
            }))
    }

    delete(obj) {
        return this.validate(obj, object({
            id: this.id.required()
        }))
    }

    update(obj) {
        return this.validate(obj, object({
            id: this.id.required(),
            value: this.number.required().nullable(),
            unit: this.potentialUnit.required(),
            isAc: this.bool.required()
        }))
    }

    updateList(obj) {
        return this.validate(obj, object({
            subitemId: this.id.required(),
            potentials: object({
                unit: this.potentialUnit.required(),
                potentials: array().of(object({
                    id: this.id.required().nullable(),
                    uid: this.uid.required().nullable(),
                    potentialTypeId: this.id.required(),
                    isPortable: this.bool.required(),
                    referenceCellId: this.id.required(),
                    value: this.number.required().nullable()
                })),
                potentialTypes: array().of(object({
                    id: this.id.required(),
                    name: this.name.required()
                })).required(),
                referenceCells: array().of(object({
                    id: this.id.required(),
                    name: this.name.required(),
                    rcType: this.rcType.required().nullable(),
                    isPortable: this.bool.required(),
                })).required()
            })


        }))
    }

    getList(obj) {
        return this.validate(obj, object({
            itemId: this.id.required(),
            subitemId: this.id.required()
        }))
    }

    getOnOffPair(obj) {
        return this.validate(obj,
            object({
                subitemId: this.id.required(),
                potentialId: this.id.required()
            }))
    }
}