import { SubitemTypes } from "../../../constants/global"
import { Error, errors } from "../../utils/Error"
import { Anode } from "../../entities/survey/subitems/Anode"
import { Bond } from "../../entities/survey/subitems/Bond"
import { Coupon } from "../../entities/survey/subitems/Coupon"
import { Circuit } from "../../entities/survey/subitems/Circuit"
import { Isolation } from "../../entities/survey/subitems/Isolation"
import { PipelineLead } from "../../entities/survey/subitems/PipelineLead"
import { StatReferenceCell } from "../../entities/survey/subitems/StatReferenceCell"
import { Riser } from "../../entities/survey/subitems/Riser"
import { Shunt } from "../../entities/survey/subitems/Shunt"
import { Structure } from "../../entities/survey/subitems/Structure"
import { TestLead } from "../../entities/survey/subitems/TestLead"

export class SubitemFactory {
    constructor() { }

    execute2(id = null, uid, name = null, type, parentId, data = {}) {
        switch (type) {
            case SubitemTypes.ANODE:
                return new Anode(id, parentId, uid, name, data.anodeMaterial ?? null, data.wireGauge ?? null, data.wireColor ?? null)
            case SubitemTypes.BOND:
                return new Bond(id, parentId, uid, name, data.fromAtoB ?? true, data.current ?? null, data.sideA ?? [], data.sideB ?? [])
            case SubitemTypes.CIRCUIT:
                return new Circuit(id, parentId, uid, name, data.ratioCurrent ?? null, data.ratioVoltage ?? null, data.targetMin ?? null, data.targetMax ?? null, data.current ?? null, data.voltage ?? null, data.voltageDrop ?? null)
            case SubitemTypes.COUPON:
                return new Coupon(id, parentId, uid, name, data.pipelineCardId ?? null, data.wireGauge ?? null, data.wireColor ?? null, data.couponType ?? null, data.current ?? null, data.density ?? null, data.area ?? null)
            case SubitemTypes.ISOLATION:
                return new Isolation(id, parentId, uid, name, data.fromAtoB ?? true, data.isolationType ?? null, data.shorted ?? false, data.current ?? null, data.sideA ?? [], data.sideB ?? [])
            case SubitemTypes.PIPELINE:
                return new PipelineLead(id, parentId, uid, name, data.pipelineId ?? null, data.wireGauge ?? null, data.wireColor ?? null)
            case SubitemTypes.REFERENCE_CELL:
                return new StatReferenceCell(id, parentId, uid, name, data.rcType ?? null, data.wireGauge ?? null, data.wireColor ?? null)
            case SubitemTypes.RISER:
                return new Riser(id, parentId, uid, name, data.pipelineId ?? null, data.nps ?? null)
            case SubitemTypes.SHUNT:
                return new Shunt(id, parentId, uid, name, data.factor ?? null, data.ratioVoltage ?? null, data.ratioCurrent ?? null, data.factorSelected ?? true, data.current ?? null, data.voltageDrop ?? null, data.fromAtoB ?? true, data.sideA ?? [], data.sideB ?? [])
            case SubitemTypes.STRUCTURE:
                return new Structure(id, parentId, uid, name, data.description ?? null)
            case SubitemTypes.TEST_LEAD:
                return new TestLead(id, parentId, uid, name, data.wireGauge ?? null, data.wireColor ?? null)
            default: throw new Error(errors.GENERAL, `Unable to update subitem with type ${type}`)
        }
    }

    execute(id, uid, name, type, parentId, anodeMaterial = null, wireGauge = null, wireColor = null, fromAtoB = true, current = null, sideA = [], sideB = [], ratioCurrent = null, ratioVoltage = null, targetMin = null, targetMax = null, voltage = null, voltageDrop = null, pipelineCardId = null, couponType = null, density = null, area = null, isolationType = null, shorted = false, pipelineId = null, rcType = null, nps = null, factor = null, factorSelected = false, description = null) {
        switch (type) {
            case SubitemTypes.ANODE:
                return new Anode(id, parentId, uid, name, anodeMaterial, wireGauge, wireColor)
            case SubitemTypes.BOND:
                return new Bond(id, parentId, uid, name, fromAtoB, current, sideA, sideB)
            case SubitemTypes.CIRCUIT:
                return new Circuit(id, parentId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage, voltageDrop)
            case SubitemTypes.COUPON:
                return new Coupon(id, parentId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area)
            case SubitemTypes.ISOLATION:
                return new Isolation(id, parentId, uid, name, fromAtoB, isolationType, shorted, current, sideA, sideB)
            case SubitemTypes.PIPELINE:
                return new PipelineLead(id, parentId, uid, name, pipelineId, wireGauge, wireColor)
            case SubitemTypes.REFERENCE_CELL:
                return new StatReferenceCell(id, parentId, uid, name, rcType, wireGauge, wireColor)
            case SubitemTypes.RISER:
                return new Riser(id, parentId, uid, name, pipelineId, nps)
            case SubitemTypes.SHUNT:
                return new Shunt(id, parentId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB)
            case SubitemTypes.STRUCTURE:
                return new Structure(id, parentId, uid, name, description)
            case SubitemTypes.TEST_LEAD:
                return new TestLead(id, parentId, uid, name, wireGauge, wireColor)
            default: throw new Error(errors.GENERAL, `Unable to update subitem with type ${type}`)
        }
    }
}