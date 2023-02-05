import { array, mixed, object, tuple } from "yup";
import { PipelineSurveyFile, SurveyFileDataFields } from "../../entities/survey/survey/PipelineSurveyFile";
import { Validation } from "../../utils/Validation";

export class ValidateSurveyFile extends Validation {
    constructor() {
        super()
        this.surveyFileSchemas = {
            [SurveyFileDataFields.TEST_POINTS]: tuple([
                this.id, this.uid, this.name, this.location, this.latitude, this.longitude, this.comment, this.testPointType, this.status, this.timestamp, this.timestamp
            ]),
            [SurveyFileDataFields.SURVEY]: tuple([
                this.uid, this.name, mixed()
            ]),
            [SurveyFileDataFields.RECTIFIERS]: tuple([
                this.id, this.uid, this.name, this.location, this.latitude, this.longitude, this.comment, this.status, this.timestamp, this.timestamp, this.smallText, this.smallText, this.powerSource.nullable(), this.positiveNumber, this.positiveNumber, this.tapSetting, this.tapValue, this.coarseFineValue.nullable(), this.coarseFineValue.nullable(), this.number, this.number
            ]),
            [SurveyFileDataFields.PIPELINES]: tuple([
                this.id, this.uid, this.name, this.nps.nullable(), this.pipeMaterial.nullable(), this.bool.nullable(), this.smallText, this.timestamp, this.timestamp, this.pipelineProduct.nullable(), this.comment
            ]),
            [SurveyFileDataFields.REFERENCE_CELLS]: tuple([
                this.id, this.uid, this.rcType, this.name, this.bool
            ]),
            [SurveyFileDataFields.POTENTIAL_TYPES]: tuple([
                this.id, this.uid, this.name, this.bool, this.permTypes.nullable()
            ]),
            [SurveyFileDataFields.SIDES]: tuple([
                this.id, this.id, this.id, this.id
            ]),
            [SurveyFileDataFields.CIRCUITS]: tuple([
                this.id, this.uid, this.name, this.id, this.number, this.number, this.number, this.number, this.number, this.number, this.number
            ]),
            [SurveyFileDataFields.CARDS]: tuple([
                this.id, this.id, this.uid, this.subitemType, this.name, this.anodeMaterial.nullable(), this.wireColor.nullable(), this.wireGauge.nullable(), this.bool.nullable(), this.number, mixed(), this.id, this.id, this.couponType.nullable(), this.number, this.number, this.smallText, this.isolationType.nullable(), this.bool, this.rcType.nullable(), this.nps, this.number, this.number, this.bool, this.number, this.number
            ]),
        }
    }

    validateStructure(obj) {
        //checks general file structure and version(in future).
        return object({
            version: this.id.required(),
            type: mixed().is('plsv').required(),
            data: object({
                ...Object.keys(PipelineSurveyFile.elements)
                    .reduce((obj, key) => ({
                        ...obj,
                        [key]: array().of(array())
                    }), {}),
                [SurveyFileDataFields.SURVEY]: array().of(array().of(this.surveyFileSchemas[SurveyFileDataFields.SURVEY]))
            })
        }).isValidSync(obj)
    }

    validateFieldValues(data) {
        //checkes every value in data file against field schema
        return Object.keys(data)
            .every(key => data[key]
                .every(row => this.surveyFileSchemas[key]
                    .isValidSync(row)))
    }


    validateFileObject(obj) {
        const valid = validateStructure(obj)
        if (valid) {
            const fieldValuesValid = this.validateFieldValues(obj.data)
            return {
                valid: true,
                corrupted: !fieldValuesValid,
            }
        }
        else return {
            valid: false,
        }
    }

    recoverFieldValues(obj, corrupted) {
        //remove array values that don't pass schema
        if (!corrupted)
            return object({
                version: this.id.required(),
                type: mixed().is(['plsv']).required(),
                data: object({
                    ...Object.keys(PipelineSurveyFile.elements)
                        .reduce((obj, key) => ({
                            ...obj,
                            [key]: array().of(array()).compact(v => !this.surveyFileSchemas[key].isValidSync(v))
                        }), {})
                })
            }).cast(obj)
        else return obj
    }
}