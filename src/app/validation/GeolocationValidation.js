import { mixed, object } from "yup";
import { Validation } from "../utils/Validation";

export class GeolocationValidation extends Validation {
    constructor() {
        super()
    }

    shareWithExternalApp(obj) {
        return this.validate(obj,
            object({
                latitude: this.latitude,
                longitude: this.longitude,
                name: this.name,
                provider: mixed()
            }))
    }
}