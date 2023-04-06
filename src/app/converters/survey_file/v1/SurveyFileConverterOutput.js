import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"

export class SurveyFileConverterInput {
    constructor() { }

    _presentTestPoint(testPoint) {
        const { id, uid, name, location, latitude, longitude, comment, status, testPointType, timeCreated, timeModified } = testPoint
        return [id, uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified]
    }

    _presentRectifier(rectifier) {
        const { id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent } = rectifier
        return [id, uid, name, location, latitude, longitude, comment, status, timeCreated, timeModified, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent]
    }

    _presentPipeline(pipeline) {
        const { id, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product } = pipeline
        return [id, uid, name, nps, material, coating, licenseNumber, timeCreated, timeModified, product, comment]
    }

    _presentPotentialType(potentialType) {
        const { id, uid, type, name } = potentialType
        return [id, uid, name, null, type]
    }

    _presentReferenceCell(referenceCell) {
        const { id, uid, rcType, name, isMainReference } = referenceCell
        return [id, uid, rcType, name, isMainReference]
    }

    _presentPotential(potential) {
        const { id, uid, subitemId, value, referenceCellId, potentialType, isPortableReference } = potential
        const portableReferenceId = isPortableReference ? referenceCellId : null
        const permanentReferenceId = !isPortableReference ? referenceCellId : null
        return [id, subitemId, uid, value, potentialType, null, portableReferenceId, permanentReferenceId]
    }

    _presentSides(subitems) {
        const subitemsWithSides = subitems.filter(({ sideA, sideB }) => sideA && sideB && (sideA.length > 0 || sideB.length > 0))
        const sides = []
        subitemsWithSides.forEach(({ id, sideA, sideB }) => {
            sideA.forEach(sideAId => sides.push([null, sideAId, null, id]))
            sideB.forEach(sideBId => sides.push([null, null, sideBId, id]))
        })
        return sides
    }

    _presentCircuit(circuit) {
        const { id, parentId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage, voltageDrop } = circuit
        return [id, uid, name, parentId, ratioCurrent, ratioVoltage, voltageDrop, current, voltage, targetMin, targetMax]
    }

    _presentCard(subitem) {
        const { id, parentId, uid, type, name, anodeMaterial, wireColor, wireGauge, fromAtoB, current, pipelineId, pipelineCardId, couponType, density, area, description, isolationType, shorted, rcType, nps, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop } = subitem
        return [id, parentId, uid, type, name, anodeMaterial ?? null, wireColor ?? null, wireGauge ?? null, fromAtoB ?? null, current ?? null, null, pipelineId ?? null, pipelineCardId ?? null, couponType ?? null, density ?? null, area ?? null, description ?? null, isolationType ?? null, shorted ?? null, rcType ?? null, nps ?? null, ratioCurrent ?? null, ratioVoltage ?? null, factorSelected ?? null, factor ?? null, voltageDrop ?? null]
    }

    _presentSurvey(survey) {
        const { uid, name, technician } = survey
        return [[uid, name, technician]]
    }

    execute(pipelineSurveyFile) {

    }
}