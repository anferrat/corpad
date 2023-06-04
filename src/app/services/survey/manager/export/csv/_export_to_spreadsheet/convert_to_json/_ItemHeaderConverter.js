import { ExportItemProperties } from "../../../../../../../../constants/global";
import { ExportItemPropertyLabels } from "../../../../../../../../constants/labels";

export class _ItemHeaderConverter {
    constructor() {
        this.itemPropertyOrder = [ExportItemProperties.NAME, ExportItemProperties.TEST_POINT_TYPE, ExportItemProperties.TIME_MODIFIED, ExportItemProperties.STATUS, ExportItemProperties.LOCATION, ExportItemProperties.LATITUDE, ExportItemProperties.LONGITUDE, ExportItemProperties.RECTIFIER_OUTPUT, ExportItemProperties.MODEL, ExportItemProperties.LICENSE_NUMBER, ExportItemProperties.NPS, ExportItemProperties.SERIAL_NUMBER, ExportItemProperties.MATERIAL, ExportItemProperties.PRODUCT, ExportItemProperties.MAX_CURRENT, ExportItemProperties.MAX_VOLTAGE, ExportItemProperties.COMMENT]
    }

    execute(exportedValues) {
        return {
            list: this._convertItemPropertyValues(exportedValues),
            headers: this._getItemPropertyHeaders(exportedValues),
        }
    }

    _generateHeaderLabel(property) {
        return ExportItemPropertyLabels[property]
    }

    _getItemPropertyHeaders(exportedValues) {
        //generates array of keys (property labels) and sorts them in the order
        const headers = exportedValues[0].item.map(({ property }) => property)
        headers.sort((a, b) => {
            const indexA = this.itemPropertyOrder.indexOf(a)
            const indexB = this.itemPropertyOrder.indexOf(b)
            return indexA - indexB
        })
        return headers.map(property => this._generateHeaderLabel(property))
    }

    _convertItemPropertyValues(exportedValues) {
        //generates list of objects, object per item, where each property is property label, and value is value
        return exportedValues.map(({ item }) => {
            const itemValues = {}
            item.forEach(({ property, value }) => {
                itemValues[this._generateHeaderLabel(property)] = value
            })
            return itemValues
        })
    }
}