export const emptyValueCheck = (value) => {
    if (!value || value === null || value === undefined)
        return '<Empty>'
    else return value
}

export const getDefaultNames = (state, property, subitemIndex) => {
    const isItem = subitemIndex === null || !subitemIndex
    if (state.importData.defaultNames.length !== 0) {
        if (isItem && property === 'name')
            return state.importData.defaultNames.find((n) => n.type === state.importData.itemType).name
        else if (!isItem && property === 'name')
            return state.importData.defaultNames.find((n) => n.type === state.importData.subitems[subitemIndex].subitemType).name
        else return null
    }
    else return null
}

const getParametersData = (parameter) => {
    return {
        fieldIndex: parameter.fieldIndex,
        itemList: parameter.itemList,
        unit: parameter.unit,
        unitList: parameter.unitList,
        importType: parameter.importType,
        parameterType: parameter.parameterType,
        defaultValue: parameter.defaultValue,
        fieldIndexList: parameter.fieldIndexList,
        attributeCount: parameter.attributeMap?.length,
    }
}

export const parameterComparison = (prev, next) => {
    return (
        prev.fieldIndex === next.fieldIndex &&
        prev.unit === next.unit &&
        prev.importType === next.importType &&
        prev.defaultValue === next.defaultValue &&
        prev.fieldIndexList.every((f, i) => f === next.fieldIndexList[i]) &&
        prev.fieldIndexList.length === next.fieldIndexList.length &&
        prev.attributeCount === next.attributeCount
    )
}

export const getData = (state, property, subitemIndex) => {
    const isItem = subitemIndex === null || !subitemIndex
    if (isItem)
        return getParametersData(state.importData.item[property])
    else return getParametersData(state.importData.subitems[subitemIndex][property])
}



export const getDisplayValue = (parameterType, importType, { itemList, defaultValue, fieldIndex, fieldIndexList, fields, defaultName }) => {
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
                if (!itemList)
                    return emptyValue
                else if (defaultValue === null || itemList?.length === 0)
                    return emptyValue
                else
                    return itemList[defaultValue] ?? emptyValue
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

export const genKey = (item, index) => `${item}_${Date.now()}${index}`

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