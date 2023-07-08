import { object, string, number, boolean, array, mixed } from 'yup'
import { SubitemTypes, PipelineMaterials, PipelineProducts, CoarseFineOptions, PowerSources, TapOptions, ItemStatuses, ItemTypes, TestPointTypes, AnodeMaterials, CalculatorTypes, CouponTypes, DisplayedReadingOptions, IsolationTypes, ItemPropertyUpdateTypes, PermanentPotentialTypes, PipeDiameters, PotentialUnits, ReferenceCellTypes, SortingOptions, SubitemPropertyUpdateTypes, WireColors, WireGauges, MultimeterTypes, MultimeterSyncModes, MultimeterCycles } from '../../constants/global'
import { Error, errors } from "./Error"

export class Validation {
    name = string('nameString').matches(/^[-a-zA-Z0-9_.\s() ]*$/, { message: 'nameFormat' }).max(40, 'stringLengthMax40').min(1, 'stringLengthMin').trim()
    id = number('Id must be a number').positive('Id must be a positive number').integer('Id must be integer value')
    index = number('Index must be a number').integer('Index must be integer value')
    uid = string('uid must be a string').min(10, 'uid must have at least 10 characters')
    bool = boolean().nullable()
    longitude = number('numberValue').min(-180, 'numberValue').max(180, 'numberValue').nullable()
    latitude = number().min(-90, 'numberValue').max(90, 'numberValue').nullable()
    number = number().nullable().typeError('numberFormat')
    positiveNumber = number().positive().nullable()
    timestamp = number().positive().integer()
    location = string().max(80, 'stringLengthMax80').nullable()
    smallText = string().max(80, 'stringLengthMax80').nullable()
    comment = string().max(300, 'stringLengthMax300').nullable()
    testPointType = mixed().oneOf(Object.values(TestPointTypes), 'testPointTypeMismatch')
    status = mixed().oneOf(Object.values(ItemStatuses)).nullable()
    itemType = mixed().oneOf(Object.values(ItemTypes))
    powerSource = mixed().oneOf([...Object.values(PowerSources), null]).nullable()
    tapSetting = mixed().oneOf([...Object.values(TapOptions), null]).nullable()
    tapValue = number().min(0).max(100).nullable()
    coarseFineValue = mixed().oneOf([...Object.values(CoarseFineOptions), null]).nullable()
    pipelineProduct = mixed().oneOf([...Object.values(PipelineProducts), null]).nullable()
    nps = mixed().oneOf([...Object.values(PipeDiameters), null]).nullable()
    pipeMaterial = mixed().oneOf([...Object.values(PipelineMaterials), null]).nullable()
    sorting = mixed().oneOf(Object.values(SortingOptions))
    rcType = mixed().oneOf([...Object.values(ReferenceCellTypes), null]).nullable()
    rectifierDisplayedReading = mixed().oneOf(Object.values(DisplayedReadingOptions[ItemTypes.RECTIFIER]))
    testPointDisplayedreading = mixed().oneOf(Object.values(DisplayedReadingOptions[ItemTypes.TEST_POINT]))
    statusFilter = array().of(this.status)
    testPointTypeFilter = array().of(this.testPointType)
    subitemType = mixed().oneOf(Object.values(SubitemTypes))
    readingTypeFilter = array().of(this.subitemType)
    permTypes = mixed().oneOf([...Object.values(PermanentPotentialTypes), null]).nullable()
    anodeMaterial = mixed().oneOf([...Object.values(AnodeMaterials), null], 'typeMismatch').nullable()
    wireColor = mixed().oneOf([...Object.values(WireColors), null]).nullable()
    wireGauge = mixed().oneOf([...Object.values(WireGauges), null]).nullable()
    couponType = mixed().oneOf([...Object.values(CouponTypes), null]).nullable()
    isolationType = mixed().oneOf([...Object.values(IsolationTypes), null]).nullable()
    potentialUnit = mixed().oneOf(Object.values(PotentialUnits))
    subitemPropertyUpdateType = mixed().oneOf(Object.values(SubitemPropertyUpdateTypes))
    itemPropertyUpdateType = mixed().oneOf(Object.values(ItemPropertyUpdateTypes))
    calculatorType = mixed().oneOf(Object.values(CalculatorTypes))
    multimeterType = mixed().oneOf(Object.values(MultimeterTypes))
    multimeterSyncMode = mixed().oneOf(Object.values(MultimeterSyncModes))
    multimeterFirstCycle = mixed().oneOf(Object.values(MultimeterCycles))
    side = array().of(this.id)
    validate(value, schema) {
        try {
            return schema.validateSync(value)
        }
        catch (err) {
            throw new Error(errors.VALIDATION, `Invalid data: ${err.message}`, err)
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
            throw new Error(errors.VALIDATION, `Property ${propertyName} is not supported.`, 'You trying to access property value that was not defined in the app')
        return this.validate(value, this[propertyName].required())
    }

}