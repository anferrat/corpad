
import { TestPointTypeLabels, StatusLabels, PowerSourceLabels, CoarseFineOptionLabels, PipelineCoatingLabels, PipeDiameterLabels, PipelineMaterialLabels, PipelineProductLabels, WireColorLabels, WireGaugeLabels, AnodeMaterialLabels, IsolationTypeLabels, ReferenceCellTypeLabels, AreaUnitLabels, CurrentUnitLabels, CurrentDensityUnitLabels, PotentialUnitLabels, CouponTypeLabels, FactorUnitLabels, IsolationShortedLabels } from '../../../constants/labels'
import { TestPointTypes, ItemStatuses, PowerSources, CoarseFineOptions, PipelineCoating, PipeDiameters, PipelineMaterials, PipelineProducts, WireColors, WireGauges, AnodeMaterials, IsolationTypes, ReferenceCellTypes, AreaUnits, CurrentUnits, CurrentDensityUnits, PotentialUnits, CouponTypes, FactorUnits, IsolationShorted } from '../../../constants/global'
import IdGen from '../../../helpers/id_generator'

/*
getParameter - storing import data parameters for importing a single property. 
*/
const getParameter = ({
    parameterType = 0, //0 - result value is text string, 1- result value is integer that corresponds to a value from predifined array (itemList) for this property
    importType = 1, // - 0 - defaultValue is used for this property (index of itemList in case of parameterType 1 and string if parameterType 0), 1 - use values from a field in csv file, 2 - use default name (name property only), 3 - use multiple field data from csv combined into single string (mergeAllowed flag must be true)
    fieldIndex = null, // - index of fields array from csv data to import from when importType 1
    mergeAllowed = false, // indicates in importType 3 is allowed for this property
    itemList = [], // list of items to select from, when parameterType 1
    itemListLabels = {},
    defaultValue = null, // default value when importType 0, stores string when parametertype 0, or index when parameterType 1. When importType 2 - stores first index for default name values
    fieldIndexList = [], //list of field indexes from csb file when mergeAllowed and importType 3
    valid = true, // flag to check if defaultValue passed validation for this prop (importType 0)
    unit = 0, // unitIndex from unitList when importType 1, in order to convert values to correct units
    unitList = [], //unitList that can be used for this property (displayed labels). used for display purposes
    unitCodeList = [], // actual unit values (int number) that corrspond to unit labels in unitList. Used in app for conversion
    defaultUnitIndex = 0, //shows which unit from the unitList is the one used to store data in DB
    attributeMap = [], //list of mapped attributes. Attribute matches index from itemList to indexes of values from a field in csv file. when importing value indexes will be converted to index from itemlist. (parameterType 1, importType 1)
}) => ({
    parameterType: parameterType,
    importType: importType,
    itemList: itemList,
    itemListLabels: itemListLabels,
    unit: unit,
    unitList: unitList,
    unitCodeList: unitCodeList,
    defaultUnitIndex: defaultUnitIndex,
    defaultValue: defaultValue,
    fieldIndex: fieldIndex,
    fieldIndexList: fieldIndexList,
    valid: valid,
    attributeMap: attributeMap,
    mergeAllowed: mergeAllowed,
})

const getWireProps = () => ({
    wireColor: getParameter({ parameterType: 1, itemList: Object.values(WireColors), itemListLabels: WireColorLabels }),
    wireGauge: getParameter({ parameterType: 1, itemList: Object.values(WireGauges), itemListLabels: WireGaugeLabels }),
})

const getNameProps = (type) => ({
    type: type,
    key: IdGen(),
    name: getParameter({ importType: 2 }),
})

const getPotentials = (autoCreate = false, initialPotentials = []) => {
    if (autoCreate)
        return {
            potentials: initialPotentials.map(init => getPotentialParameter(init[0], init[1]))
        }
    else return {
        potentials: []
    }
}

const getSides = (fromAtoB = true) => ({
    sideA: [],
    sideB: [],
    fromAtoB: fromAtoB,
})

