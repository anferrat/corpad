import { Error } from "../../../utils/Error"
import { Anode } from "./Anode"
import { Bond } from "./Bond"
import { Circuit } from "./Circuit"
import { Coupon } from "./Coupon"
import { Isolation } from "./Isolation"
import { PipelineLead } from "./PipelineLead"
import { ReferenceCell } from "./ReferenceCell"
import { Riser } from "./Riser"
import { Shunt } from "./Shunt"
import { Structure } from "./Structure"
import { TestLead } from "./TestLead"

export class SubitemData {
    constructor(
        id,
        parentId,
        uid,
        type,
        timeCreated,
        timeModified = null,
        name = null,
        anodeMaterial = null,
        wireColor = null,
        wireGauge = null,
        fromAtoB = null,
        current = null,
        currentUnit = null,
        pipelineId = null,
        pipelineCardId = null,
        couponType = null,
        density = null,
        area = null,
        description = null,
        isolationType = null,
        shorted = null,
        rcType = null,
        nps = null,
        ratioCurrent = null,
        ratioVoltage = null,
        factorSelected = null,
        factor = null,
        voltageDrop = null,
        targetMin = null,
        targetMax = null,
        voltage = null,
        sideA = [],
        sideB = []
    ) {
        this.id = id
        this.uid = uid
        this.parentId = parentId
        this.type = type
        this.timeCreated = timeCreated
        this.timeModified = timeModified
        this.name = name
        this.anodeMaterial = anodeMaterial
        this.wireColor = wireColor
        this.wireGauge = wireGauge
        this.fromAtoB = fromAtoB
        this.current = current
        this.currentUnit = currentUnit
        this.pipelineId = pipelineId
        this.pipelineCardId = pipelineCardId
        this.couponType = couponType
        this.density = density
        this.area = area
        this.description = description
        this.isolationType = isolationType
        this.shorted = shorted
        this.rcType = rcType
        this.nps = nps
        this.ratioCurrent = ratioCurrent
        this.ratioVoltage = ratioVoltage
        this.factorSelected = factorSelected
        this.factor = factor
        this.voltageDrop = voltageDrop
        this.targetMin = targetMin
        this.targetMax = targetMax
        this.voltage = voltage
        this.sideA = sideA
        this.sideB = sideB
    }

    getSubitem() {
        switch (this.type) {
            case SubitemTypes.ANODE:
                return new SubitemClasses[SubitemTypes.ANODE](this.id, this.parentId, this.uid, this.type, this.name, this.timeCreated, this.timeModified, this.anodeMaterial, this.wireGauge, this.wireColor)
            case SubitemTypes.PIPELINE:
                return new SubitemClasses[SubitemTypes.PIPELINE](this.id, this.parentId, this.uid, this.type, this.name, this.timeCreated, this.timeModified, this.pipelineId, this.wireGauge, this.wireColor)
            case SubitemTypes.REFERENCE_CELL:
                return new SubitemClasses[SubitemTypes.REFERENCE_CELL](this.id, this.parentId, this.uid, this.type, this.name, this.timeCreated, this.timeModified, this.rcType, this.wireGauge, this.wireColor)
            case SubitemTypes.COUPON:
                return new SubitemClasses[SubitemTypes.COUPON](this.id, this.parentId, this.uid, this.type, this.name, this.timeCreated, this.timeModified, this.pipelineCardId, this.wireGauge, this.wireColor, this.couponType, this.current, this.density, this.area)
            case SubitemTypes.BOND:
                return new SubitemClasses[SubitemTypes.BOND](this.id, this.parentId, this.uid, this.type, this.name, this.timeCreated, this.timeModified, this.fromAtoB, this.current, this.sideA, this.sideB)
            case SubitemTypes.SHUNT:
                return new SubitemClasses[SubitemTypes.SHUNT](this.id, this.parentId, this.uid, this.type, this.name, this.timeCreated, this.timeModified, this.factor, this.ratioVoltage, this.ratioCurrent, this.factorSelected, this.current, this.voltageDrop, this.fromAtoB, this.sideA, this.sideB)
            case SubitemTypes.TEST_LEAD:
                return new SubitemClasses[SubitemTypes.TEST_LEAD](this.id, this.parentId, this.uid, this.type, this.name, this.timeCreated, this.timeModified, this.wireGauge, this.wireColor)
            case SubitemTypes.RISER:
                return new SubitemClasses[SubitemTypes.RISER](this.id, this.parentId, this.uid, this.type, this.name, this.timeCreated, this.timeModified, this.pipelineId, this.wireGauge, this.wireColor, this.nps)
            case SubitemTypes.ISOLATION:
                return new SubitemClasses[SubitemTypes.RISER](this.id, this.parentId, this.uid, this.type, this.name, this.timeCreated, this.timeModified, this.fromAtoB, this.isolationType, this.shorted, this.current, this.sideA, this.sideB)
            case SubitemTypes.STRUCTURE:
                return new SubitemClasses[SubitemTypes.ISOLATION](this.id, this.parentId, this.uid, this.type, this.name, this.timeCreated, this.timeModified, this.description)
            case SubitemTypes.CIRCUIT:
                return new SubitemClasses[SubitemTypes.CIRCUIT](this.id, this.parentId, this.uid, this.type, this.name, this.timeCreated, this.timeModified, this.ratioCurrent, this.ratioVoltage, this.targetMin, this.targetMax, this.current, this.voltage)
            default:
                throw new Error('CorpadError', `Unable to create subitem of type ${this.type}`)
        }
    }
}


export const SubitemTypes = Object.freeze({
    ANODE: 'AN',
    PIPELINE: 'PL',
    REFERENCE_CELL: 'RE',
    COUPON: 'CN',
    BOND: 'BD',
    SHUNT: 'SH',
    TEST_LEAD: 'OT',
    RISER: 'RS',
    ISOLATION: 'IK',
    STRUCTURE: 'FC',
    CIRCUIT: 'CT'
})


export const SubitemClasses = Object.freeze({
    [SubitemTypes.ANODE]: Anode,
    [SubitemTypes.PIPELINE]: PipelineLead,
    [SubitemTypes.REFERENCE_CELL]: ReferenceCell,
    [SubitemTypes.COUPON]: Coupon,
    [SubitemTypes.Bond]: Bond,
    [SubitemTypes.SHUNT]: Shunt,
    [SubitemTypes.TEST_LEAD]: TestLead,
    [SubitemTypes.RISER]: Riser,
    [SubitemTypes.ISOLATION]: Isolation,
    [SubitemTypes.STRUCTURE]: Structure,
    [SubitemTypes.CIRCUIT]: Circuit
})
