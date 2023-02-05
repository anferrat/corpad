import { ItemStatuses, SurveyItem } from "./SurveyItem"
import { ItemTypes } from "./SurveyItem"

export class Pipeline extends SurveyItem {
    constructor(id, uid, name , timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product, tpCount) {
        super(id, uid, name, ItemStatuses.NO_STATUS, timeCreated, timeModified, comment, ItemTypes.PIPELINE)
        this.nps = nps
        this.material = material
        this.coating = coating
        this.licenseNumber = licenseNumber
        this.product = product
        this.tpCount = tpCount
    }
}


export const PipelineProducts = Object.freeze({
    GAS: 0,
    OIL: 1,
    WATER: 2,
    OTHER: 3
})

export const PipelineMaterials = Object.freeze({
    CARBON_STEEL: 0,
    ALLOY_STEEL: 1,
    CAST_IRON: 2,
    COPPER: 3,
    NICKEL: 4,
    PVC: 5,
    HDPE: 6,
    OTHER: 7
})