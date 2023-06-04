import { AreaUnitLabels, CurrentDensityUnitLabels, CurrentUnitLabels, FactorUnitLabels, IsolationShortedLabels, PotentialUnitLabels } from "../../../../../../../../constants/labels"
import { AreaUnits, CurrentDensityUnits, CurrentUnits, ExportSubitemProperties, FactorUnits, PotentialUnits, SubitemTypes } from "../../../../../../../../constants/global"

export class _Subitem {
    constructor() { }

    _formatShuntRatio(ratioCurrent, ratioVoltage) {
        const currentUnit = CurrentUnitLabels[CurrentUnits.AMPS]
        const voltageUnit = PotentialUnitLabels[PotentialUnits.MILIVOLTS]
        if (ratioVoltage !== null || ratioCurrent !== null)
            return `${ratioCurrent !== null ? ratioCurrent : '??'} ${currentUnit} - ${ratioVoltage !== null ? ratioVoltage : '??'} ${voltageUnit}`
        else return undefined
    }

    _formatTarget(min, max) {
        const targetUnit = CurrentUnitLabels[CurrentUnits.AMPS]
        if (min !== null && max !== null)
            return `Min. ${min} ${targetUnit}, Max. ${max} ${targetUnit}`
        else if (min === null && max !== null)
            return `Max. ${max} ${targetUnit}`
        else if (min !== null && max === null)
            return `Min. ${min} ${targetUnit}`
        else return undefined
    }

    _getPropertyValue(subitem, property) {
        switch (property) {
            case ExportSubitemProperties.AREA:
                return subitem.area
            case ExportSubitemProperties.CURRENT:
                return subitem.current
            case ExportSubitemProperties.DENSITY:
                return subitem.density
            case ExportSubitemProperties.FACTOR:
                return subitem.factor
            case ExportSubitemProperties.SHORTED:
                return IsolationShortedLabels[subitem.shorted]
            case ExportSubitemProperties.SHUNT_RATIO:
                return this._formatShuntRatio(subitem.ratioCurrent, subitem.ratioVoltage)
            case ExportSubitemProperties.TARGET:
                return this._formatTarget(subitem.targetMin, subitem.targetMax)
            case ExportSubitemProperties.VOLTAGE:
                return subitem.voltage
            case ExportSubitemProperties.VOLTAGE_DROP:
                return subitem.voltageDrop
            default:
                return ''
        }
    }

    _getPropertyUnit(subitemType, property) { //U can also find default units in entities
        switch (property) {
            case ExportSubitemProperties.AREA:
                return AreaUnitLabels[AreaUnits.CENTIMETER_SQUARE]
            case ExportSubitemProperties.CURRENT:
                if (subitemType === SubitemTypes.COUPON)
                    return CurrentUnitLabels[CurrentUnits.MICRO_AMPS]
                else return CurrentUnitLabels[CurrentUnits.AMPS]
            case ExportSubitemProperties.DENSITY:
                return CurrentDensityUnitLabels[CurrentDensityUnits.AMPS_OVER_METER_SQUARE]
            case ExportSubitemProperties.FACTOR:
                return FactorUnitLabels[FactorUnits.AMPS_OVER_MILIVOLTS]
            case ExportSubitemProperties.VOLTAGE:
                return PotentialUnitLabels[PotentialUnits.VOLTS]
            case ExportSubitemProperties.VOLTAGE_DROP:
                return PotentialUnitLabels[PotentialUnits.MILIVOLTS]
            default:
                return undefined

        }
    }

    execute(subitems, subitemProperties) {
        let subitemIndexCount = {}
        const subitemEntries = subitems.map(subitem => {//Iterate subitems
            return subitemProperties
                .filter(([subitemType]) => subitem.type === subitemType) //filter properties that only applies for current subitem
                .map(([subitemType, property]) => {
                    const unit = this._getPropertyUnit(subitemType, property)

                    //propertyIndex count calculates index of export property if it is used in more than one subitem, kinda lazy but effective
                    const index = subitemIndexCount[subitemType + property]
                    subitemIndexCount[subitemType + property] = subitemIndexCount[subitemType + property] ? subitemIndexCount[subitemType + property] + 1 : 1

                    return {
                        unit: unit,
                        subitemType: subitemType,
                        property: property,
                        typePropertyIndex: index ?? 0,
                        value: this._getPropertyValue(subitem, property) ?? ''
                    }
                    /*
                                        return [
                                            `${SubitemTypeLabels[subitemType]}${index ? `_${index}` : ''} - ${ExportSubitemPropertyLabels[property]}${unit ? `, ${unit}` : ''}`,
                                            this._getPropertyValue(subitem, property) ?? ''
                                        ]
                                        */
                })
        }).flat(1)
        return subitemEntries
    }
}