import { SurveyFileDataFields } from "../PipelineSurveyFile"
import { Element } from "./Element"

export class CardElement extends Element {
    constructor(
        id,
        parentId,
        uid,
        type,
        name,
        anodeMaterial,
        wireColor,
        wireGauge,
        fromAtoB,
        current,
        currentUnit,
        pipelineId,
        pipelineCardId,
        couponType,
        density,
        area,
        description,
        isolationType,
        shorted,
        rcType,
        nps,
        ratioCurrent,
        ratioVoltage,
        factorSelected,
        factor,
        voltageDrop,
    ) {
        super(SurveyFileDataFields.CARDS)
        this.id = id
        this.uid = uid
        this.parentId = parentId
        this.type = type
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
    }
}