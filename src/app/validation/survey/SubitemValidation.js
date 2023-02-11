import { object, mixed, ref } from "yup"
import { SubitemPropertyUpdateTypes } from "../../entities/survey/other/properties"
import { SubitemTypes } from "../../entities/survey/subitems/Subitem"
import { Validation } from "../../utils/Validation"

export class SubitemValidation extends Validation {
    constructor () {
        super()
    }

    create(obj) {
        return this.validate(obj,
            object({
                subitemType: this.subitemType.required(),
                itemId: this.id.required()
            }))
    }

    delete(obj) {
        return this.validate(obj,
            object({
                subitemType: this.subitemType.required(),
                id: this.id.required()
            }))
    }

    getById(obj) {
        return this.validate(obj,
            object({
                subitemId: this.id.required(),
                itemId: this.id.required(),
                subitemType: this.subitemType.required()
            }))
    }

    getList(obj) {
        return this.validate(obj,
            object({
                itemId: this.id.required(),
                itemType: this.itemType.required()
            }))
    }

    updateProperty(obj) {
        const getSchemaByPropertyType = (propertyType) => {
            switch (propertyType) {
                case SubitemPropertyUpdateTypes.CURRENT:
                case SubitemPropertyUpdateTypes.VOLTAGE:
                case SubitemPropertyUpdateTypes.VOLTAGE_DROP:
                    return this.number.required()
                case SubitemPropertyUpdateTypes.SHORTED:
                    return this.bool.required()
                default: mixed().required()
            }
        }

        return this.validate(obj,
            object({
                subitemId: this.id.required(),
                itemId: this.id.required(),
                subitemType: this.subitemType.required(),
                propertyType: this.subitemPropertyUpdateType.required(),
                value: getSchemaByPropertyType(ref('propertyType'))
            }))
    }

    update(obj) {
        const subitem = this.validate(obj, object({
            id: this.id.required(),
            uid: this.uid.required(),
            name: this.name.required(),
            type: this.subitemType.required(),
            parentId: this.id.required(),
        }))

        const getSubitemDataSchema = (type) => {
            switch (type) {
                case SubitemTypes.ANODE:
                    return object({
                        anodeMaterial: this.anodeMaterial.required(),
                        wireColor: this.wireColor.required(),
                        wireGauge: this.wireGauge.required(),
                    })
                case SubitemTypes.BOND:
                    return object({
                        current: this.number,
                        sideA: this.side,
                        sideB: this.side,
                        fromAtoB: this.bool,
                    })
                case SubitemTypes.CIRCUIT:
                    return object({
                        ratioCurrent: this.number,
                        ratioVoltage: this.number,
                        targetMin: this.number,
                        targetMax: this.number,
                        current: this.number,
                        voltage: this.number,
                        voltageDrop: this.number
                    })
                case SubitemTypes.COUPON:
                    return object({
                        pipelineCardId: this.id,
                        wireGauge: this.wireGauge,
                        wireColor: this.wireColor,
                        couponType: this.couponType,
                        current: this.number,
                        density: this.number,
                        area: this.number
                    })
                case SubitemTypes.ISOLATION:
                    return object({
                        fromAtoB: this.bool,
                        isolationType: this.isolationType,
                        shorted: this.bool,
                        current: this.number,
                        sideA: this.side,
                        sideB: this.side,
                    })
                case SubitemTypes.PIPELINE:
                    return object({
                        pipelineId: this.pipelineId,
                        wireColor: this.wireColor,
                        wireGauge: this.wireGauge
                    })
                case SubitemTypes.REFERENCE_CELL:
                    return object({
                        rcType: this.rcType,
                        wireColor: this.wireColor,
                        wireGauge: this.wireGauge
                    })
                case SubitemTypes.RISER:
                    return object({
                        pipelineId: this.id,
                        nps: this.nps
                    })
                case SubitemTypes.SHUNT:
                    return object({
                        current: this.number,
                        factor: this.number,
                        ratioVoltage: this.number,
                        ratioCurrent: this.number,
                        factorSelected: this.bool,
                        voltageDrop: this.number,
                        fromAtoB: this.bool,
                        sideA: this.side,
                        sideB: this.side
                    })
                case SubitemTypes.STRUCTURE:
                    return object({
                        description: this.description
                    })
                case SubitemTypes.TEST_LEAD:
                    return object({
                        wireColor: this.wireColor,
                        wireGauge: this.wireGauge
                    })
            }

        }
        return {
            ...subitem,
            ...this.validate(obj, getSubitemDataSchema(subitem.type))
        }
    }
}