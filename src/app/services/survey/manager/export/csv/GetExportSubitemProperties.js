import { ItemTypes, SubitemTypes, ExportSubitemProperties } from "../../../../../../constants/global";
import { Error, errors } from "../../../../../utils/Error";

export class GetExportSubitemProperties {
    constructor() {
    }

    execute(itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return [
                    {
                        type: SubitemTypes.COUPON,
                        properties: [
                            ExportSubitemProperties.CURRENT,
                            ExportSubitemProperties.AREA,
                            ExportSubitemProperties.DENSITY
                        ]
                    },
                    {
                        type: SubitemTypes.SHUNT,
                        properties: [
                            ExportSubitemProperties.SHUNT_RATIO,
                            ExportSubitemProperties.FACTOR,
                            ExportSubitemProperties.VOLTAGE_DROP,
                            ExportSubitemProperties.CURRENT
                        ]
                    },
                    {
                        type: SubitemTypes.BOND,
                        properties: [
                            ExportSubitemProperties.CURRENT
                        ]
                    },
                    {
                        type: SubitemTypes.ISOLATION,
                        properties: [
                            ExportSubitemProperties.CURRENT,
                            ExportSubitemProperties.SHORTED
                        ]
                    }
                ]
            case ItemTypes.RECTIFIER:
                return [
                    {
                        type: SubitemTypes.CIRCUIT,
                        properties: [
                            ExportSubitemProperties.CURRENT,
                            ExportSubitemProperties.VOLTAGE,
                            ExportSubitemProperties.TARGET
                        ]
                    }
                ]
            default: throw new Error(errors.GENERAL, `No properties for type ${itemType}`)
        }
    }
}