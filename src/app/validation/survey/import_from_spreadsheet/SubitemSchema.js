import { object, string, array } from "yup";
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem";
import { Validation } from "../../../utils/Validation";

export class SubitemSchema extends Validation {
    constructor (potentialSchema) {
        super()
        this.key = string()
        this.nameSchema = {
            key: this.key,
            type: this.subitemType,
            name: this.name.required()
        }
        this.wirePropSchema = {
            wireGauge: this.wireGauge,
            wireColor: this.wireColor,
        }
        this.sidesSchema = {
            fromAtoB: this.bool,
            sideA: array().of(this.key),
            sideB: array().of(this.key)
        }
        this.potentialSchema = potentialSchema
    }



    execute(type) {
        switch (type) {
            case SubitemTypes.ANODE:
                return object({
                    ...this.nameSchema,
                    ...this.wirePropSchema,
                    anodeMaterial: this.anodeMaterial,
                    potentials: this.potentialSchema.execute()
                })
            case SubitemTypes.BOND:
                return object({
                    ...this.nameSchema,
                    ...this.sidesSchema,
                    current: this.number,
                })
            case SubitemTypes.CIRCUIT:
                return object({
                    ...this.nameSchema,
                    current: this.number,
                    voltage: this.number,
                    targetMax: this.number,
                    targetMin: this.number
                })
            case SubitemTypes.COUPON:
                return object({
                    ...this.nameSchema,
                    ...this.wirePropSchema,
                    pipelineCardId: this.key.nullable(),
                    couponType: this.couponType,
                    area: this.number,
                    density: this.number,
                    current: this.number,
                    potentials: this.potentialSchema.execute()
                })
            case SubitemTypes.ISOLATION:
                return object({
                    ...this.nameSchema,
                    ...this.sidesSchema,
                    current: this.number,
                    shorted: this.bool,
                    isolationType: this.isolationType,
                })
            case SubitemTypes.PIPELINE:
                return object({
                    ...this.nameSchema,
                    ...this.wirePropSchema,
                    pipelieId: this.id.nullable(),
                    potentials: this.potentialSchema.execute()
                })
            case SubitemTypes.REFERENCE_CELL:
                return object({
                    ...this.nameSchema,
                    ...this.wirePropSchema,
                    rcType: this.rcType,
                    potentials: this.potentialSchema.execute()
                })
            case SubitemTypes.RISER:
                return object({
                    ...this.nameSchema,
                    nps: this.nps.nullable(),
                    pipelineId: this.id.nullable(),
                    potentials: this.potentialSchema.execute()
                })
            case SubitemTypes.SHUNT:
                return object({
                    ...this.nameSchema,
                    ...this.sidesSchema,
                    factor: this.number,
                    voltageDrop: this.number,
                    current: this.number
                })
            case SubitemTypes.STRUCTURE:
                return object({
                    ...this.nameSchema,
                    description: this.comment,
                    potentials: this.potentialSchema.execute(),
                })
            case SubitemTypes.TEST_LEAD:
                return object({
                    ...this.nameSchema,
                    ...this.wirePropSchema,
                    potentials: this.potentialSchema.execute()
                })
            default: throw new Error('CorpadError', 'Unknown subitem type')
        }
    }
}