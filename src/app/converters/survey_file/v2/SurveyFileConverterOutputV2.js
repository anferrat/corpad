import { SubitemTypes } from "../../../../constants/global"
import { DataFields } from "../../../../constants/survey_file_schema_constants/v2"

export class SurveyfileConverterOutputV2 {
    constructor() {
        this.SURVEY_FILE_VERSION = 2
        this.SURVEY_FILE_TYPE = 'plsv'
    }

    _generateTestPoints(testPoints) {
        return testPoints.map(({ id, uid, name, location, latitude, longitude, comment, status, testPointType, timeCreated, timeModified }) =>
            [id, uid, name, location, latitude, longitude, comment, status, testPointType, timeCreated, timeModified])
    }

    _generatePipelines(pipelines) {
        return pipelines.map(({ id, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product }) =>
            [id, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product])
    }

    _generateRectifiers(rectifiers) {
        return rectifiers.map(({ id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent }) =>
            [id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent])
    }

    _generateSubitems(subitems) {
        return subitems.map((subitem) => {
            const { id, uid, type, parentId, name } = subitem
            switch (type) {
                case SubitemTypes.ANODE: {
                    const { anodeMaterial, wireGauge, wireColor } = subitem
                    return [id, uid, name, type, parentId, anodeMaterial, wireGauge, wireColor]
                }
                case SubitemTypes.BOND: {
                    const { current, fromAtoB, sideA, sideB, prevCurrent } = subitem
                    return [id, uid, name, type, parentId, current, fromAtoB, sideA, sideB, prevCurrent]
                }
                case SubitemTypes.CIRCUIT: {
                    const { ratioCurrent, ratioVoltage, current, voltage, targetMax, targetMin, voltageDrop } = subitem
                    return [id, uid, name, type, parentId, ratioCurrent, ratioVoltage, current, voltage, targetMax, targetMin, voltageDrop]
                }
                case SubitemTypes.COUPON: {
                    const { pipelineCardId, wireColor, wireGauge, couponType, current, density, area, prevCurrent } = subitem
                    return [id, uid, name, type, parentId, pipelineCardId, wireColor, wireGauge, couponType, current, density, area, prevCurrent]
                }
                case SubitemTypes.ISOLATION: {
                    const { fromAtoB, isolationType, shorted, current, sideA, sideB } = subitem
                    return [id, uid, name, type, parentId, fromAtoB, isolationType, shorted, current, sideA, sideB]
                }
                case SubitemTypes.PIPELINE: {
                    const { wireGauge, wireColor, pipelineId } = subitem
                    return [id, uid, name, type, parentId, wireGauge, wireColor, pipelineId]
                }
                case SubitemTypes.REFERENCE_CELL: {
                    const { wireColor, wireGauge, rcType } = subitem
                    return [id, uid, name, type, parentId, wireGauge, wireColor, rcType]
                }
                case SubitemTypes.RISER: {
                    const { pipelineId, nps } = subitem
                    return [id, uid, name, type, parentId, pipelineId, nps]
                }
                case SubitemTypes.SHUNT: {
                    const { factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB, prevVoltageDrop } = subitem
                    return [id, uid, name, type, parentId, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB, prevVoltageDrop]
                }
                case SubitemTypes.STRUCTURE: {
                    const { description } = subitem
                    return [id, uid, name, type, parentId, description]
                }
                case SubitemTypes.TEST_LEAD: {
                    const { wireGauge, wireColor } = subitem
                    return [id, uid, name, type, parentId, wireGauge, wireColor]
                }
                case SubitemTypes.ANODE_BED: {
                    const { enclosureType, bedType, materialType, anodes } = subitem
                    return [id, uid, name, type, parentId, enclosureType, bedType, materialType, this._generateAnodeBedAnodes(anodes)]
                }
                case SubitemTypes.SOIL_RESISTIVITY: {
                    const { spacingUnit, resistivityUnit, comment, layers } = subitem
                    return [id, uid, name, type, parentId, spacingUnit, resistivityUnit, comment, this._generateSoilResistivityLayers(layers)]
                }
                default:
                    return []
            }
        })
    }

    _generateAnodeBedAnodes(anodes) {
        return anodes.map(anode => {
            //old current to be implemented
            const { id, uid, parentId, current, wireColor, wireGauge } = anode
            return [id, uid, parentId, current, wireColor, wireGauge, null]
        })
    }

    _generateSoilResistivityLayers(layers) {
        return layers.map(layer => {
            const { id, uid, parentId, spacing, resistanceToZero, resistanceToNext, resistivityToZero, resistivityToNext } = layer
            return [id, uid, parentId, spacing, resistanceToZero, resistanceToNext, resistivityToZero, resistivityToNext]
        })
    }

    _generatePotentials(potentials) {
        return potentials.map(({ id, uid, subitemId, value, referenceCellId, potentialType, isPortableReference, prevValue }) =>
            [id, uid, subitemId, value, referenceCellId, potentialType, isPortableReference, prevValue, null])
    }

    _generatePotentialTypes(potentialTypes) {
        return potentialTypes.map(({ id, uid, type, name, isAc }) =>
            [id, uid, type, name, isAc])
    }

    _generateReferenceCells(referenceCells) {
        return referenceCells.map(({ id, uid, rcType, name, isMainReference }) =>
            [id, uid, rcType, name, isMainReference])
    }

    _generateAssets(assets) {
        return assets.map(({ id, uid, comment, fileName, mediaType, timeCreated, timeModified, parentType, parentId }) =>
            [id, uid, comment, fileName, mediaType, timeCreated, timeModified, parentType, parentId])
    }

    _generateMapLayers(mapLayers) {
        return mapLayers.map(({ id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, visible }) =>
            [id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, visible])
    }

    _generateSurvey(survey) {
        //array here for potentialType settings (autocreate). To be implemented in future
        const { uid, name, technician } = survey
        return [uid, name, technician, []]
    }

    execute(surveyFile) {
        const { testPoints, pipelines, rectifiers, subitems, mapLayers, assets, potentials, potentialTypes, referenceCells, survey } = surveyFile
        return {
            version: this.SURVEY_FILE_VERSION,
            type: this.SURVEY_FILE_TYPE,
            data: {
                [DataFields.SURVEY]: this._generateSurvey(survey),
                [DataFields.TEST_POINTS]: this._generateTestPoints(testPoints),
                [DataFields.PIPELINES]: this._generatePipelines(pipelines),
                [DataFields.RECTIFIERS]: this._generateRectifiers(rectifiers),
                [DataFields.REFERENCE_CELLS]: this._generateReferenceCells(referenceCells),
                [DataFields.POTENTIAL_TYPES]: this._generatePotentialTypes(potentialTypes),
                [DataFields.MAP_LAYERS]: this._generateMapLayers(mapLayers),
                [DataFields.ASSETS]: this._generateAssets(assets),
                [DataFields.SUBITEMS]: this._generateSubitems(subitems),
                [DataFields.POTENTIALS]: this._generatePotentials(potentials),
            }
        }
    }
}