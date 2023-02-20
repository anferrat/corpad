export class PropertyConverter {
    constructor () { }

    getValueFromAttributeMap(value = null, attributeMap) {
        let result = null
        for (i = 0; i < attributeMap.length; i++) {
            if (~attributeMap[i].mappedValues.indexOf(value)) {
                result = attributeMap[i].index
                break
            }
        }
        return result
    }

    convertEmptyToNull(value) {
        if (value === '')
            return null
        else return value
    }

    convertValue(row, fields, parameter, rowIndex = null, defaultName = null) {
        const { parameterType, importType, fieldIndex, defaultValue, fieldIndexList, attributeMap, mergeAllowed } = parameter
        if (parameterType === 0) {
            if (importType === 0)
                return this.convertEmptyToNull(defaultValue)
            else if (importType === 1)
                return this.convertEmptyToNull(row[fields[fieldIndex]] ?? null)
            else if (importType === 2)
                if (rowIndex !== null) {
                    const startIndex = defaultValue !== null ? defaultValue : 1
                    return `${defaultName} ${startIndex + rowIndex}`
                }
                else return `${defaultName}`
            else if (importType === 3 && mergeAllowed)
                return fieldIndexList.map(fIndex => `${fields[fIndex]}: ${row[fields[fIndex]] ?? ''}`).join('\n')
            else return null
        }
        else if (parameterType === 1) {
            if (importType === 0)
                return defaultValue
            else if (importType === 1)
                return this.getValueFromAttributeMap(row[fields[fieldIndex]], attributeMap)
            else return null
        }
        else return null
    }

    convertUnit(parameter) {
        const { unit, unitCodeList } = parameter
        return unitCodeList[unit]
    }
}