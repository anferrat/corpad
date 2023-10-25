import { SubitemTypes } from "../../../../constants/global";
import { DataFields } from "../../../../constants/survey_file_schema_constants/v2";
import { Validation } from "../../../utils/Validation";
import { tuple, mixed, object, array, string } from "yup";

export class SurveyFileContentValidationV2 extends Validation {
    constructor() {
        super()

        this.surveyFileSchemas = {
            [DataFields.ASSETS]: tuple([this.id, this.uid, this.comment, this.fileName, this.mediaType, this.timestamp, this.timestamp, this.itemType, this.id]),
            [DataFields.MAP_LAYERS]: tuple([this.id, this.uid, this.name, this.comment, this.timestamp, this.timestamp, this.strokeColor, this.strokeWidth, this.strokeColor, mixed(), this.bool]),
            [DataFields.PIPELINES]: tuple([this.id, this.uid, this.name, this.timestamp, this.timestamp, this.comment, this.nps, this.pipeMaterial, this.bool, this.smallText, this.pipelineProduct]),
            [DataFields.POTENTIALS]: tuple([this.id, this.uid, this.id, this.number, this.id, this.id, this.bool, this.number, this.timestamp.nullable()]),
            [DataFields.POTENTIAL_TYPES]: tuple([this.id, this.uid, this.permTypes, this.name, this.bool]),
            [DataFields.RECTIFIERS]: tuple([this.id, this.uid, this.name, this.status, this.timestamp, this.timestamp, this.comment, this.location, this.latitude.nullable(), this.longitude.nullable(), this.smallText, this.smallText, this.powerSource, this.positiveNumber, this.positiveNumber, this.tapSetting, this.tapValue, this.coarseFineValue.nullable(), this.coarseFineValue.nullable(), this.number, this.number]),
            [DataFields.REFERENCE_CELLS]: tuple([this.id, this.uid, this.rcType, this.name, this.bool]),
            [DataFields.SURVEY]: tuple([this.uid, this.name, mixed(), array()]),
            [DataFields.TEST_POINTS]: tuple([this.id, this.uid, this.name, this.location, this.latitude.nullable(), this.longitude.nullable(), this.comment, this.status, this.testPointType, this.timestamp, this.timestamp])
        }

        this.anodeBedAnodeSchema = tuple([this.id.nullable(), this.uid.nullable(), this.id, this.number, this.wireColor, this.wireGauge, this.number])
        this.soilResistivityLayerSchema = tuple([this.id.nullable(), this.uid.nullable(), this.id, this.number, this.number, this.number, this.number, this.number])

        this.subitemSchemas = {
            [SubitemTypes.ANODE]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.anodeMaterial, this.wireGauge, this.wireColor]),
            [SubitemTypes.BOND]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.number, this.bool, this.side, this.side, this.number]),
            [SubitemTypes.CIRCUIT]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.number, this.number, this.number, this.number, this.number, this.number, this.number]),
            [SubitemTypes.COUPON]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.pipelineCardId, this.wireColor, this.wireGauge, this.couponType, this.number, this.number, this.number, this.number]),
            [SubitemTypes.ISOLATION]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.bool, this.isolationType, this.bool, this.number, this.side, this.side]),
            [SubitemTypes.PIPELINE]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.wireGauge, this.wireColor, this.pipelineId]),
            [SubitemTypes.REFERENCE_CELL]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.wireGauge, this.wireColor, this.rcType]),
            [SubitemTypes.RISER]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.pipelineId, this.nps]),
            [SubitemTypes.SHUNT]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.number, this.number, this.number, this.bool, this.number, this.number, this.bool, this.side, this.side, this.number]),
            [SubitemTypes.STRUCTURE]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.comment]),
            [SubitemTypes.TEST_LEAD]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.wireGauge, this.wireColor]),
            [SubitemTypes.ANODE_BED]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.anodeBedEnclosure, this.bedType, this.anodeBedMaterial, array().of(this.anodeBedAnodeSchema)]),
            [SubitemTypes.SOIL_RESISTIVITY]: tuple([this.id, this.uid, this.name, this.subitemType, this.id, this.lengthUnit, this.resistivityUnit, this.comment, array().of(this.soilResistivityLayerSchema)])
        }
    }

    validateStructure(obj) {
        return object({
            version: this.id.required(),
            type: string().matches(/(plsv)/),
            data: object({
                ...Object.values(DataFields)
                    .reduce((obj, key) => ({
                        ...obj,
                        [key]: array().of(array())
                    }), {}),
                [DataFields.SURVEY]: this.surveyFileSchemas[DataFields.SURVEY]
            })
        }).isValidSync(obj)
    }

    _validateFieldValues(data) {
        return Object.values(DataFields)
            .every(key => {
                if (key === DataFields.SURVEY)
                    return this.surveyFileSchemas[key].isValidSync(data[key])
                else
                    return data[key]
                        .every(row => {
                            if (key === DataFields.SUBITEMS) {
                                const typeValid = this.subitemType.isValidSync(row[3])
                                if (typeValid) {
                                    try { this.subitemSchemas[row[3]].validateSync(row) }
                                    catch (er) {
                                        console.log(row)
                                        console.log(er)
                                    }
                                    return this.subitemSchemas[row[3]].isValidSync(row)
                                }
                                else {
                                    return typeValid
                                }
                            }
                            else {
                                if (!this.surveyFileSchemas[key].isValidSync(row)) {
                                    try {
                                        this.surveyFileSchemas[key].validateSync(row)
                                    }
                                    catch (er) {
                                    }
                                }
                                return this.surveyFileSchemas[key]
                                    .isValidSync(row)
                            }
                        })
            })
    }

    validateFile(obj) {
        const valid = this.validateStructure(obj)
        if (valid) {
            const fieldValuesValid = this._validateFieldValues(obj.data)
            return {
                valid: true,
                corrupted: !fieldValuesValid,
            }
        }
        else return {
            valid: false,
            corrupted: true
        }
    }

    recoverFile(obj) {
        return object({
            version: this.id.required(),
            type: mixed().is(['plsv']).required(),
            data: object({
                ...Object.values(DataFields)
                    .reduce((obj, key) => ({
                        ...obj,
                        [key]: array().of(array()).compact(v => {
                            if (key === DataFields.SUBITEMS) {
                                const typeValid = this.subitemType.isValidSync(v[3])
                                if (typeValid)
                                    return !this.subitemSchemas[v[3]].isValidSync(v)
                                else return !typeValid
                            }
                            else if (key !== DataFields.SURVEY)
                                return !this.surveyFileSchemas[key].isValidSync(v)
                            else return false
                        }),
                        [DataFields.SURVEY]: this.surveyFileSchemas[DataFields.SURVEY]
                    }), {})
            })
        }).cast(obj)
    }
}