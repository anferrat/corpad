import { TapOptions } from "../../../constants/global"
import { TapOptionLabels, CoarseFineOptionLabels } from "../../../constants/labels"

export const combineLatLon = (lat, lon) => {
    const placeholder = (value) => value === null ? '??.??????' : value
    return lat === null && lon === null ? null : placeholder(lat) + ', ' + placeholder(lon)
}

export const getCountTitle = (count) => {
    if (count !== undefined) {
        return `${count} test point${count !== 1 ? 's' : ''}`
    }
    else return null
}

const numberWithSpaces = (x) => {
    if (!isNaN(x) && x !== null && x !== undefined) {
        var parts = x.toString().split(".")
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        return parts.join(".")
    }
    else return x
}

const fixRealValue = (a) => {
    if (a === undefined || a === null || isNaN(a))
        return null
    else {
        const abs = Math.abs(a)
        if (abs >= 1000)
            return Math.floor(a).toFixed(0)
        else if (abs < 1000 && abs >= 100)
            return Number(a).toFixed(1)
        else if (abs < 100 && abs > 1) {
            return Number(a).toFixed(2).replace(/\.?0*$/, '')
        }
        else if (abs <= 1 && abs >= 0.01) {
            return Number(a).toFixed(3).replace(/\.?0*$/, '')
        }
        else if (abs < 0.01 && abs > 0.0001) {
            return Number(a).toFixed(5).replace(/\.?0*$/, '')
        }
        else return "0"
    }
}

export const displayResistance = (r) => fixRealValue(r)

export const displayResistivity = (r) => numberWithSpaces(fixRealValue(r))

export const displaySpacing = (r) => fixRealValue(r)

export const getTapValue = (tapSetting, tapValue, tapCoarse, tapFine) => {
    if (tapSetting === null || (tapSetting === TapOptions.RESISTOR && tapValue === null) || (tapSetting === TapOptions.COARSE_FINE && tapFine === null && tapCoarse === null))
        return {
            value: null,
            unit: null
        }
    else if (tapSetting === TapOptions.AUTO)
        return { value: TapOptionLabels[TapOptions.AUTO], unit: null }
    else if (tapSetting === TapOptions.RESISTOR)
        return {
            value: tapValue,
            unit: '%'
        }
    else if (tapCoarse !== null && tapFine !== null)
        return { value: `C${CoarseFineOptionLabels[tapCoarse]} - F${CoarseFineOptionLabels[tapFine]}`, unit: null }
    else if (tapCoarse === null)
        return { value: `F${CoarseFineOptionLabels[tapFine]}`, unit: null }
    else return { value: `C${CoarseFineOptionLabels[tapCoarse]}`, unit: null }
}

export const displayShuntRatio = (ratioCurrent, ratioVoltage) => {
    if (ratioCurrent && ratioVoltage)
        return + ratioVoltage + ' mV - ' + ratioCurrent + ' A'
    else return null
}

export const displayCurrentTarget = (min, max) => {
    if (min === null && max === null) {
        return null
    }
    else
        if (min === null) {
            return 'Max. ' + max
        }
        else if (max === null) {
            return 'Min. ' + min
        }
        else return min + ' - ' + max
}