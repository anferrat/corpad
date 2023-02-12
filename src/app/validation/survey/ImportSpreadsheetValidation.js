import { Validation } from "../../utils/Validation";
import { object, array } from 'yup'
import { ItemTypes } from "../../entities/survey/items/SurveyItem";

export class ImportSpreadsheetValidation extends Validation {
    contructor() {
        super()
    }

    getValueFromAttributeMap(index, attributeMap) {
        let result = null
        for (i = 0; i < attributeMap.length; i++) {
            if (~attributeMap[i].mappedIndexes.indexOf(index)) {
                result = attributeMap[i].index
                break
            }
        }
        return result
    }

    getPropertyValue(row, fields, parameter, rowIndex = null, defaultName = null) {
        const { parameterType, importType, fieldIndex, defaultValue, fieldIndexList, attributeMap, mergeAllowed } = parameter
        if (parameterType === 0) {
            if (importType === 0)
                return defaultValue
            else if (importType === 1)
                return row[fields[fieldIndex]] ?? null
            else if (importType === 2)
                return `${defaultName} ${defaultValue + rowIndex}`
            else if (importType === 3 && mergeAllowed)
                return fieldIndexList.map(fIndex => row[fields[fIndex]] ?? null).join(', ')
            else return null
        }
        else if (parameterType === 1) {
            if (importType === 0)
                return defaultValue
            else if (importType === 2)
                return this.getValueFromAttributeMap(fieldIndex, attributeMap)
            else return null
        }
        else return null
    }

    convertItem(row, rowIndex, fields, item, itemType, defaultNames) {
        const { name, location, latitude, longitude, comment, status } = item
        // converts import data into item-like objects for further validation
        const defaultName = defaultNames[itemType] ?? null
        const itemType = this.itemType.validateAsync(data.itemType)
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                const { testPointType } = item
                return {
                    name: this.getPropertyValue(row, fields, name, rowIndex, defaultName),
                    status: this.getPropertyValue(row, fields, status),
                    location: this.getPropertyValue(row, fields, location),
                    latitude: this.getPropertyValue(row, fields, latitude),
                    longitude: this.getPropertyValue(row, fields, longitude),
                    comment: this.getPropertyValue(row, fields, comment),
                    testPointType: this.getPropertyValue(row, fields, testPointType),
                }
            case ItemTypes.RECTIFIER:
                const { model, serialNumber, powerSource, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent } = item
                return {
                    name: this.getPropertyValue(row, fields, name, rowIndex, defaultName),
                    status: this.getPropertyValue(row, fields, status),
                    location: this.getPropertyValue(row, fields, location),
                    latitude: this.getPropertyValue(row, fields, latitude),
                    longitude: this.getPropertyValue(row, fields, longitude),
                    comment: this.getPropertyValue(row, fields, comment),
                    model: this.getPropertyValue(row, fields, model),
                    serialNumber: this.getPropertyValue(row, fields, serialNumber),
                    powerSource: this.getPropertyValue(row, fields, powerSource),
                    tapValue: this.getPropertyValue(row, fields, tapValue),
                    tapCoarse: this.getPropertyValue(row, fields, tapCoarse),
                    tapFine: this.getPropertyValue(row, fields, tapFine),
                    maxVoltage: this.getPropertyValue(row, fields, maxVoltage),
                    maxCurrent: this.getPropertyValue(row, fields, maxCurrent)
                }
            case ItemTypes.PIPELINE:
                const { nps, licenseNumber, material, coating, product } = item
                return {
                    name: this.getPropertyValue(row, fields, name, rowIndex, defaultName),
                    nps: this.getPropertyValue(row, fields, nps),
                    licenseNumber: this.getPropertyValue(row, fields, licenseNumber),
                    material: this.getPropertyValue(row, fields, material),
                    coating: this.getPropertyValue(row, fields, coating),
                    product: this.getPropertyValue(row, fields, product),
                    comment: this.getPropertyValue(row, fields, comment),
                }
        }
    }
}
