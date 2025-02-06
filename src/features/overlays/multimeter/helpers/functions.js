import { convertAmps, convertVolts } from "../../../../app/controllers/survey/other/ConverterController"
import { CurrentUnits, MultimeterModes, MultimeterReadingTypes, PotentialUnits } from "../../../../constants/global"

const convertReadingValue = (unit, type, value) => {
    if (type === MultimeterReadingTypes.CURRENT)
        return convertAmps({ value, inputUnit: unit, outputUnit: CurrentUnits.AMPS }).response
    else if (type === MultimeterReadingTypes.VOLTAGE)
        return convertVolts({ value, inputUnit: unit, outputUnit: PotentialUnits.VOLTS }).response
    else
        return value
}

export const updateReading = (state, reading, xMax) => {
    const newHistory = state.history.concat({
        x: xMax,
        y: convertReadingValue(reading.unit, reading.type, reading.value),
        timestamp: reading.deviceTimestamp
    })
    let cutoffIndex = 0
    for (let i = 0; i < newHistory.length; i++) {
        if (reading.deviceTimestamp - newHistory[i].timestamp < xMax) {
            cutoffIndex = i
            break
        }
    }
    newHistory.splice(0, cutoffIndex)
    return {
        last: reading,
        history: newHistory.map(({ x, y, timestamp }) => ({
            x: reading.deviceTimestamp - timestamp,
            y,
            timestamp
        }))
    }
}

export const getInitialHistoryState = (xMax) => {
    const timestamp = Date.now()
    return Array.from({ length: Math.floor((xMax ?? 10000) / 1000) }, (_, i) => ({
        x: i * 1000,
        y: 0,
        timestamp: timestamp - ((xMax / 1000 - i) * 1000)
    }))
}

export const getDefaultYMax = (mode) => {
    switch (mode) {
        case MultimeterModes.POKIT.DC_VOLTS:
        case MultimeterModes.DVM2130.DC_VOLTS:
            return -5
        case MultimeterModes.DVM2130.AC_VOLTS:
        case MultimeterModes.POKIT.AC_VOLTS:
            return 5
        case MultimeterModes.POKIT.AC_AMPS:
        case MultimeterModes.POKIT.DC_AMPS:
            return 5
        default:
            return -5
    }
}

export const getYUnitByMode = (mode) => {
    switch (mode) {
        case MultimeterModes.POKIT.DC_VOLTS:
        case MultimeterModes.DVM2130.DC_VOLTS:
        case MultimeterModes.DVM2130.AC_VOLTS:
        case MultimeterModes.POKIT.AC_VOLTS:
            return 'V'
        case MultimeterModes.POKIT.AC_AMPS:
        case MultimeterModes.POKIT.DC_AMPS:
            return 'A'
        default:
            return ''
    }
}