export const getItem = (itemType) => {
    switch (itemType) {
        case 'TEST_POINT':
            return {
                name: getParameter({ importType: 2 }),
                testPointType: getParameter({ parameterType: 1, itemList: Object.values(TestPointTypes), itemListLabels: TestPointTypeLabels, importType: 0, defaultValue: TestPointTypes.TEST_STATION }),
                location: getParameter({ mergeAllowed: true }),
                latitude: getParameter({}),
                longitude: getParameter({}),
                comment: getParameter({ mergeAllowed: true }),
                status: getParameter({ parameterType: 1, itemList: Object.values(ItemStatuses).filter((status) => status !== ItemStatuses.NO_STATUS), itemListLabels: StatusLabels, importType: 0, defaultValue: ItemStatuses.UNKNOWN })
            }
        case 'RECTIFIER':
            return {
                name: getParameter({ importType: 2 }),
                location: getParameter({ mergeAllowed: true }),
                latitude: getParameter({}),
                longitude: getParameter({}),
                comment: getParameter({ mergeAllowed: true }),
                status: getParameter({ parameterType: 1, itemList: Object.values(ItemStatuses).filter((status) => status !== ItemStatuses.NO_STATUS), itemListLabels: StatusLabels, importType: 0, defaultValue: ItemStatuses.UNKNOWN }),
                model: getParameter({ mergeAllowed: true }),
                serialNumber: getParameter({}),
                powerSource: getParameter({ parameterType: 1, itemList: Object.values(PowerSources), itemListLabels: PowerSourceLabels }),
                tapSetting: 0,
                tapValue: getParameter({}),
                tapCoarse: getParameter({ parameterType: 1, itemList: Object.values(CoarseFineOptions), itemListLabels: CoarseFineOptionLabels }),
                tapFine: getParameter({ parameterType: 1, itemList: Object.values(CoarseFineOptions), itemListLabels: CoarseFineOptionLabels }),
                maxVoltage: getParameter({ unitList: [PotentialUnitLabels[PotentialUnits.VOLTS]], unitCodeList: [PotentialUnits.VOLTS], defaultUnitIndex: 0, unit: 0 }),
                maxCurrent: getParameter({ unitList: [CurrentUnitLabels[CurrentUnits.AMPS]], unitCodeList: [CurrentUnits.APMS], defaultUnitIndex: 0, unit: 0 }),
            }
        case 'PIPELINE':
            return {
                name: getParameter({ importType: 2 }),
                nps: getParameter({ parameterType: 1, itemList: Object.values(PipeDiameters), itemListLabels: PipeDiameterLabels }),
                licenseNumber: getParameter({}),
                material: getParameter({ parameterType: 1, itemList: Object.values(PipelineMaterials), itemListLabels: PipelineMaterialLabels }),
                coating: getParameter({ parameterType: 1, itemList: Object.values(PipelineCoating), itemListLabels: PipelineCoatingLabels, defaultValue: 0, importType: 0 }),
                product: getParameter({ parameterType: 1, itemList: Object.values(PipelineProducts), itemListLabels: PipelineProductLabels }),
                comment: getParameter({ mergeAllowed: true }),
            }
        default: return null
    }
}

