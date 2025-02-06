import { CurrentUnits, MultimeterCurrentRanges, MultimeterModes, MultimeterReadingTypes, MultimeterToggleStatuses, MultimeterVoltageRanges, PotentialUnits } from "../../../../../../constants/global"

export class ModalReadingConverter {
    constructor(unitConverter) {
        this.unitConverter = unitConverter
    }

    _getConverter(type) {
        if (type === MultimeterReadingTypes.CURRENT)
            return this.unitConverter.convertAmps
        else if (type === MultimeterReadingTypes.VOLTAGE)
            return this.unitConverter.convertVolts
        else return (v) => v //just returns itself
    }

    _convertReading(reading, mode, range, toggleStatus) {
        const newUnit = this._getUnit(mode, range, toggleStatus)
        const converter = this._getConverter(reading.type)
        const newValue = converter(reading.value, reading.unit, newUnit)
        reading.setValue(newValue)
        reading.setUnit(newUnit)
    }

    _getUnit(mode, range, toggleStatus) {
        switch (mode) {
            case MultimeterModes.POKIT.DC_VOLTS:
            case MultimeterModes.POKIT.AC_VOLTS:
            case MultimeterModes.DVM2130.DC_VOLTS:
            case MultimeterModes.DVM2130.AC_VOLTS:
                if (range === MultimeterVoltageRanges.POKIT._250MV)
                    return PotentialUnits.MILIVOLTS
                else return PotentialUnits.VOLTS
            case MultimeterModes.POKIT.DC_AMPS:
            case MultimeterModes.POKIT.AC_AMPS:
                if ([MultimeterCurrentRanges.POKIT._500uA, MultimeterCurrentRanges.POKIT._2mA, MultimeterCurrentRanges.POKIT._10mA].includes(range) || toggleStatus === MultimeterToggleStatuses.POKIT.SMALL_CURRENT && range === MultimeterCurrentRanges.POKIT.AUTO)
                    return CurrentUnits.MILI_AMPS
                else return CurrentUnits.AMPS
        }
    }


    execute(reading, mode, range, toggleStatus) {
        const newUnit = this._getUnit(mode, range, toggleStatus) ?? reading.unit
        const converter = this._getConverter(reading.type)
        const newValue = converter(reading.value, reading.unit, newUnit, 3)
        reading.setValue(newValue)
        reading.setUnit(newUnit)
    }
}