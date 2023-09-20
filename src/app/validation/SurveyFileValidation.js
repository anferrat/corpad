import { object, string, mixed } from "yup"
import { Validation } from "../utils/Validation"

export class SurveyFileValidation extends Validation {
    constructor() {
        super()
    }

    getList(obj) {
        return this.validate(obj,
            object({
                isCloud: this.bool.required(),
            }))
    }

    deleteFile(obj) {
        return this.validate(obj,
            object({
                isCloud: this.bool.required(),
                path: string().nullable(),
                cloudId: string().nullable(),
                hash: string().nullable(),
                uid: this.uid
            }))
    }

    loadFile(obj) {
        return this.validate(obj,
            object({
                isCloud: this.bool.required(),
                path: string().nullable(),
                cloudId: string().nullable(),
                onDownload: mixed()
            }))
    }

    loadExternalFile(obj) {
        return this.validate(obj,
            object({
                path: string(),
            }))
    }
}