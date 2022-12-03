import { sendRequest } from "../../../api/database/index"
import fieldValidation from "../../../helpers/validation"
import idGen from '../../../helpers/id_generator'


export const genRequestObject = (data, fields, item, itemImportedProperties) => {
    const timeNow = Date.now()
    return data.map((row, rowIndex) => {
        const importedProperties = Object.keys(itemImportedProperties).map(property => {
            const value = row[fields[itemImportedProperties[property]]] ?? null
            const validation = fieldValidation(value, property === 'name' ? 'name_not_empty' : property)
            return {
                property: property,
                valid: validation.valid,
                value: validation.valid ? validation.value : (property === 'name' ? `Row ${rowIndex}` : null),
                invalidValue: value
            }
        })
        return ({
            requestObject: {
                ...item,
                ...Object.fromEntries(importedProperties.map(property => [property.property, property.value])),
                timeModified: timeNow,
                timeCreated: timeNow,
                uid: idGen(),
            },
            failedProperties: importedProperties.filter(property => !property.valid)
        })
    })
}

export const importData = async (requestObject, itemType) => {
    return await sendRequest('INSERT', itemType, requestObject)
}

export const emptyValueCheck = (value) => {
    if (!value || value === null || value === undefined)
        return '<Empty>'
    else return value
}
