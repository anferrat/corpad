import { SubitemTypes } from "../../../../constants/global";
import { DataFields } from "../../../../constants/survey_file_schema_constants/v2";
import { Pipeline } from "../../../entities/survey/items/Pipeline";
import { Rectifier } from "../../../entities/survey/items/Rectifier";
import { TestPoint } from "../../../entities/survey/items/TestPoint";
import { Asset } from "../../../entities/survey/other/Asset";
import { MapLayer } from "../../../entities/survey/other/MapLayer";
import { PotentialType } from "../../../entities/survey/other/PotentialType";
import { ReferenceCell } from "../../../entities/survey/other/ReferenceCell";
import { Survey } from "../../../entities/survey/other/Survey";
import { Anode } from "../../../entities/survey/subitems/Anode";
import { Bond } from "../../../entities/survey/subitems/Bond";
import { Circuit } from "../../../entities/survey/subitems/Circuit";
import { Coupon } from "../../../entities/survey/subitems/Coupon";
import { Isolation } from "../../../entities/survey/subitems/Isolation";
import { PipelineLead } from "../../../entities/survey/subitems/PipelineLead";
import { Potential } from "../../../entities/survey/subitems/Potential";
import { Riser } from "../../../entities/survey/subitems/Riser";
import { Shunt } from "../../../entities/survey/subitems/Shunt";
import { StatReferenceCell } from "../../../entities/survey/subitems/StatReferenceCell";
import { Structure } from "../../../entities/survey/subitems/Structure";
import { TestLead } from "../../../entities/survey/subitems/TestLead";
import { PipelineSurveyFile } from "../../../entities/survey/survey/PipelineSurveyFile";

export class SurveyFileConverterInputV2 {
    constructor() {
    }

    _convertTestPoints(testPoints) {
        return testPoints.map(([id, uid, name, location, latitude, longitude, comment, status, testPointType, timeCreated, timeModified]) =>
            new TestPoint(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType))
    }

    _convertRectifiers(rectifiers) {
        return rectifiers.map(([id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent]) =>
            new Rectifier(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent))
    }

    _convertPipelines(pipelines) {
        return pipelines.map(([id, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product]) =>
            new Pipeline(id, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product, 0))
    }

    _convertPotentialTypes(potentialTypes) {
        return potentialTypes.map(([id, uid, type, name, isAc]) =>
            new PotentialType(id, uid, name, type, isAc))
    }

    _convertReferenceCells(referenceCells) {
        return referenceCells.map(([id, uid, rcType, name, isMainReference]) =>
            new ReferenceCell(id, uid, rcType, name, isMainReference))
    }

    _convertPotentials(potentials) {
        return potentials.map(([id, uid, subitemId, value, referenceCellId, potentialType, isPortableReference, prevValue]) =>
            new Potential(id, uid, subitemId, value, potentialType, referenceCellId, isPortableReference, prevValue))
    }

    _convertMapLayers(mapLayers) {
        return mapLayers.map(([id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, visible]) =>
            new MapLayer(id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, visible))
    }

    _convertAssets(assest) {
        return assest.map(([id, uid, comment, fileName, mediaType, timeCreated, timeModified, parentType, parentId]) =>
            new Asset(id, uid, comment, fileName, mediaType, timeCreated, timeModified, parentType, parentId))
    }

    _convertSurvey(survey) {
        const [uid, name, technician] = survey
        return new Survey(uid, name, technician)
    }

    _convertSubitems(subitems) {
        return subitems.map(subitem => {
            switch (subitem[3]) {
                case SubitemTypes.ANODE: {
                    const [id, uid, name, type, parentId, anodeMaterial, wireGauge, wireColor] = subitem
                    return new Anode(id, parentId, uid, name, anodeMaterial, wireGauge, wireColor)
                }
                case SubitemTypes.BOND: {
                    const [id, uid, name, type, parentId, current, fromAtoB, sideA, sideB, prevCurrent] = subitem
                    return new Bond(id, parentId, uid, name, fromAtoB, current, sideA, sideB, prevCurrent)
                }
                case SubitemTypes.CIRCUIT: {
                    const [id, uid, name, type, parentId, ratioCurrent, ratioVoltage, current, voltage, targetMax, targetMin, voltageDrop] = subitem
                    return new Circuit(id, parentId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage, voltageDrop)
                }
                case SubitemTypes.COUPON: {
                    const [id, uid, name, type, parentId, pipelineCardId, wireColor, wireGauge, couponType, current, density, area, prevCurrent] = subitem
                    return new Coupon(id, parentId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area, prevCurrent)
                }
                case SubitemTypes.ISOLATION: {
                    const [id, uid, name, type, parentId, fromAtoB, isolationType, shorted, current, sideA, sideB] = subitem
                    return new Isolation(id, parentId, uid, name, fromAtoB, isolationType, shorted, current, sideA, sideB)
                }
                case SubitemTypes.PIPELINE: {
                    const [id, uid, name, type, parentId, wireGauge, wireColor, pipelineId] = subitem
                    return new PipelineLead(id, parentId, uid, name, pipelineId, wireGauge, wireColor)
                }
                case SubitemTypes.REFERENCE_CELL: {
                    const [id, uid, name, type, parentId, wireGauge, wireColor, rcType] = subitem
                    return new StatReferenceCell(id, parentId, uid, name, rcType, wireGauge, wireColor)
                }
                case SubitemTypes.RISER: {
                    const [id, uid, name, type, parentId, pipelineId, nps] = subitem
                    return new Riser(id, parentId, uid, name, pipelineId, nps)
                }
                case SubitemTypes.SHUNT: {
                    const [id, uid, name, type, parentId, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB, prevVoltageDrop] = subitem
                    return new Shunt(id, parentId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB, prevVoltageDrop)
                }
                case SubitemTypes.STRUCTURE: {
                    const [id, uid, name, type, parentId, description] = subitem
                    return new Structure(id, parentId, uid, name, description)
                }
                case SubitemTypes.TEST_LEAD: {
                    const [id, uid, name, type, parentId, wireGauge, wireColor] = subitem
                    return new TestLead(id, parentId, uid, name, wireGauge, wireColor)
                }
                default:
                    return undefined
            }
        })
    }


    execute(surveyObject) {
        const { data } = surveyObject
        const survey = this._convertSurvey(data[DataFields.SURVEY])
        const testPoints = this._convertTestPoints(data[DataFields.TEST_POINTS])
        const rectifiers = this._convertRectifiers(data[DataFields.RECTIFIERS])
        const pipelines = this._convertPipelines(data[DataFields.PIPELINES])
        const referenceCells = this._convertReferenceCells(data[DataFields.REFERENCE_CELLS])
        const potentialTypes = this._convertPotentialTypes(data[DataFields.POTENTIAL_TYPES])
        const mapLayers = this._convertMapLayers(data[DataFields.MAP_LAYERS])
        const subitems = this._convertSubitems(data[DataFields.SUBITEMS])
        const assets = this._convertAssets(data[DataFields.ASSETS])
        const potentials = this._convertPotentials(data[DataFields.POTENTIALS])
        return new PipelineSurveyFile(survey, testPoints, rectifiers, pipelines, potentialTypes, referenceCells, subitems, potentials, assets, mapLayers)
    }
}