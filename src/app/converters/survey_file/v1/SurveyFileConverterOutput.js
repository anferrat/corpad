import { SubitemTypes, SurveyFileDataFields } from "../../../../constants/global"

const convertBool = (bool) => bool === null || bool === undefined ? null : Number(bool)

export class SurveyFileConverterOutput {
    constructor() {
        this.SURVEY_FILE_VERSION = 1
        this.SURVEY_FILE_TYPE = 'plsv'
    }


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
        return [id, uid, name, nps, material, convertBool(coating), licenseNumber, timeCreated, timeModified, product, comment]
    }

    _presentPotentialType(potentialType) {
        const { id, uid, type, name } = potentialType
        //#4 element is always 0
        return [id, uid, name, 0, type]
    }

    _presentReferenceCell(referenceCell) {
        const { id, uid, rcType, name, isMainReference } = referenceCell
        return [id, uid, rcType, name, convertBool(isMainReference)]
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
        return [id, parentId, uid, type, name, anodeMaterial ?? null, wireColor ?? null, wireGauge ?? null, convertBool(fromAtoB), current ?? null, null, pipelineId ?? null, pipelineCardId ?? null, couponType ?? null, density ?? null, area ?? null, description ?? null, isolationType ?? null, convertBool(shorted), rcType ?? null, nps ?? null, ratioCurrent ?? null, ratioVoltage ?? null, convertBool(factorSelected), factor ?? null, voltageDrop ?? null]
    }

    _presentSurvey(survey) {
        const { uid, name, technician } = survey
        return [[uid, name, technician]]
    }

    _presentList(list, presentFunction) {
        return list.map(element => presentFunction(element))
    }

    execute(surveyFile) {
        const { testPoints, rectifiers, pipelines, subitems, potentialTypes, potentials, survey, referenceCells } = surveyFile

        const cards = subitems.filter(({ type }) => type !== SubitemTypes.CIRCUIT)
        const circuits = subitems.filter(({ type }) => type === SubitemTypes.CIRCUIT)
        return {
            version: this.SURVEY_FILE_VERSION,
            type: this.SURVEY_FILE_TYPE,
            data: {
                [SurveyFileDataFields.SURVEY]: this._presentSurvey(survey),
                [SurveyFileDataFields.TEST_POINTS]: this._presentList(testPoints, this._presentTestPoint),
                [SurveyFileDataFields.RECTIFIERS]: this._presentList(rectifiers, this._presentRectifier),
                [SurveyFileDataFields.PIPELINES]: this._presentList(pipelines, this._presentPipeline),
                [SurveyFileDataFields.POTENTIAL_TYPES]: this._presentList(potentialTypes, this._presentPotentialType),
                [SurveyFileDataFields.REFERENCE_CELLS]: this._presentList(referenceCells, this._presentReferenceCell),
                [SurveyFileDataFields.CARDS]: this._presentList(cards, this._presentCard),
                [SurveyFileDataFields.POTENTIALS]: this._presentList(potentials, this._presentPotential),
                [SurveyFileDataFields.CIRCUITS]: this._presentList(circuits, this._presentCircuit),
                [SurveyFileDataFields.SIDES]: this._presentSides(cards)
            }
        }
    }
}