import { object, string } from "yup"
import { Validation } from "../utils/Validation"

export class MultimeterValidation extends Validation {
    constructor() {
        super()
    }

    checkMultimeterType(obj) {
        const { multimeterType } = obj
        this.multimeterType.isValidSync(multimeterType)
        return multimeterType
    }

    updateSettings(obj) {
        return this.validate(obj,
            object({
                onTime: this.number.min(200).max(60000).integer().required().test('multipleOf', 'Must be aliquot to 1000', value => value % 100 === 0),
                offTime: this.number.min(200).max(60000).integer().required().test('multipleOf', 'Must be aliquot to 1000', value => value % 100 === 0),
                syncMode: this.multimeterSyncMode.required(),
                firstCycle: this.multimeterFirstCycle.required(),
                onOffCaptureActive: this.bool.required(),
                timeSyncMode: this.timeSyncMode.required(),
                onSetup: this.number.min(20).max(Math.floor(obj.onTime / 2)).integer().required(),
                offDelay: this.number.min(20).max(Math.floor(obj.offTime / 2)).integer().required(),
                captureRate: this.captureRate.required()
            }))

    }

    pairMultimeter(obj) {
        return this.validate(obj,
            object({
                multimeterType: this.multimeterType,
                id: string(),
                name: this.name,
            }))
    }

    stopReadingCapture(obj) {
        return this.validate(obj,
            object({
                multimeterType: this.multimeterType,
                id: string(),
                measurementType: this.measurementType
            }))
    }

}