export const getSubitem = (type, autoCreatePotentials = false, initialPotentials = []) => {
    switch (type) {
        case 'PL':
            return {
                ...getNameProps(type),
                ...getWireProps(),
                ...getPotentials(autoCreatePotentials, initialPotentials),
                pipelineIndex: null

            }
        case 'AN':
            return {
                ...getNameProps(type),
                ...getWireProps(),
                ...getPotentials(autoCreatePotentials, initialPotentials),
                anodeMaterial: getParameter({ parameterType: 1, itemList: Object.values(AnodeMaterials), itemListLabels: AnodeMaterialLabels }),
            }
        case 'BD':
            return {
                ...getNameProps(type),
                ...getSides(),
                current: getParameter({ unitList: [CurrentUnitLabels[CurrentUnits.MILI_AMPS], CurrentUnitLabels[CurrentUnits.AMPS]], defaultUnitIndex: 1, unit: 1, unitCodeList: [CurrentUnits.MILI_AMPS, CurrentUnits.AMPS] })
            }
        case 'CN':
            return {
                ...getNameProps(type),
                pipelineCardKey: null,
                couponType: getParameter({ parameterType: 1, itemList: Object.values(CouponTypes), itemListLabels: CouponTypeLabels }),
                area: getParameter({ unitList: [AreaUnitLabels[AreaUnits.CENTIMETER_SQUARE], AreaUnitLabels[AreaUnits.METER_SQUARE]], unitCodeList: [AreaUnits.CENTIMETER_SQUARE, AreaUnits.METER_SQUARE], defaultUnitIndex: 0, unit: 0 }),
                current: getParameter({ unitList: [CurrentUnitLabels[CurrentUnits.MICRO_AMPS], CurrentUnitLabels[CurrentUnits.MILI_AMPS]], defaultUnitIndex: 0, unit: 0, unitCodeList: [CurrentUnits.MICRO_AMPS, CurrentUnits.MILI_AMPS] }),
                density: getParameter({ unitList: [CurrentDensityUnitLabels[CurrentDensityUnits.AMPS_OVER_CM_SQUARE], CurrentDensityUnitLabels[CurrentDensityUnits.AMPS_OVER_METER_SQUARE], CurrentDensityUnitLabels[CurrentDensityUnits.MILI_AMPS_OVER_CM_SQUARE], CurrentDensityUnitLabels[CurrentDensityUnits.MILI_AMPS_OVER_METER_SQUARE]], defaultUnitIndex: 1, unit: 1, unitCodeList: [CurrentDensityUnits.AMPS_OVER_CM_SQUARE, CurrentDensityUnits.AMPS_OVER_METER_SQUARE, CurrentDensityUnits.MILI_AMPS_OVER_CM_SQUARE, CurrentDensityUnits.MILI_AMPS_OVER_METER_SQUARE] }),
                ...getWireProps(),
                ...getPotentials(autoCreatePotentials, initialPotentials)
            }
        case 'FC':
            return {
                ...getNameProps(type),
                ...getPotentials(autoCreatePotentials, initialPotentials),
            }
        case 'IK':
            return {
                ...getNameProps(type),
                ...getSides(null),
                current: getParameter({ unitList: [CurrentUnitLabels[CurrentUnits.MILI_AMPS], CurrentUnitLabels[CurrentUnits.AMPS]], defaultUnitIndex: 1, unit: 1, unitCodeList: [CurrentUnits.MILI_AMPS, CurrentUnits.AMPS] }),
                shorted: getParameter({ parameterType: 1, itemList: Object.values(IsolationShorted), itemListLabels: IsolationShortedLabels }),
                isolationType: getParameter({ parameterType: 1, itemList: Object.values(IsolationTypes), itemListLabels: IsolationTypeLabels }),
            }
        case 'OT':
            return {
                ...getNameProps(type),
                ...getPotentials(autoCreatePotentials, initialPotentials),
                ...getWireProps(),
            }
        case 'RS':
            return {
                ...getNameProps(type),
                nps: getParameter({ parameterType: 1, itemList: Object.values(PipeDiameters), itemListLabels: PipeDiameterLabels }),
                ...getPotentials(autoCreatePotentials, initialPotentials),
                pipelineIndex: null
            }
        case 'RE':
            return {
                ...getNameProps(type),
                rcType: getParameter({ parameterType: 1, itemList: Object.values(ReferenceCellTypes), itemListLabels: ReferenceCellTypeLabels }),
                ...getWireProps(),
                ...getPotentials(autoCreatePotentials, initialPotentials),
            }
        case 'SH':
            {
                const factorUnits = Object.values(FactorUnits)
                return {
                    ...getNameProps(type),
                    ...getSides(),
                    factor: getParameter({ unitCodeList: factorUnits, defaultUnitIndex: 0, unit: 0, unitList: factorUnits.map(unit => FactorUnitLabels[unit]) }),
                    voltageDrop: getParameter({ unitList: [PotentialUnitLabels[PotentialUnits.MILIVOLTS]], unitCodeList: [PotentialUnits.MILIVOLTS], defaultUnitIndex: 0, unit: 0 }),
                    current: getParameter({ unitList: [CurrentUnitLabels[CurrentUnits.MILI_AMPS], CurrentUnitLabels[CurrentUnits.AMPS]], defaultUnitIndex: 1, unit: 1, unitCodeList: [CurrentUnits.MILI_AMPS, CurrentUnits.AMPS] }),
                }
            }
        case 'CT':
            return {
                ...getNameProps(type),
                current: getParameter({ unitList: [CurrentUnitLabels[CurrentUnits.AMPS]], unitCodeList: [CurrentUnits.AMPS], unit: 0, defaultUnitIndex: 0 }),
                targetMin: getParameter({ unitList: [CurrentUnitLabels[CurrentUnits.AMPS]], unitCodeList: [CurrentUnits.AMPS], unit: 0, defaultUnitIndex: 0 }),
                targetMax: getParameter({ unitList: [CurrentUnitLabels[CurrentUnits.AMPS]], unitCodeList: [CurrentUnits.AMPS], unit: 0, defaultUnitIndex: 0 }),
                voltage: getParameter({ unitList: [PotentialUnitLabels[PotentialUnits.VOLTS]], unitCodeList: [PotentialUnits.VOLTS], unit: 0, defaultUnitIndex: 0 })
            }
    }
}

export const getAttribute = ({ index, mappedIndexes, mappedValues }) => ({
    index,
    mappedIndexes,
    mappedValues,
})

export const getPotentialParameter = (potentialTypeIndex, referenceCellIndex) => ({
    ...getParameter({ unitList: [PotentialUnitLabels[PotentialUnits.NEGATIVE_MILIVOLTS], PotentialUnitLabels[PotentialUnits.MILIVOLTS], PotentialUnitLabels[PotentialUnits.VOLTS], PotentialUnitLabels[PotentialUnits.NEGATIVE_VOLTS]], defaultUnitIndex: 2, unit: 2, unitCodeList: [PotentialUnits.NEGATIVE_MILIVOLTS, PotentialUnits.MILIVOLTS, PotentialUnits.VOLTS, PotentialUnits.NEGATIVE_VOLTS] }),
    createIfEmpty: true, // when false, potential will not be created if value is null. Not implemented for now
    potentialTypeIndex,
    referenceCellIndex
})