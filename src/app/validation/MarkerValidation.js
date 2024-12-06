import { array, object, string } from "yup"
import { Validation } from "../utils/Validation"

export class MarkerValidation extends Validation {
    constructor() {
        super()
    }
    getMarker(obj) {
        return this.validate(obj,
            object({
                itemType: this.itemType.required(),
                itemId: this.id.required()
            }))
    }

    searchMarker(obj) {
        return this.validate(obj,
            object({
                keyword: string(),
            }))
    }

    getInitialMapRegion(obj) {
        return this.validate(obj,
            object({
                markers: array().of(object({
                    latitude: this.latitude.required().nullable(),
                    longitude: this.longitude.required().nullable()
                })),
            }))
    }

    updateCoordinates(obj) {
        return this.validate(obj,
            object({
                itemId: this.id,
                itemType: this.itemType,
                latitude: this.latitude.nullable(),
                longitude: this.longitude.nullable(),
            }))
    }

}