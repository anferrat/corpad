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
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Potential } from "../../../entities/survey/subitems/Potential"


//DO NOT CHANGE these class methods by itself. they are tightly coupled with queries in subitemRepo. 

export class SubitemResponseProcessor {
    constructor () { }

    generateArrayWithSides(length, item) {
        let result = []
        let savedValue
        for (i = 0; i < length; i++) {
            let value = item(i)
            if (value?.id !== savedValue?.id) {
                if (savedValue)
                    result.push(savedValue)
                savedValue = { ...value, sideA: [], sideB: [] }
            }
            if (value.sideAId !== null)
                savedValue.sideA.push(value.sideAId)
            else
                if (value.sideBId !== null)
                    savedValue.sideB.push(value.sideBId)
            if (i === length - 1) {
                result.push(savedValue)
            }
        }
        return result
    }

    generateSubitemArrayWithSidesAndPotentials(length, item) {
        let result = []
        let savedValue
        for (i = 0; i < length; i++) {
            let value = item(i)
            if (value?.id !== savedValue?.id) {
                if (savedValue)
                    result.push(savedValue)
                savedValue = { ...value, sideA: [], sideB: [], potentials: [] }
            }
            if (value.sideAId !== null)
                savedValue.sideA.push(value.sideAId)
            else
                if (value.sideBId !== null)
                    savedValue.sideB.push(value.sideBId)
                else if (value.potentialId !== null) {
                    const { potentialId, potentialTypeId, potentialValue, permanentReferenceId, portableReferenceId, potentialUid, id } = value
                    const isPortable = permanentReferenceId === null
                    savedValue.potentials.push({
                        id: potentialId,
                        cardId: id,
                        uid: potentialUid,
                        type: potentialTypeId,
                        value: potentialValue,
                        referenceCellId: isPortable ? portableReferenceId : permanentReferenceId,
                        isPortable: isPortable
                    })
                }
            if (i === length - 1) {
                result.push(savedValue)
            }
        }
        return result
    }

    getPotentialsFromTableData(data) {
        return data.potentials.map(({ id, uid, type, value, referenceCellId, isPortable, cardId }) =>
            new Potential(id, uid, cardId, value, type, referenceCellId, isPortable))
    }


    getSubitemFromTableData(data) {
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
                    const { id, testPointId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area } = data
                    return new Coupon(id, testPointId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area)
                }
            case SubitemTypes.BOND:
                {
                    const { id, testPointId, uid, name, fromAtoB, current, sideA, sideB } = data
                    return new Bond(id, testPointId, uid, name, fromAtoB, current, sideA, sideB)
                }
            case SubitemTypes.SHUNT:
                {
                    const { id, testPointId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB } = data
                    return new Shunt(id, testPointId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB)
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
            //Circuits are processed directly in rectifier
            default: return null
        }
    }


}