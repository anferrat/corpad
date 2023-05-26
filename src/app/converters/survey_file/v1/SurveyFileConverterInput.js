import { Pipeline } from "../../../entities/survey/items/Pipeline";
import { Rectifier } from "../../../entities/survey/items/Rectifier";
import { TestPoint } from "../../../entities/survey/items/TestPoint";
import { PotentialType } from "../../../entities/survey/other/PotentialType";
import { ReferenceCell } from "../../../entities/survey/other/ReferenceCell";
import { Survey } from "../../../entities/survey/other/Survey";
import { Circuit } from "../../../entities/survey/subitems/Circuit";
import { Potential } from "../../../entities/survey/subitems/Potential";
import { PipelineSurveyFile } from "../../../entities/survey/survey/PipelineSurveyFile";
import { SurveyFileDataFields } from "../../../../constants/global";

const convertBool = (bool) => bool === null ? null : Boolean(bool)

export class SurveyFileConverterInput {
    constructor(subitemFactory) {
        this.subitemFactory = subitemFactory
    }

    _createTestPoint(dataRow) {
        const [id, uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified] = dataRow
        return new TestPoint(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType)
    }

    _createPipeline(dataRow) {
        const [id, uid, name, nps, material, coating, licenseNumber, timeCreated, timeModified, product, comment] = dataRow
        return new Pipeline(id, uid, name, timeCreated, timeModified, comment, nps, material, convertBool(coating), licenseNumber, product, null)
    }

    _createRectifier(dataRow) {
        const [id, uid, name, location, latitude, longitude, comment, status, timeCreated, timeModified, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent] = dataRow
        return new Rectifier(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent)
    }

    _createPotentialType(dataRow) {
        const [id, uid, name, custom, type] = dataRow
        return new PotentialType(id, uid, name, type)
    }

    _createReferenceCell(dataRow) {
        const [id, uid, rcType, name, mainReference] = dataRow
        return new ReferenceCell(id, uid, rcType, name, convertBool(mainReference))
    }

    _createSurvey(dataRow) {
        const [uid, name, technician] = dataRow
        return new Survey(uid, name, technician)
    }

    _createPotential(dataRow) {
        const [id, subitemId, uid, value, type, unit, portableReferenceId, permanentReferenceId] = dataRow
        const isPortable = portableReferenceId !== null
        const referenceCellId = isPortable ? portableReferenceId : permanentReferenceId
        return new Potential(id, uid, subitemId, value, type, referenceCellId, isPortable)
    }

    _convertSides(data) {
        //sides are converted to object, where keys are subitemId. It then passed along with subitemDataRow to create subitems
        let sides = {}
        data.forEach(dataRow => {
            const [id, sideAId, sideBId, parentId] = dataRow
            if (!sides[parentId])
                sides[parentId] = { sideA: [], sideB: [] }
            if (sideAId !== null)
                sides[parentId].sideA.push(sideAId)
            else
                sides[parentId].sideB.push(sideBId)
        })
        return sides
    }

    _createSubitem(dataRow, sides) {
        const [id, testPointId, uid, type, name, anodeMaterial, wireColor, wireGauge, fromAtoB, current, currentUnit, pipelineId, pipelineCardId, couponType, density, area, description, isolationType, shorted, rcType, nps, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop] = dataRow
        const subitemSides = sides[id] ?? {}
        const { sideA, sideB } = subitemSides
        return this.subitemFactory.execute(id, uid, name, type, testPointId, anodeMaterial, wireGauge, wireColor, convertBool(fromAtoB), current, sideA, sideB, ratioCurrent, ratioVoltage, null, null, null, voltageDrop, pipelineCardId, couponType, density, area, isolationType, convertBool(shorted), pipelineId, rcType, nps, factor, convertBool(factorSelected), description)
    }

    _createCircuit(dataRow) {
        //No need to use factory here, since it is only Circuits
        const [id, uid, name, rectifierId, ratioCurrent, ratioVoltage, voltageDrop, current, voltage, targetMin, targetMax] = dataRow
        return new Circuit(id, rectifierId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage, voltageDrop)
    }


    execute(surveyObject) {

        const { data } = surveyObject
        const sides = this._convertSides(data[SurveyFileDataFields.SIDES])
        const testPoints = data[SurveyFileDataFields.TEST_POINTS].map(this._createTestPoint)
        const rectifiers = data[SurveyFileDataFields.RECTIFIERS].map(this._createRectifier)
        const pipelines = data[SurveyFileDataFields.PIPELINES].map(this._createPipeline)
        const referenceCells = data[SurveyFileDataFields.REFERENCE_CELLS].map(this._createReferenceCell)
        const potentialTypes = data[SurveyFileDataFields.POTENTIAL_TYPES].map(this._createPotentialType)
        const potentials = data[SurveyFileDataFields.POTENTIALS].map(this._createPotential)
        const subitems = [...data[SurveyFileDataFields.CARDS].map(data => this._createSubitem(data, sides)), ...data[SurveyFileDataFields.CIRCUITS].map(this._createCircuit)]
        const survey = this._createSurvey(data[SurveyFileDataFields.SURVEY][0])
        return new PipelineSurveyFile(survey, testPoints, rectifiers, pipelines, potentialTypes, referenceCells, subitems, potentials)
    }
}