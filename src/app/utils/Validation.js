import { object, string, number, boolean, array, mixed } from 'yup'
import { PipelineMaterials, PipelineProducts } from '../entities/survey/items/Pipeline'
import { CoarseFineOptions, PowerSources, TapOptions } from '../entities/survey/items/Rectifier'
import { ItemStatuses, ItemTypes, TestPointTypes } from '../entities/survey/items/SurveyItem'
import { AnodeMaterials, CouponTypes, DisplayedReadingOptions, IsolationTypes, ItemPropertyUpdateTypes, PermanentPotentialTypes, PipeDiameters, PotentialUnits, ReferenceCellTypes, SortingOptions, SubitemPropertyUpdateTypes, WireColors, WireGauges } from '../entities/survey/other/properties'
import { SubitemTypes } from '../entities/survey/subitems/Subitem'
import { Error } from "./Error"

export class Validation {
    name = string('Name must be string').matches(/^[-a-zA-Z0-9_.\s() ]*$/, { message: 'Name has invalid format' }).max(40, 'Name must be less than 40 characters').min(1, 'Name must be longer than one character.').trim()
    id = number('Id must be a number').positive('Id must be a positive number').integer('Id must be integer value')
    index = number('Index must be a number').integer('Index must be integer value')
    uid = string('uid must be a string').min(10, 'uid must have at least 10 characters')
    bool = boolean().nullable()
    longitude = number('Longitude must be a number').min(-180, 'longitude must larger than -180').max(180, 'Longitude must be smaller than 180').nullable()
    latitude = number().min(-90).max(90).nullable()
    number = number().nullable()
    positiveNumber = number().positive()
    timestamp = number().positive().integer()
    location = string().max(80).nullable()
    smallText = string().max(80).nullable()
    comment = string().max(300).nullable()
    testPointType = mixed().oneOf(Object.values(TestPointTypes))
    status = mixed().oneOf(Object.values(ItemStatuses)).nullable()
    itemType = mixed().oneOf(Object.values(ItemTypes))
    powerSource = mixed().oneOf(Object.values(PowerSources))
    tapSetting = mixed().oneOf(Object.values(TapOptions))
    tapValue = number().min(0).max(100).nullable()
    coarseFineValue = mixed().oneOf(Object.values(CoarseFineOptions))
    pipelineProduct = mixed().oneOf(Object.values(PipelineProducts))
    nps = mixed().oneOf(Object.values(PipeDiameters))
    pipeMaterial = mixed().oneOf(Object.values(PipelineMaterials))
    sorting = mixed().oneOf(Object.values(SortingOptions))
    rcType = mixed().oneOf(Object.values(ReferenceCellTypes))
    rectifierDisplayedReading = mixed().oneOf(Object.values(DisplayedReadingOptions[ItemTypes.RECTIFIER]))
    testPointDisplayedreading = mixed().oneOf(Object.values(DisplayedReadingOptions[ItemTypes.TEST_POINT]))
    statusFilter = array().of(this.status)
    testPointTypeFilter = array().of(this.testPointType)
    subitemType = mixed().oneOf(Object.values(SubitemTypes))
    readingTypeFilter = array().of(this.subitemType)
    permTypes = mixed().oneOf(Object.values(PermanentPotentialTypes)).nullable()
    anodeMaterial = mixed().oneOf(Object.values(AnodeMaterials))
    wireColor = mixed().oneOf(Object.values(WireColors))
    wireGauge = mixed().oneOf(Object.values(WireGauges))
    couponType = mixed().oneOf(Object.values(CouponTypes))
    isolationType = mixed().oneOf(Object.values(IsolationTypes))
    potentialUnit = mixed().oneOf(Object.values(PotentialUnits))
    subitemPropertyUpdateType = mixed().oneOf(Object.values(SubitemPropertyUpdateTypes))
    itemPropertyUpdateType = mixed().oneOf(Object.values(ItemPropertyUpdateTypes))
    side = array().of(this.id)
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

    property(propertyName, value) {
        if (!this[propertyName])
            throw new Error('InvalidParams', `Property ${propertyName} is not supported.`, 'You trying to access property value that was not defined in the app')
        return this.validate(value, this[propertyName].required())
    }

}