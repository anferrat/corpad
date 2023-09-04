import { array, mixed, object, tuple, string } from "yup";
import { SurveyFileDataFields } from "../../../../constants/survey_file_schema_constants/v1"
import { Validation } from "../../../utils/Validation";

export class SurveyFileContentValidationV1 extends Validation {
    constructor() {
        super()
        this.booleanNumber = mixed().oneOf([0, 1, null]).nullable()
        this.surveyFileSchemas = {
            [SurveyFileDataFields.TEST_POINTS]: tuple([
                this.id, this.uid, this.name, this.location, this.latitude, this.longitude, this.comment, this.testPointType, this.status, this.timestamp, this.timestamp
            ]),
            [SurveyFileDataFields.SURVEY]: tuple([
                this.uid, this.name, mixed()
            ]),
            [SurveyFileDataFields.RECTIFIERS]: tuple([
                this.id, this.uid, this.name, this.location, this.latitude, this.longitude, this.comment, this.status, this.timestamp, this.timestamp, this.smallText, this.smallText, this.powerSource, this.positiveNumber, this.positiveNumber, this.tapSetting, this.tapValue, this.coarseFineValue.nullable(), this.coarseFineValue.nullable(), this.number, this.number
            ]),
            [SurveyFileDataFields.PIPELINES]: tuple([
                this.id, this.uid, this.name, this.nps.nullable(), this.pipeMaterial.nullable(), this.booleanNumber, this.smallText, this.timestamp, this.timestamp, this.pipelineProduct.nullable(), this.comment
            ]),
            [SurveyFileDataFields.REFERENCE_CELLS]: tuple([
                this.id, this.uid, this.rcType, this.name, this.booleanNumber
            ]),
            [SurveyFileDataFields.POTENTIAL_TYPES]: tuple([
                this.id, this.uid, this.name, mixed().nullable(), this.permTypes
            ]),
            [SurveyFileDataFields.SIDES]: tuple([
                this.id.nullable(), this.id.nullable(), this.id.nullable(), this.id
            ]),
            [SurveyFileDataFields.CIRCUITS]: tuple([
                this.id, this.uid, this.name, this.id, this.number, this.number, this.number, this.number, this.number, this.number, this.number
            ]),
            [SurveyFileDataFields.CARDS]: tuple([
                this.id, this.id, this.uid, this.subitemType, this.name, this.anodeMaterial.nullable(), this.wireColor.nullable(), this.wireGauge.nullable(), this.booleanNumber, this.number, mixed().nullable(), this.id.nullable(), this.id.nullable(), this.couponType.nullable(), this.number, this.number, this.smallText, this.isolationType.nullable(), this.booleanNumber, this.rcType.nullable(), this.nps, this.number, this.number, this.booleanNumber, this.number, this.number
            ]),
            [SurveyFileDataFields.POTENTIALS]: tuple([
                this.id, this.id, this.uid, this.number, this.id, mixed().nullable(), this.id.nullable(), this.id.nullable()
            ])
        }
    }

    validateStructure(obj) {
        //checks general file structure and version.
        return object({
            version: this.id.required(),
            type: string().matches(/(plsv)/),
            data: object({
                ...Object.values(SurveyFileDataFields)
                    .reduce((obj, key) => ({
                        ...obj,
                        [key]: array().of(array())
                    }), {}),
                [SurveyFileDataFields.SURVEY]: array().of(this.surveyFileSchemas[SurveyFileDataFields.SURVEY])
            })
        }).isValidSync(obj)
    }

    _validateFieldValues(data) {
        return Object.values(SurveyFileDataFields)
            .every(key => data[key]
                .every(row => {
                    /* if (!this.surveyFileSchemas[key].isValidSync(row))
                         console.log('table ', key, `values: ${row}`)
                     */
                    return this.surveyFileSchemas[key]
                        .isValidSync(row)
                }))
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
        //remove array values that don't pass schema
        return object({
            version: this.id.required(),
            type: mixed().is(['plsv']).required(),
            data: object({
                ...Object.values(SurveyFileDataFields)
                    .reduce((obj, key) => ({
                        ...obj,
                        [key]: array().of(array()).compact(v => !this.surveyFileSchemas[key].isValidSync(v))
                    }), {})
            })
        }).cast(obj)
    }
}