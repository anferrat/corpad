import { SubitemTypeLabels, ItemTypeLabels, ItemTypeLabelsPlural, ReferenceCellCodeLabels } from "../../../../constants/labels"

export const emptyValueCheck = (value) => {
    if (!value || value === null || value === undefined)
        return '<Empty>'
    else return value
}

export const getDefaultNames = (state, property, subitemIndex) => {
    const isItem = subitemIndex === null || subitemIndex === undefined
    if (state.importData.defaultNames.length !== 0) {
        if (isItem && property === 'name')
            return state.importData.defaultNames.find((n) => n.type === state.importData.itemType).name
        else if (!isItem && property === 'name')
            return state.importData.defaultNames.find((n) => n.type === state.importData.subitems[subitemIndex].type).name
        else return null
    }
    else return null
}

const getParametersData = (parameter) => {
    console.log(parameter)
    return {
        fieldIndex: parameter?.fieldIndex,
        itemList: parameter?.itemList,
        itemListLabels: parameter?.itemListLabels,
        unit: parameter?.unit,
        defaultUnitIndex: parameter?.defaultUnitIndex,
        unitList: parameter?.unitList,
        importType: parameter?.importType,
        parameterType: parameter?.parameterType,
        defaultValue: parameter?.defaultValue,
        fieldIndexList: parameter?.fieldIndexList,
        attributeCount: parameter?.attributeMap?.length,
    }
}

export const parameterComparison = (prev, next) => {
    return (
        prev.fieldIndex === next.fieldIndex &&
        prev.importType === next.importType &&
        prev.defaultValue === next.defaultValue &&
        prev.fieldIndexList.every((f, i) => f === next.fieldIndexList[i]) &&
        prev.fieldIndexList.length === next.fieldIndexList.length &&
        prev.attributeCount === next.attributeCount
    )
}

export const getData = (state, property, subitemIndex) => {
    const isItem = subitemIndex === null || subitemIndex === undefined
    if (isItem)
        return getParametersData(state.importData.item[property])
    else return getParametersData(state.importData.subitems[subitemIndex][property])
}



export const getDisplayValue = (parameterType, importType, { itemList, defaultValue, fieldIndex, fieldIndexList, fields, defaultName, itemListLabels }) => {
    const emptyValue = {
        value: '<Empty>',
        empty: true
    }
    const getValue = () => {
        if (parameterType === 0) {
            if (importType === 0)
                if (defaultValue === null)
                    return emptyValue
                else
                    return defaultValue
            else if (importType === 1)
                if (!fields)
                    return emptyValue
                else if (fields?.length === 0)
                    return emptyValue
                else
                    return fields[fieldIndex] ?? emptyValue
            else if (importType === 2)
                return `${defaultName}<index>`
            else if (importType === 3)
                if (!fields)
                    return emptyValue
                else if (fieldIndexList?.length === 0 || fields?.length === 0)
                    return emptyValue
                else
                    if (fieldIndexList.length === 1)
                        return fields[fieldIndexList[0]] ?? emptyValue
                    else return `${fields[fieldIndexList[0]]} & ${fieldIndexList.length - 1} more` ?? emptyValue
            else return emptyValue
        }
        else if (parameterType === 1) {
            if (importType === 0)
                if (!itemListLabels)
                    return emptyValue
                else if (defaultValue === null)
                    return emptyValue
                else
                    return itemListLabels[defaultValue] ?? emptyValue
            else if (importType === 1)
                if (!fields)
                    return emptyValue
                else if (fields?.length === 0)
                    return emptyValue
                else
                    return fields[fieldIndex] ?? emptyValue
        }
        else return emptyValue
    }

    const result = getValue()

    if (result === emptyValue)
        return emptyValue
    else return ({
        value: result,
        empty: false
    })
}

export const getAccessory = (parameterType, importType, accessoryList, defaultValue) => {
    if (parameterType === 1 && importType === 0 && accessoryList && defaultValue !== null)
        return accessoryList[defaultValue] ?? null
    else return null
}

export const getPreviewList = (data, fields, fieldIndex, fieldIndexList, importType) => {
    const NUMBER_OF_ELEMENTS = 5
    if (importType === 1) {
        return (data.filter((_, i) => i < NUMBER_OF_ELEMENTS)).map(dataRow => dataRow[fields[fieldIndex]]) ?? []
    }
    else if (importType === 3) {
        return data.filter((_, i) => i < NUMBER_OF_ELEMENTS).map(dataRow => fieldIndexList.map(fieldIndex => dataRow[fields[fieldIndex]] ?? null).filter(v => v !== null).join(', '))
    }
    else return []
}

