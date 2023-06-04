import { CoarseFineOptionLabels, TapOptionLabels, PipelineMaterialLabels, PipeDiameterLabels, PipelineProductLabels, StatusLabels, TestPointTypeLabels } from "../../../../../../../../constants/labels"
import { ExportItemProperties, TapOptions } from "../../../../../../../../constants/global"

export class _Item {
    constructor() { }

    _formatDate(timestamp) {
        const t = new Date(timestamp)
        if (timestamp && !isNaN(timestamp) && timestamp > 0 && t) {
            return t.getFullYear() + '/'
                + ("0" + (t.getMonth() + 1)).slice(-2) + '/'
                + ("0" + t.getDate()).slice(-2) + ' '
                + ("0" + t.getHours()).slice(-2) + ':'
                + ("0" + t.getMinutes()).slice(-2)
        }
        else return 'Time error'
    }

    _formatRectifierOutput(setting, value, coarse, fine) {
        if (setting === TapOptions.COARSE_FINE)
            return `C${CoarseFineOptionLabels[coarse] ?? '?'} - F${CoarseFineOptionLabels[fine] ?? '?'}`
        else if (setting === TapOptions.RESISTOR)
            return value !== null ? value + ' %' : ''
        else if (setting === TapOptions.AUTO)
            return TapOptionLabels[TapOptions.AUTO]
        else return ''
    }

    _formatValue(value) {
        return value === null || value === undefined ? '' : value
    }


    _getPropertyValue(item, property) {
        switch (property) {
            case ExportItemProperties.NAME:
                return item.name
            case ExportItemProperties.COMMENT:
                return item.comment
            case ExportItemProperties.LATITUDE:
                return item.latitude
            case ExportItemProperties.LONGITUDE:
                return item.longitude
            case ExportItemProperties.LICENSE_NUMBER:
                return item.licenseNumber
            case ExportItemProperties.LOCATION:
                return item.location
            case ExportItemProperties.MATERIAL:
                return PipelineMaterialLabels[item.material]
            case ExportItemProperties.MAX_VOLTAGE:
                return item.maxVoltage
            case ExportItemProperties.MAX_CURRENT:
                return item.maxCurrent
            case ExportItemProperties.MODEL:
                return item.model
            case ExportItemProperties.NPS:
                return PipeDiameterLabels[item.nps]
            case ExportItemProperties.PRODUCT:
                return PipelineProductLabels[item.product]
            case ExportItemProperties.SERIAL_NUMBER:
                return item.serialNumber
            case ExportItemProperties.STATUS:
                return StatusLabels[item.status]
            case ExportItemProperties.TEST_POINT_TYPE:
                return TestPointTypeLabels[item.testPointType]
            case ExportItemProperties.TIME_MODIFIED:
                return this._formatDate(item.timeModified)
            case ExportItemProperties.RECTIFIER_OUTPUT:
                return this._formatRectifierOutput(item.tapSetting, item.tapValue, item.tapCoarse, item.tapFine)
            default:
                return ''
        }
    }

    execute(item, itemProperties) {
        const properties = Object.values(ExportItemProperties).filter(property => ~itemProperties.indexOf(property))
        const itemEntries = properties.map(property => {
            return {
                property,
                value: this._formatValue(this._getPropertyValue(item, property))
            }
        })
        return itemEntries
    }
}