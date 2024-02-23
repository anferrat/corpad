import { LengthUnits, ResistivityUnits, SubitemTypes } from "../../../constants/global"
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
import { AnodeBed } from "../../entities/survey/subitems/AnodeBed"
import { SoilResistivity } from "../../entities/survey/subitems/SoilResistivity"

export class SubitemFactory {
    constructor() { }

    execute(id, uid, name, type, parentId, anodeMaterial = null, wireGauge = null, wireColor = null, fromAtoB = true, current = null, sideA = [], sideB = [], ratioCurrent = null, ratioVoltage = null, targetMin = null, targetMax = null, voltage = null, voltageDrop = null, pipelineCardId = null, couponType = null, density = null, area = null, isolationType = null, shorted = false, pipelineId = null, rcType = null, nps = null, factor = null, factorSelected = false, description = null, prevCurrent = null, prevVoltageDrop = null, spacingUnit = LengthUnits.METERS, resistivityUnit = ResistivityUnits.OHM_METERS, comment = null, enclosureType = null, bedType = null, materialType = null, anodes = [], layers = []) {
        switch (type) {
            case SubitemTypes.ANODE:
                return new Anode(id, parentId, uid, name, anodeMaterial, wireGauge, wireColor)
            case SubitemTypes.BOND:
                return new Bond(id, parentId, uid, name, fromAtoB, current, sideA, sideB, prevCurrent)
            case SubitemTypes.CIRCUIT:
                return new Circuit(id, parentId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage, voltageDrop)
            case SubitemTypes.COUPON:
                return new Coupon(id, parentId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area, prevCurrent)
            case SubitemTypes.ISOLATION:
                return new Isolation(id, parentId, uid, name, fromAtoB, isolationType, shorted, current, sideA, sideB)
            case SubitemTypes.PIPELINE:
                return new PipelineLead(id, parentId, uid, name, pipelineId, wireGauge, wireColor)
            case SubitemTypes.REFERENCE_CELL:
                return new StatReferenceCell(id, parentId, uid, name, rcType, wireGauge, wireColor)
            case SubitemTypes.RISER:
                return new Riser(id, parentId, uid, name, pipelineId, nps)
            case SubitemTypes.SHUNT:
                return new Shunt(id, parentId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB, prevVoltageDrop)
            case SubitemTypes.STRUCTURE:
                return new Structure(id, parentId, uid, name, description)
            case SubitemTypes.TEST_LEAD:
                return new TestLead(id, parentId, uid, name, wireGauge, wireColor)
            case SubitemTypes.ANODE_BED:
                return new AnodeBed(id, parentId, uid, name, enclosureType, bedType, materialType, anodes)
            case SubitemTypes.SOIL_RESISTIVITY:
                return new SoilResistivity(id, parentId, uid, name, spacingUnit, resistivityUnit, comment, layers)
            default: throw new Error(errors.GENERAL, `Unable to create subitem with type ${type}`)
        }
    }
}