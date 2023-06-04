import { ItemTypes, ExportItemProperties } from "../../../../../../constants/global";
import { Error, errors } from "../../../../../utils/Error";

export class GetExportItemProperties {
    constructor() {
    }

    execute(itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return [
                    ExportItemProperties.NAME,
                    ExportItemProperties.TEST_POINT_TYPE,
                    ExportItemProperties.STATUS,
                    ExportItemProperties.TIME_MODIFIED,
                    ExportItemProperties.LOCATION,
                    ExportItemProperties.LATITUDE,
                    ExportItemProperties.LONGITUDE,
                    ExportItemProperties.COMMENT,
                ]
            case ItemTypes.RECTIFIER:
                return [
                    ExportItemProperties.NAME,
                    ExportItemProperties.RECTIFIER_OUTPUT,
                    ExportItemProperties.STATUS,
                    ExportItemProperties.TIME_MODIFIED,
                    ExportItemProperties.LOCATION,
                    ExportItemProperties.LATITUDE,
                    ExportItemProperties.LONGITUDE,
                    ExportItemProperties.MODEL,
                    ExportItemProperties.SERIAL_NUMBER,
                    ExportItemProperties.MAX_VOLTAGE,
                    ExportItemProperties.MAX_CURRENT,
                    ExportItemProperties.COMMENT
                ]
            case ItemTypes.PIPELINE:
                return [
                    ExportItemProperties.NAME,
                    ExportItemProperties.TIME_MODIFIED,
                    ExportItemProperties.MATERIAL,
                    ExportItemProperties.NPS,
                    ExportItemProperties.LICENSE_NUMBER,
                    ExportItemProperties.PRODUCT,
                    ExportItemProperties.COMMENT
                ]
            default: throw new Error(errors.GENERAL, `No such item type ${itemType}`)
        }
    }
}