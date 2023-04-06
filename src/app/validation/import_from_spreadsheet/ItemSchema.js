import { Validation } from "../../utils/Validation"
import { ItemStatuses, ItemTypes } from "../../entities/survey/items/SurveyItem"
import { Error } from "../../utils/Error"
import { array, object, mixed } from "yup"

export class ItemSchema extends Validation {
    constructor () {
        super()
    }

    execute(itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return object({
                    name: this.name,
                    testPointType: this.testPointType.nullable(),
                    location: this.location,
                    latitude: this.latitude,
                    longitude: this.longitude,
                    comment: this.comment,
                    status: mixed().oneOf([ItemStatuses.ATTENTION, ItemStatuses.BAD, ItemStatuses.GOOD, ItemStatuses.UNKNOWN], 'statusMismatch').nullable(),
                })
            case ItemTypes.RECTIFIER:
                return object({
                    name: this.name,
                    location: this.location,
                    latitude: this.latitude,
                    longitude: this.longitude,
                    comment: this.comment,
                    status: mixed().oneOf([ItemStatuses.ATTENTION, ItemStatuses.BAD, ItemStatuses.GOOD, ItemStatuses.UNKNOWN], 'statusMismatch').nullable(),
                    model: this.smallText,
                    serialNumber: this.smallText,
                    powerSource: this.powerSource,
                    tapValue: this.tapValue,
                    tapCoarse: this.coarseFineValue,
                    tapFine: this.coarseFineValue,
                    maxVoltage: this.number,
                    maxCurrent: this.number
                })
            case ItemTypes.PIPELINE:
                return object({
                    name: this.name,
                    nps: this.nps,
                    licenseNumber: this.smallText,
                    material: this.pipeMaterial,
                    coating: this.bool,
                    product: this.pipelineProduct,
                    comment: this.comment
                })
            default: throw Error('CorpadError', 'Unknown itemType')
        }
    }
}