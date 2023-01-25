import { object, string, number, boolean, array, mixed } from 'yup'
import { PipelineMaterials, PipelineProducts } from '../entities/survey/items/Pipeline'
import { CoarseFineOptions, PowerSources, TapOptions } from '../entities/survey/items/Rectifier'
import { ItemStatuses, ItemTypes, TestPointTypes } from '../entities/survey/items/SurveyItem'
import { DisplayedReadingOptions, PipeDiameters, SortingOptions } from '../entities/survey/other/properties'
import { SubitemTypes } from '../entities/survey/subitems/SubitemData'
import { Error } from "./Error"

export class Validation {
    name = string('Name must be string').matches(/^[-a-zA-Z0-9_.\s() ]*$/, { message: 'Name has invalid format' }).max(40, 'Name must be less than 40 characters').min(1, 'Name must be longer than one character.').trim()
    id = number('Id must be a number').positive('Id must be a positive number').integer('Id must be integer value')
    index = number('Index must be a number').positive('Index must be a positive number').integer('Index must be integer value')
    uid = string('uid must be a string').min(10, 'uid must have at least 10 characters')
    bool = boolean()
    longitude = number('Longitude must be a number').min(-180, 'longitude must larger than -180').max(180, 'Longitude must be smaller than 180').nullable()
    latitude = number().min(-90).max(90).nullable()
    number = number()
    positiveNumber = number().positive()
    timestamp = number().positive().integer()
    location = string().max(80).nullable()
    smallText = string().max(80).nullable()
    comment = string().max(300).nullable()
    testPointType = mixed().oneOf(Object.values(TestPointTypes))
    status = mixed().oneOf(Object.values(ItemStatuses))
    itemType = mixed().oneOf(Object.values(ItemTypes))
    powerSource = mixed().oneOf(Object.values(PowerSources))
    tapSetting = mixed().oneOf(Object.values(TapOptions))
    tapValue = number().min(0).max(100)
    coarseFineValue = mixed().oneOf(Object.values(CoarseFineOptions))
    pipelineProduct = mixed().oneOf(Object.values(PipelineProducts))
    nps = mixed().oneOf(Object.values(PipeDiameters))
    pipeMaterial = mixed().oneOf(Object.values(PipelineMaterials))
    sorting = mixed().oneOf(Object.values(SortingOptions))
    rectifierDisplayedReading = mixed().oneOf(Object.values(DisplayedReadingOptions[ItemTypes.RECTIFIER]))
    testPointDisplayedreading = mixed().oneOf(Object.values(DisplayedReadingOptions[ItemTypes.TEST_POINT]))
    filters = object({
        statusFilter: array().of(this.status).required(),
        testPointTypeFilter: array().of(this.testPointType).required(),
        hideEmptyTestPoints: this.bool.required(),
        readingTypeFilter: array().of(mixed().oneOf(Object.values(SubitemTypes))).required()
    })

    validate(value, schema) {
        try {
            return schema.validateSync(value)
        }
        catch (err) {
            throw new Error('ValidationError', `Invalid data: ${err.message}`, err.message)
        }
    }

    referenceCellRequest(obj) {
        return this.validate(obj,
            object({
                name: this.name.required(),
                rcType: this.index.required()
            }))
    }

    testPointRequest(obj) {
        return this.validate(obj,
            object({
                id: this.id.required(),
                name: this.name.nullable().required(),
                location: this.location,
                latitude: this.latitude,
                longitude: this.longitude,
                comment: this.comment,
                testPointType: this.testPointType.required(),
                status: this.status,
                defaultName: this.name.required('Default name is required'),
            }))
    }

    rectifierRequest(obj) {
        return this.validate(obj,
            object({
                id: this.id.required(),
                name: this.name.nullable().required(),
                location: this.location,
                latitude: this.latitude,
                longitude: this.longitude,
                comment: this.comment,
                status: this.status,
                defaultName: this.name.required('Default name is required'),
                model: this.smallText,
                serialNumber: this.smallText,
                powerSource: this.powerSource,
                acVoltage: this.number,
                acCurrent: this.number,
                tapSetting: this.tapSetting,
                tapValue: this.tapValue,
                tapCoarse: this.coarseFineValue,
                tapFine: this.coarseFineValue,
                maxVoltage: this.number,
                maxCurrent: this.number
            }))
    }

    pipelineRequest(obj) {
        return this.validate(obj,
            object({
                id: this.id.required(),
                name: this.name.nullable().required(),
                comment: this.comment,
                defaultName: this.name.required('Default name is required'),
                coating: this.bool,
                licenseNumber: this.smallText,
                product: this.pipelineProduct,
                nps: this.nps,
                material: this.pipeMaterial
            }))
    }

    property(propertyName, value) {
        if (!this[propertyName])
            throw new Error('InvalidParams', `Property ${propertyName} is not supported.`, 'You trying to access property value that was not defined in the app')
        return this.validate(value, this[propertyName].required())
    }

}