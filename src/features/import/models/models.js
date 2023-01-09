import { testPointTypes, statusInfo, powerSourceList, tapOptions, pipeCoating, pipeDiameterList, pipeMaterials, pipeProducts, wireColorList, wireGaugesList, anodeMaterialList, isolationAssemblyTypes, referenceCellTypes, areaUnits, currentUnits, currentDensityUnits, potentialUnits, couponTypes, factorUnits } from '../../../constants/constants'
import { npsList } from '../../../constants/thicknessTable'
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
    defaultValue = null, // default value when importType 0, stores string when parametertype 0, or index when parameterType 1
    fieldIndexList = [], //list of field indexes from csb file when mergeAllowed and importType 3
    valid = true, // flag to check if defaultValue passed validation for this prop (importType 0)
    unit = 0, // unitIndex from unitList when importType 1, in order to convert values to correct units
    unitList = [], //unitList that can be used for this property
    defaultUnitIndex = 0, //shows which unit from the unitList is the one used to store data in DB
    attributeMap = [], //list of mapped attributes. Attribute matches index from itemList to indexes of values from a field in csv file. when importing value indexes will be converted to index from itemlist. (parameterType 1, importType 1)
}) => ({
    parameterType: parameterType,
    importType: importType,
    itemList: itemList,
    unit: unit,
    unitList: unitList,
    defaultUnitIndex: defaultUnitIndex,
    defaultValue: defaultValue,
    fieldIndex: fieldIndex,
    fieldIndexList: fieldIndexList,
    valid: valid,
    attributeMap: attributeMap,
    mergeAllowed: mergeAllowed,
})

const getWireProps = () => ({
    wireColor: getParameter({ parameterType: 1, itemList: wireColorList.map(w => w.title) }),
    wireGauge: getParameter({ parameterType: 1, itemList: wireGaugesList }),
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
                testPointType: getParameter({ parameterType: 1, itemList: testPointTypes }),
                location: getParameter({ mergeAllowed: true }),
                latitude: getParameter({}),
                longitude: getParameter({}),
                comment: getParameter({ mergeAllowed: true }),
                status: getParameter({ parameterType: 1, itemList: statusInfo.map(s => s.title) })
            }
        case 'RECTIFIER':
            return {
                name: getParameter({ importType: 2 }),
                location: getParameter({ mergeAllowed: true }),
                latitude: getParameter({}),
                longitude: getParameter({}),
                comment: getParameter({ mergeAllowed: true }),
                status: getParameter({ parameterType: 1, itemList: statusInfo.map(s => s.title) }),
                model: getParameter({ mergeAllowed: true }),
                serialNumber: getParameter({}),
                powerSource: getParameter({ parameterType: 1, itemList: powerSourceList }),
                tapValue: getParameter({}),
                tapCoarse: getParameter({ parameterType: 1, itemList: tapOptions }),
                tapFine: getParameter({ parameterType: 1, itemList: tapOptions }),
                maxVoltage: getParameter({ unitList: [potentialUnits[3]] }),
                maxCurrent: getParameter({ unitList: [currentUnits[1]] }),
            }
        case 'PIPELINE':
            return {
                name: getParameter({ importType: 2 }),
                nps: getParameter({ parameterType: 1, itemList: npsList }),
                licenseNumber: getParameter({}),
                material: getParameter({ parameterType: 1, itemList: pipeMaterials }),
                coating: getParameter({ parameterType: 1, itemList: pipeCoating, defaultValue: 0, importType: 0 }),
                product: getParameter({ parameterType: 1, itemList: pipeProducts }),
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
                pipelineId: null

            }
        case 'AN':
            return {
                ...getNameProps(type),
                ...getWireProps(),
                ...getPotentials(autoCreatePotentials, initialPotentials),
                anodeMaterial: getParameter({ parameterType: 1, itemList: anodeMaterialList }),
            }
        case 'BD':
            return {
                ...getNameProps(type),
                ...getSides(),
                current: getParameter({ unitList: [currentUnits[1], currentUnits[2]], defaultUnitIndex: 1, unit: 1 })
            }
        case 'CN':
            return {
                ...getNameProps(type),
                pipelineCardKey: null,
                couponType: getParameter({ parameterType: 1, itemList: couponTypes }),
                area: getParameter({ unitList: areaUnits, defaultUnitIndex: 0 }),
                current: getParameter({ unitList: [currentUnits[0], currentUnits[1]], defaultUnitIndex: 0, unit: 0 }),
                density: getParameter({ unitList: currentDensityUnits, defaultUnitIndex: 2 }),
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
                current: getParameter({ unitList: [currentUnits[2], currentUnits[1]], defaultUnitIndex: 0, unit: 0 }),
                shorted: getParameter({ parameterType: 1, itemList: ['No', 'Yes'] }),
                isolationType: getParameter({ parameterType: 1, itemList: isolationAssemblyTypes }),
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
                nps: getParameter({ parameterType: 1, itemList: pipeDiameterList }),
                ...getPotentials(autoCreatePotentials, initialPotentials),
                pipelineId: null
            }
        case 'RE':
            return {
                ...getNameProps(type),
                rcType: getParameter({ parameterType: 1, itemList: referenceCellTypes }),
                ...getWireProps(),
                ...getPotentials(autoCreatePotentials, initialPotentials),
            }
        case 'SH':
            return {
                ...getNameProps(type),
                ...getSides(),
                factor: getParameter({ unitList: factorUnits, defaultUnitIndex: 0, unit: 0 }),
                voltageDrop: getParameter({ unitList: [potentialUnits[1]] }),
                current: getParameter({ unitList: [currentUnits[1], currentUnits[2]], defaultUnitIndex: 1, unit: 1 }),
            }
        case 'CT':
            return {
                ...getNameProps(type),
                current: getParameter({ unitList: [currentUnits[2]] }),
                targetMin: getParameter({ unitList: [currentUnits[2]] }),
                targetMax: getParameter({ unitList: [currentUnits[2]] }),
                voltage: getParameter({ unitList: [potentialUnits[3]] })
            }
    }
}

export const getAttribute = ({ index, mappedIndexes }) => ({
    index,
    mappedIndexes,
})

export const getPotentialParameter = (potentialTypeIndex, referenceCellIndex) => ({
    ...getParameter({ unitList: potentialUnits, defaultUnitIndex: 3 }),
    potentialTypeIndex,
    referenceCellIndex
})