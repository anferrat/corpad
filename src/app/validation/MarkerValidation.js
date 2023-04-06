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

    update(obj) {
        return this.validate(obj,
            object({
                id: this.id,
                name: this.name,
                status: this.status,
                comment: this.comment,
                itemType: this.itemType,
                location: this.smallText,
                latitude: this.latitude,
                longitude: this.longitude
            }))
    }

}