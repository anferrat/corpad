import { ItemTypes } from "../../../constants/global"
import { Error, errors } from "../../utils/Error"

export class ItemConverter {
    constructor(propertyConverter) {
        this.conv = propertyConverter
    }


    execute(row, rowIndex, fields, item, itemType, defaultNames) {
        const { name, location, latitude, longitude, comment, status } = item
        // converts import data into item-like objects for further validation
        try {
            const defaultName = defaultNames[itemType] ?? ''
            switch (itemType) {
                case ItemTypes.TEST_POINT:
                    const { testPointType } = item
                    return {
                        name: this.conv.convertValue(row, fields, name, rowIndex, defaultName),
                        status: this.conv.convertValue(row, fields, status),
                        location: this.conv.convertValue(row, fields, location),
                        latitude: this.conv.convertValue(row, fields, latitude),
                        longitude: this.conv.convertValue(row, fields, longitude),
                        comment: this.conv.convertValue(row, fields, comment),
                        testPointType: this.conv.convertValue(row, fields, testPointType),
                    }
                case ItemTypes.RECTIFIER:
                    const { model, serialNumber, powerSource, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent, tapSetting } = item
                    return {
                        name: this.conv.convertValue(row, fields, name, rowIndex, defaultName),
                        status: this.conv.convertValue(row, fields, status),
                        location: this.conv.convertValue(row, fields, location),
                        latitude: this.conv.convertValue(row, fields, latitude),
                        longitude: this.conv.convertValue(row, fields, longitude),
                        comment: this.conv.convertValue(row, fields, comment),
                        model: this.conv.convertValue(row, fields, model),
                        serialNumber: this.conv.convertValue(row, fields, serialNumber),
                        powerSource: this.conv.convertValue(row, fields, powerSource),
                        tapValue: tapSetting ? this.conv.convertValue(row, fields, tapValue) : null,
                        tapCoarse: !tapSetting ? this.conv.convertValue(row, fields, tapCoarse) : null,
                        tapFine: !tapSetting ? this.conv.convertValue(row, fields, tapFine) : null,
                        maxVoltage: this.conv.convertValue(row, fields, maxVoltage),
                        maxCurrent: this.conv.convertValue(row, fields, maxCurrent),
                        tapSetting: tapSetting ?? 0
                    }
                case ItemTypes.PIPELINE:
                    const { nps, licenseNumber, material, coating, product } = item
                    return {
                        name: this.conv.convertValue(row, fields, name, rowIndex, defaultName),
                        nps: this.conv.convertValue(row, fields, nps),
                        licenseNumber: this.conv.convertValue(row, fields, licenseNumber),
                        material: this.conv.convertValue(row, fields, material),
                        coating: !this.conv.convertValue(row, fields, coating),
                        product: this.conv.convertValue(row, fields, product),
                        comment: this.conv.convertValue(row, fields, comment),
                    }
                default: throw new Error(errors.GENERAL, 'Unknown item type')
            }
        }
        catch (err) {
            return null
        }
    }

}
