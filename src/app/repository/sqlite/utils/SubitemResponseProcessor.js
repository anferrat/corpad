import { Anode } from "../../../entities/survey/subitems/Anode"
import { PipelineLead } from "../../../entities/survey/subitems/PipelineLead"
import { StatReferenceCell } from "../../../entities/survey/subitems/StatReferenceCell"
import { Coupon } from "../../../entities/survey/subitems/Coupon"
import { Bond } from "../../../entities/survey/subitems/Bond"
import { Isolation } from "../../../entities/survey/subitems/Isolation"
import { Riser } from "../../../entities/survey/subitems/Riser"
import { Structure } from "../../../entities/survey/subitems/Structure"
import { Shunt } from "../../../entities/survey/subitems/Shunt"
import { TestLead } from "../../../entities/survey/subitems/TestLead"
import { SubitemTypes } from "../../../../constants/global"
import { Potential } from "../../../entities/survey/subitems/Potential"
import { AnodeBedAnode } from "../../../entities/survey/subitems/AnodeBedAnode"
import { SoilResistivityLayer } from "../../../entities/survey/subitems/SoilResistivityLayer"
import { Circuit } from "../../../entities/survey/subitems/Circuit"
import { AnodeBed } from "../../../entities/survey/subitems/AnodeBed"
import { SoilResistivity } from "../../../entities/survey/subitems/SoilResistivity"


//DO NOT CHANGE these class methods by itself. they are tightly coupled with queries in subitemRepo. 

export class SubitemResponseProcessor {
    constructor() { }

    generateSubitemDataArray(length, item) {
        /*
Takes output from database response and folds some data into arrays and returs array of subitems where one of the property is an array.
Array properties: 
potentials [] - potentials for most of subitems (PL, AN, RS etc.)
sideA [], sideB [] - side arrays, contain list of ids of subitem (SH, BD, IK)
anodes [] - AnodeBedAnodes array with list of anodes for AB
layers [] = SoilResistivityLayers array for SR subitem
        */
        let result = []
        let savedValue
        for (i = 0; i < length; i++) {
            let value = item(i)
            if (value?.id !== savedValue?.id) {
                if (savedValue)
                    result.push(savedValue)
                savedValue = { ...value, sideA: [], sideB: [], potentials: [], anodes: [], layers: [] }
            }
            if (value.sideAId && value.sideAId !== null)
                savedValue.sideA.push(value.sideAId)
            else
                if (value.sideBId && value.sideBId !== null)
                    savedValue.sideB.push(value.sideBId)
                else if (value.potentialId && value.potentialId !== null) {
                    const { potentialId, potentialTypeId, potentialValue, potentialOldValue, permanentReferenceId, portableReferenceId, potentialUid, id } = value
                    const isPortable = permanentReferenceId === null
                    savedValue.potentials.push(new Potential(potentialId, potentialUid, value.id, potentialValue, potentialTypeId, isPortable ? portableReferenceId : permanentReferenceId, isPortable, potentialOldValue))
                }
                else if (value.anodeId && value.anodeId !== null) {
                    savedValue.anodes.push(new AnodeBedAnode(value.anodeId, value.anodeUid, value.id, value.anodeCurrent, value.anodeWireColor, value.anodeWireGauge))
                }
                else if (value.layerId && value.layerId !== null) {
                    savedValue.layers.push(new SoilResistivityLayer(value.layerId, value.layerUid, value.id, value.spacing, value.resistanceToZero, value.resistanceToNext, value.resistivityToZero, value.resistivityToNext))
                }
            if (i === length - 1) {
                result.push(savedValue)
            }
        }
        return result
    }


    getSubitemFromTableData(data) {
        /*
Takes data form either directly database response or from generateSubitemDataArray and returs subitem based on data recieved. data.type - must always be SubitemType
        */
        switch (data.type) {
            case SubitemTypes.ANODE:
                {
                    const { id, testPointId, uid, name, anodeMaterial, wireGauge, wireColor } = data
                    return new Anode(id, testPointId, uid, name, anodeMaterial, wireGauge, wireColor)
                }
            case SubitemTypes.PIPELINE:
                {
                    const { id, testPointId, uid, name, pipelineId, wireGauge, wireColor } = data
                    return new PipelineLead(id, testPointId, uid, name, pipelineId, wireGauge, wireColor)
                }
            case SubitemTypes.REFERENCE_CELL:
                {
                    const { id, testPointId, uid, name, rcType, wireGauge, wireColor } = data
                    return new StatReferenceCell(id, testPointId, uid, name, rcType, wireGauge, wireColor)
                }
            case SubitemTypes.COUPON:
                {
                    const { id, testPointId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area, oldCurrent } = data
                    return new Coupon(id, testPointId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area, oldCurrent)
                }
            case SubitemTypes.BOND:
                {
                    const { id, testPointId, uid, name, fromAtoB, current, sideA, sideB, oldCurrent } = data
                    return new Bond(id, testPointId, uid, name, fromAtoB, current, sideA, sideB, oldCurrent)
                }
            case SubitemTypes.SHUNT:
                {
                    const { id, testPointId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB, oldVoltageDrop } = data
                    return new Shunt(id, testPointId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB, oldVoltageDrop)
                }
            case SubitemTypes.RISER:
                {
                    const { id, testPointId, uid, name, pipelineId, nps } = data
                    return new Riser(id, testPointId, uid, name, pipelineId, nps)
                }
            case SubitemTypes.ISOLATION:
                {
                    const { id, uid, testPointId, name, fromAtoB, current, isolationType, shorted, sideA, sideB } = data
                    return new Isolation(id, testPointId, uid, name, fromAtoB, isolationType, shorted, current, sideA, sideB)
                }
            case SubitemTypes.STRUCTURE:
                {
                    const { id, testPointId, uid, name, description } = data
                    return new Structure(id, testPointId, uid, name, description)
                }
            case SubitemTypes.TEST_LEAD:
                {
                    const { id, testPointId, uid, name, wireGauge, wireColor } = data
                    return new TestLead(id, testPointId, uid, name, wireGauge, wireColor)
                }
            case SubitemTypes.CIRCUIT:
                {
                    const { id, rectifierId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage, voltageDrop } = data
                    return new Circuit(id, rectifierId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage, voltageDrop)
                }
            case SubitemTypes.ANODE_BED:
                {
                    const { id, rectifierId, uid, name, bedType, enclosureType, materialType, anodes } = data
                    return new AnodeBed(id, rectifierId, uid, name, enclosureType, bedType, materialType, anodes)
                }
            case SubitemTypes.SOIL_RESISTIVITY:
                {
                    const { id, testPointId, uid, name, spacingUnit, resistivityUnit, description, layers } = data
                    return new SoilResistivity(id, testPointId, uid, name, spacingUnit, resistivityUnit, description, layers)
                }
            default: return null
        }
    }


}