import { object, array, string } from "yup";
import { ItemTypes } from "../../constants/global";
import { Validation } from "../utils/Validation";

export class ItemValidation extends Validation {
    constructor() {
        super()
    }
    createItem(obj) {
        return this.validate(obj,
            object({
                itemType: this.itemType.required(),
                latitude: this.latitude,
                longitude: this.longitude,
            }))
    }

    search(obj) {
        return this.validate(obj,
            object({
                keyword: string().nullable(),
            }))
    }

    updateItem(obj) {
        this.property('itemType', obj?.itemType)
        switch (obj.itemType) {
            case ItemTypes.TEST_POINT:
                return this.validate(obj,
                    object({
                        itemType: this.itemType,
                        id: this.id.required(),
                        name: this.name.nullable(),
                        location: this.location,
                        latitude: this.latitude,
                        longitude: this.longitude,
                        comment: this.comment,
                        testPointType: this.testPointType.required(),
                        status: this.status,
                        defaultName: this.name,
                        imageUris: array().of(string()).required()
                    }))
            case ItemTypes.RECTIFIER:
                return this.validate(obj,
                    object({
                        itemType: this.itemType,
                        id: this.id.required(),
                        name: this.name.nullable(),
                        location: this.location,
                        latitude: this.latitude,
                        longitude: this.longitude,
                        comment: this.comment,
                        status: this.status,
                        defaultName: this.name,
                        model: this.smallText,
                        serialNumber: this.smallText,
                        powerSource: this.powerSource,
                        acVoltage: this.number,
                        acCurrent: this.number,
                        tapSetting: this.tapSetting,
                        tapValue: this.tapValue,
                        tapCoarse: this.coarseFineValue,
                        tapFine: this.coarseFineValue,
                        maxVoltage: this.number,
                        maxCurrent: this.number,
                        imageUris: array().of(string()).required()
                    }))
            case ItemTypes.PIPELINE:
                return this.validate(obj,
                    object({
                        itemType: this.itemType,
                        id: this.id.required(),
                        name: this.name.nullable(),
                        comment: this.comment,
                        defaultName: this.name,
                        coating: this.bool,
                        licenseNumber: this.smallText,
                        product: this.pipelineProduct,
                        nps: this.nps,
                        material: this.pipeMaterial
                    }))
        }
    }

    deleteItem(obj) {
        return this.validate(obj,
            object({
                id: this.id.required(),
                itemType: this.itemType.required()
            })
        )
    }

    getItemPhotos(obj) {
        return this.validate(obj,
            object({
                itemId: this.id.required(),
                itemType: this.itemType.required(),
            })
        )
    }

    getNearbyItems(obj) {
        return this.validate(obj,
            object({
                itemType: this.itemType.required()
            })
        )
    }

    getById(obj) {
        return this.validate(obj,
            object({
                id: this.id.required(),
                itemType: this.itemType.required()
            })
        )
    }

    getIdList(obj) {
        this.property('itemType', obj.itemType)
        switch (obj.itemType) {
            case ItemTypes.TEST_POINT:
                return this.validate(obj,
                    object({
                        itemType: this.itemType,
                        sorting: this.sorting.required(),
                        latitude: this.latitude,
                        longitude: this.longitude,
                        filters: object({
                            statusFilter: this.statusFilter.required(),
                            testPointTypeFilter: this.testPointTypeFilter.required(),
                            hideEmptyTestPoints: this.bool.required(),
                            readingTypeFilter: this.readingTypeFilter.required(),
                        }).required()
                    })
                )
            case ItemTypes.RECTIFIER:
                return this.validate(obj,
                    object({
                        itemType: this.itemType.required(),
                        sorting: this.sorting.required(),
                        latitude: this.latitude,
                        longitude: this.longitude,
                    })
                )
            case ItemTypes.PIPELINE:
                return this.validate(obj,
                    object({
                        itemType: this.itemType.required(),
                        sorting: this.sorting.required(),
                    })
                )
        }
    }

    getDisplayData(obj) {
        const itemType = this.property('itemType', obj?.itemType)
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.validate(obj,
                    object({
                        itemType: this.itemType.required(),
                        displayedReading: this.testPointDisplayedreading.required(),
                        idList: array().of(this.id).required(),
                        readingTypeFilter: this.readingTypeFilter.required()
                    }))
            case ItemTypes.RECTIFIER:
                return this.validate(obj,
                    object({
                        itemType: this.itemType.required(),
                        displayedReading: this.rectifierDisplayedReading.required(),
                        idList: array().of(this.id).required(),
                    }))
            case ItemTypes.PIPELINE:
                return this.validate(obj,
                    object({
                        itemType: this.itemType.required(),
                        idList: array().of(this.id).required(),
                    }))
        }
    }
}