export const showItemValue = (item) => (item === undefined || item === '' || item === null) ? '<Empty>' : item.trim()

export const getButtonTitle = (itemType) => {
    switch (itemType) {
        case 'TEST_POINT':
            return 'Add reading'
        case 'RECTIFIER':
            return 'Add circuit'
        default:
            return 'Add'
    }
}

export const getItemName = (itemType, count = null) => {
    const text = count === 1 ? ItemTypeLabels[itemType] : ItemTypeLabelsPlural[itemType]
    if (!text)
        return count === 1 ? 'item' : 'items'
    else return text.toLowerCase()
}

export const getPotentialsData = (autoCreate, potentialTypes, referenceCellTypes) => {
    const autoTypes = ['PERM_ON', 'PERM_OFF']
    if (!autoCreate)
        return {
            autoCreate: autoCreate,
            init: []
        }
    else {
        return {
            autoCreate: autoCreate,
            init: autoTypes.map(type => [potentialTypes.findIndex(pt => pt.type === type), referenceCellTypes.findIndex(rc => rc.isMainReference)])
                .filter(p => p[0] !== -1 && p[1] !== -1)
        }
    }
}

export const getSubitemType = (state, index, isNew) => {
    if (isNew)
        return state.importData.subitems[state.importData.subitems.length - 1]?.type
    else return state.importData.subitems[index]?.type
}

export const getSubitemProperty = (state, subitemIndex, property) => {
    const errorValue = (property === 'potentials' ? [] : null)
    if (subitemIndex !== null)
        if (state.importData.subitems[subitemIndex])
            return state.importData.subitems[subitemIndex][property] ?? errorValue
        else return errorValue
    else return errorValue

}

export const getTypedIndex = (subitems, subitemIndex) => {
    //finds index of subitem within subitems of the same type
    const subitemType = subitems[subitemIndex]?.type
    const subitemKey = subitems[subitemIndex]?.key
    if (subitemType && subitemKey) {
        const subIndex = subitems
            .filter(s => s.type === subitemType)
            .findIndex(s => s.key === subitemKey)
        return subIndex === -1 ? null : subIndex + 1
    }
    else return null
}

export const getSubitemName = (subitemType, typedIndex) => {
    const label = SubitemTypeLabels[subitemType]
    return label ? `${label} ${typedIndex}` : 'Error'
}

export const getSideIcon = (fromAtoB) => {
    if (fromAtoB === null)
        return {
            name: 'IK',
            pack: 'cp'
        }
    else if (fromAtoB)
        return {
            name: 'arrow-forward-outline'
        }
    else
        return {
            name: 'arrow-back-outline'
        }
}

export const getItemIcon = (itemType) => {
    if (itemType = 'TEST_POINT')
        return 'TSS'
    else if (itemType === 'RECTIFIER')
        return 'RT'
    else if (itemType === 'PIPELINE')
        return 'PL'
    else return null
}

export const getTextByWarningType = (warning) => {
    switch (warning?.warningCode) {
        case 'testPointTypeMismatch':
            return 'Test point type was not defined. Default test point type is set.'
        case 'subitemConverter':
        case 'subitemValidator':
            const label = SubitemTypeLabels[warning?.type] ?? '??'
            return `"${label}" cannot be created from provided data.`
        case 'nameFormat':
            return `Name property ${warning?.originalValue} was converted to ${warning?.convertedValue}`
        case 'statusMismatch':
            return 'Status is not defined. Unknown status was set.'
        case 'stringLengthMax40':
        case 'stringLengthMax80':
        case 'stringLengthMax300':
            return `Value of property " ${warning?.property} " is too long and was cropped to a maximum allowed length.`
        default:
            return 'Some values may be invalid and were converted to null'
    }
}

export const getDefaultUnit = (unitList, defaultUnitIndex, extraData=[], referenceCellIndex = undefined) => {
    if (unitList.length === 0)
        return null
    else
        if (referenceCellIndex !== undefined) {
            const base = unitList[extraData?.defaultPotentialUnit] ?? unitList[0]
            const rcType = extraData.referenceCellList[referenceCellIndex]?.rcType ?? 0
            const sub = ReferenceCellCodeLabels[rcType]
            return {
                main: base,
                script: sub,
                format: 'sub'
            }
        }
        else {
            //convertion last digit to superscript for display purposes, not ideal, but it's just easy
            const unit = unitList[defaultUnitIndex]
            if (unit) {
                if (!isNaN(unit[unit.length - 1]))
                    return {
                        main: unit.slice(0,unit.length - 1),
                        format: 'super',
                        script: unit.slice(-1)
                    }
                else return unit
            }
            else return null
        }
}