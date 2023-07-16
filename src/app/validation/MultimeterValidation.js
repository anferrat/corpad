import { object, string } from "yup"
import { Validation } from "../utils/Validation"
import { MultimeterTypes } from "../../constants/global"
import { Error, errors } from "../utils/Error"

export class MultimeterValidation extends Validation {
    constructor() {
        super()
    }

    checkMultimeterType(obj) {
        const { multimeterType } = obj
        this.multimeterType.isValidSync(multimeterType)
        return multimeterType
    }

    updateSettings(obj, multimeterType) {
        switch (multimeterType) {
            case MultimeterTypes.POKIT:
                return this.validate(obj,
                    object({
                        multimeterType: this.multimeterType.required(),
                        onTime: this.number.min(1000).max(20000).integer().required().test('multipleOf', 'Must be aliquot to 1000', value => value % 1000 === 0),
                        offTime: this.number.min(1000).max(20000).integer().required().test('multipleOf', 'Must be aliquot to 1000', value => value % 1000 === 0),
                        delay: this.number.required(), //add delay schema when confirmed
                        syncMode: this.multimeterSyncMode.required(),
                        firstCycle: this.multimeterFirstCycle.required()
                    }))
            default:
                throw new Error(errors.VALIDATION, 'Not supported multimeter type', 'Internal error, no such MM type')
        }

    }

    pairMultimeter(obj) {
        return this.validate(obj,
            object({
                multimeterType: this.multimeterType,
                id: string(),
                name: this.name,
            }))
    }

    stopPotentialCapture(obj) {
        return this.validate(obj,
            object({
                multimeterType: this.multimeterType,
                id: string(),
            }))
    }

}