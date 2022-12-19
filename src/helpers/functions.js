import React from 'react'
import { Layout, Text } from '@ui-kitten/components'
import fieldValidation from './validation'
import { testPointTypeCodes, labels, referenceCellCodes, referenceCellTypes, potentialUnits, tapOptions } from '../constants/constants'
import { success, basic, warning, danger } from '../styles/colors'

export const parseToFloat = (number) => isNaN(parseFloat(number)) ? null : parseFloat(number)

const monthToString = (month) => month < 9 ? '0' + (month + 1) : (month + 1).toString()

const timeToString = (time) => time < 10 ? '0' + time : time.toString()

export const fileNameGen = (base, type) => {
    const d = new Date()
    return `${base}_${d.getFullYear()}-${monthToString(d.getMonth())}-${timeToString(d.getDate())}_${timeToString(d.getHours())}-${timeToString(d.getMinutes())}-${timeToString(d.getSeconds())}.${type}`
}

export const getTapSettings = (tapSetting, tapCoarse, tapFine, tapValue) => {
    if (tapSetting === 0 && tapOptions[tapCoarse] !== undefined && tapOptions[tapFine] !== undefined)
        return `C${tapOptions[tapCoarse]} - F${tapOptions[tapFine]}`
    else if (tapSetting === 1 && tapValue !== null)
        return tapValue + ' %'
    else if (tapSetting === 2)
        return 'Automatic'
    else return null
}

export const getListNameFromDataType = (dataType) => {
    switch (dataType) {
        case 'TEST_POINT':
            return 'TestPoints'
        case 'RECTIFIER':
            return 'Rectifiers'
        case 'PIPELINE':
            return 'Pipelines'
        default: 'TestPoints'
    }
}


export const unitConverter = (value, originalUnit, targetUnit) => {
    //Only used for potential units at the time
    if (verifyTypes(originalUnit, potentialUnits) && verifyTypes(targetUnit, potentialUnits)) {
        const combinedUnit = originalUnit + targetUnit
        const negativeMultiplier = (combinedUnit.match(/-/g) || []).length % 2 === 1 ? -1 : 1
        const multiplyBy = (combinedUnit.replace('-', '').match(/m/g) || []).length % 2 === 1 ? combinedUnit.replace('-', '').indexOf('m') === 0 ? 0.001 : 1000 : 1
        if (value !== undefined && value !== null && !isNaN(value)) {
            const result = value * negativeMultiplier * multiplyBy
            if (targetUnit[0] === 'm' || (targetUnit[0] === '-' && targetUnit[1] === 'm'))
                return result.toFixed(0)
            else if (originalUnit[0] === 'm' || (originalUnit[0] === '-' && originalUnit[1] === 'm'))
                return result.toFixed(3)
            else return result
        }
        else return null
    }
    else
        return value
}



export const displayReadingValue = (a, unit) => {
    if (a === undefined || a === null)
        return null
    else
        if (isNaN(a))
            return a + ' ' + unit
        else {
            const abs = Math.abs(a)
            if (abs >= 1000)
                return Math.floor((a / 1000)) + ' K' + unit
            else if (abs < 1000 && abs > 1)
                return a.toPrecision(4) + ' ' + unit
            else if (abs <= 0.001) {
                return a.toFixed(3) + ' ' + unit
            }
            else return a.toFixed(3) + ' ' + unit
        }
}

export const fixRealValue = (a) => {
    if (a === undefined || a === null || isNaN(a))
        return null
    else {
        const abs = Math.abs(a)
        if (abs >= 1000)
            return Math.floor(a)
        else if (abs < 1000 && abs >= 100)
            return a.toFixed(1)
        else if (abs < 100 && abs > 1) {
            return a.toFixed(2).replace(/\.?0*$/, '')
        }
        else if (abs <= 1 && abs >= 0.01) {
            return a.toFixed(3).replace(/\.?0*$/, '')
        }
        else if (abs < 0.01 && abs > 0.0001) {
            return a.toFixed(5).replace(/\.?0*$/, '')
        }
        else return 0
    }
}

export const largeNumberHandler = (a, order) => a > Math.pow(10, order) ? a.toExponential() : a


export const genValidObject = (object) => {
    // valid object for Edit Screens. used validate entered data. copies props of original object to object named 'valid: {}', with values true (initially)
    let validObject = {}
    for (const property in object)
        Object.assign(validObject, { [property]: true })
    return validObject
}

export const numberWithSpaces = (x) => {
    if (!isNaN(x) && x !== null && x !== undefined) {
        var parts = x.toString().split(".")
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        return parts.join(".")
    }
    else return x
}

export const genMarker = (dataType, item) => ({
    dataType: dataType,
    id: item.id,
    uid: item.uid,
    active: false,
    status: item.status,
    testPointType: item.testPointType ?? null,
    latitude: item.latitude,
    longitude: item.longitude,
    name: item.name,
    location: item.location
})

export const db_on_off_list_converter = (onOfflist, param, unit) => { // converts data from DB to more usefull format. Param 0 - for ON/OFF reads, 1 - for OFF/Depol NOT_USED
    return onOfflist.filter(item => item.title === 'PERM_ON' || item.title === 'PERM_OFF' || item.title === 'PERM_NATIVE').map(item => JSON.stringify({ uid: item.uid, iconName: item.cardType, name: item.cardName })).filter((value, index, self) => self.indexOf(value) === index).map(item => JSON.parse(item)).map(item => {
        const offIndex = onOfflist.findIndex(o => o.title === 'PERM_OFF' && o.uid == item.uid)
        const secondIndex = !param ? onOfflist.findIndex(o => o.title === 'PERM_ON' && o.uid === item.uid) : onOfflist.findIndex(o => o.title === 'PERM_NATIVE' && o.uid === item.uid)
        const offValue = offIndex === -1 || onOfflist[offIndex].value === null ? [] : [{ type: 'off', value: onOfflist[offIndex].value ?? null, unit: unit }]
        const secondValue = secondIndex === -1 || onOfflist[secondIndex].value === null ? [] : [{ type: !param ? 'on' : 'depol', value: onOfflist[secondIndex].value ?? null, unit: unit }]
        const readings = !param ? secondValue.concat(offValue) : offValue.concat(secondValue)
        return {
            ...item,
            readings: readings.length === 0 ? 'none' : readings
        }
    })
}

export const calculateCouponDensity = (current, area) => {
    if (fieldValidation(current, 'current').valid && fieldValidation(area, 'area').valid && area !== 0 && area !== null && area !== '' && current !== null && current !== '') {
        return (Math.round(((current / area) + Number.EPSILON) / 100 * 100000) / 100000)
    }
    else
        return null
}

export const factorCalculation = (voltage, current) => {
    const rc = fieldValidation(current, 'ratioCurrent')
    const rv = fieldValidation(voltage, 'ratioVoltage')
    if (rv.valid && rc.valid && rv.value !== null && rv.value !== '' && rc.value !== null && rc.value !== '' && rv.value !== 0) {
        return (Math.round(((current / voltage) + Number.EPSILON) * 10000) / 10000)
    }
    else
        return null
}

export const currentCalculation = (voltageDrop, factor) => {
    const v = fieldValidation(voltageDrop, 'voltageDrop')
    const f = fieldValidation(factor, 'factor')
    if (v.valid && f.valid && v.value !== null && v.value !== '' && f.value !== null && f.value !== '') {
        return (Math.round(((voltageDrop * factor) + Number.EPSILON) * 10000) / 10000)
    }
    else
        return null
}

export const currentCalculation2 = (voltageDrop, ratioCurrent, ratioVoltage) => {
    const v = fieldValidation(voltageDrop, 'voltageDrop')
    const rc = fieldValidation(ratioCurrent, 'ratioCurrent')
    const rv = fieldValidation(ratioVoltage, 'ratioVoltage')
    if (v.valid && rv.valid && rc.valid && v.value !== null && v.value !== '' && rv.value !== null && rv.value !== '' && rc.value !== null && rc.value !== '' && rv.value !== 0) {
        return (Math.round(((voltageDrop * ratioCurrent / ratioVoltage) + Number.EPSILON) * 10000) / 10000)
    }
    else
        return null
}

export const toString = (value) => value === null ? '' : value.toString() // for input field, value prop must be a string

export const verifyTypes = (type, selectedTypes) => //checks if type is in a list of selected types
    selectedTypes.some(item => item === type)

export const getCardDefaultName = (cardList, cardType, cardId, prefix) => { // finds index of a card in a test point among the cards with the same type
    const cardIndex = cardList.filter(card => card.type === cardType).findIndex(card => card.id == cardId)
    return getName(cardIndex + 1, cardType, prefix)
}

export const getCircuitDefaultName = (circuitList, circuitId, prefix) => {
    const circuitIndex = circuitList.findIndex(circuit => circuit.id == circuitId)
    return getName(circuitIndex + 1, "CT", prefix)
}

export const genRequestObject = (dataType, id, data = undefined) => { //generates data object is for sendRequest function. data object for function is specific to a type of data. Should have created smarter db requests, but this way works jsut fine. 
    switch (dataType) {
        case 'TEST_POINT':
            return { testPointId: id, testPointObject: data }
        case 'CARD':
            return { cardId: id, cardObject: data }
        case 'CIRCUIT':
            return { circuitId: id, circuitObject: data }
        case 'RECTIFIER':
            return { rectifierId: id, rectifierObject: data }
        case 'PIPELINE':
            return { pipelineId: id, pipelineObject: data }
    }
}
export const iconHandlerItem = (dataType, testPointType = undefined) => { // returns code value of an item. this value equals to iconName of an item in <Icon> component
    switch (dataType) {
        case 'TEST_POINT':
            return testPointTypeCodes[testPointType] ?? 'TS'
        case 'RECTIFIER':
            return 'RT'
        case 'PIPELINE':
            return 'PL'
        default:
            return 'TS'
    }
}

export const titleHandlerItem = (dataType) => {
    switch (dataType) {
        case 'TEST_POINT':
            return 'Test point'
        case 'RECTIFIER':
            return 'Rectifier'
        case 'PIPELINE':
            return 'Pipeline'
    }
}

export const screenHandlerItem = (dataType) => {
    switch (dataType) {
        case 'TEST_POINT':
            return 'TestPoints'
        case 'RECTIFIER':
            return 'Rectifiers'
        case 'PIPELINE':
            return 'Pipelines'
    }
}

export const genRefCellDescription = (type) => {
    if (referenceCellTypes[type] && referenceCellCodes[type])
        return referenceCellTypes[type] + ' (' + referenceCellCodes[type] + ')'
    else return null
}

export const subtitleHandlerItem = (dataType, testPointType = undefined) => {
    switch (dataType) {
        case 'TEST_POINT':
            return labels[testPointTypeCodes[testPointType]]?.label ?? labels[dataType].label
        default:
            return labels[dataType]?.label ?? 'Unknown'
    }
}


export const getName = (index, type, prefix = undefined) => {
    // Name Generator. Default names should come from global state and stored in async storage, or permanent database  
    if (prefix !== undefined) {
        return prefix + index.toString()
    }
    else
        switch (type) {
            case 'PL':
                return 'PipeLead'
            case 'PIPELINE':
                return 'Pipeline'
            case 'AN':
                return 'Galvanic Anode Lead'
            case 'RE':
                return 'Reference Cell Lead'
            case 'CN':
                return 'Coupon Lead'
            case 'RS':
                return 'Riser'
            case 'SH':
                return 'Shunt'
            case 'FC':
                return 'Unprotected Structure'
            case 'IK':
                return 'Isolation'
            case 'TP':
            case 'TEST_POINT':
                return 'TP'
            case 'OT':
                return 'Test Lead'
            case 'RT':
            case 'RECTIFIER':
                return 'Rectifier'
            case 'CC':
                return 'Circuit'
            case 'BD':
                return 'Bond'
            case 'CT':
                return 'Circuit'
            default:
                return 'Point'
        }
}

export const getListStateByType = (dataType, state) => {
    switch (dataType) {
        case 'TEST_POINT':
            return state.testPointList
        case 'RECTIFIER':
            return state.rectifierList
        case 'PIPELINE':
            return state.pipelineList
    }
}

export const getWarningCode = (dataType) => {
    switch (dataType) {
        case 'TEST_POINT':
            return 55
        case 'RECTIFIER':
            return 53
        case 'PIPELINE':
            return 54
        case 'CARD':
            return 56
        case 'CIRCUIT':
            return 57
        default:
            return 58
    }
}

export const getPipelineNameById = (pipelineId, pipelineList) => {
    const pipelineIndex = pipelineList?.findIndex(pipeline => pipeline?.id === pipelineId)
    if (pipelineIndex !== -1 && pipelineIndex !== undefined)
        return pipelineList[pipelineIndex].name
    else return null
}


export const getValue = (index, array) => {
    if (index === null || array[index] === undefined)
        return null
    else return array[index]
}

export const filterCounter = (prev, next) => {
    if (typeof prev === 'boolean') {
        if (prev !== next)
            if (next)
                return 1
            else return -1
        else return 0
    }
    else if (Array.isArray(prev))
        return next.length - prev.length
    else return 0
}

export const getValidCaption = (valid, type) => {
    // Caption for input field based on property if data is invalid.   ** FIX IT PLS
    const getCaption = () => {
        switch (type) {
            case 'testPointType':
                return 'Choose test point type'
            case 'name':
                return 'Name must only contain following characters: A-z, 0-9, -._()# and be less than 40 characters'
            case 'gps':
                return 'Incorrect format'
            case 'location':
                return 'Must be less that 80 characters'
            case 'comment':
                return 'Must be less that 300 characters'
            case 'model':
            case 'licenseNumber':
            case 'serialNumber':
                return 'Must be less that 80 characters'
            case 'tapValue':
                return 'Must be from 0 to 100%'
            case 'shunt':
            case 'current':
            case 'voltage':
            case 'area':
            case 'potential':
            case 'voltageDrop':
            case 'maxVoltage':
            case 'maxCurrent':
                return 'Must be a number'
            default: return null
        }
    }
    const caption = getCaption()
    if (!valid && caption !== null)
        return <Layout><Text category='label' status='danger'>{caption}</Text></Layout>
}
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const getFormattedDate = (timestamp) => { //formats date. date stored across the app in a format of Date.now()
    const t = new Date(timestamp)
    if (timestamp && !isNaN(timestamp) && timestamp > 0 && t) {
        const currentTimestamp = Date.now()
        const recent = Math.abs(currentTimestamp - timestamp) < 864000000 && new Date(currentTimestamp).getDate() === t.getDate()
        const withinYear = new Date(currentTimestamp).getFullYear() === t.getFullYear()
        const time = ("0" + t.getHours()).slice(-2) + ':' + ("0" + t.getMinutes()).slice(-2)
        if (recent)
            return 'Today, ' + time
        else if (withinYear)
            return `${monthList[t.getMonth()]} ${t.getDate()}, ${time}`
        else
            return `${monthList[t.getMonth()]} ${t.getDate()}, ${t.getFullYear()} ${time}`
    }
    else return 'Time error'
}

export const getFullDate = (timestamp) => { //formats date. date stored across the app in a format of Date.now()
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

export const getFileSize = (bytes) => {
    if (bytes >= 0 && bytes < 1024)
        return {
            value: bytes,
            unit: 'B'
        }
    else if (bytes >= 1024 && bytes < 1048576)
        return {
            value: (bytes / 1024).toFixed(2),
            unit: 'KB',
        }
    else if (bytes >= 1048576 && bytes < 1073741824)
        return {
            value: (bytes / 1048576).toFixed(2),
            unit: 'MB'
        }
    else if (bytes >= 1073741824)
        return {
            value: (bytes / 1073741824).toFixed(2),
            unit: 'GB'
        }
    else return {
        value: '??',
        unit: 'B'
    }
}


export const getIconByFieldType = (type) => { // used in Display card DataRow. 
    switch (type) {
        case 'timeCreated':
        case 'timeModified':
            return {
                icon: 'calendar-outline',
                pack: null
            }
        case 'options-outline':
            return {
                icon: 'options-outline',
                pack: null
            }
        case 'cube-outline':
            return {
                icon: 'cube-outline',
                pack: null
            }
        case 'target':
            return {
                icon: 'trending-up-outline',
                pack: null
            }
        case 'voltage':
            return {
                icon: 'voltage',
                pack: 'cp'
            }
        case 'location':
        case 'map-outline':
            return {
                icon: 'map-outline',
                pack: null
            }
        case 'comment':
            return {
                icon: 'message-square-outline',
                pack: null
            }
        case 'on':
            return {
                icon: 'On',
                pack: 'cp'
            }
        case 'off':
            return {
                icon: 'Off',
                pack: 'cp'
            }
        case 'depol':
            return {
                icon: 'Depol',
                pack: 'cp'
            }
        case 'current':
            return {
                icon: 'flash-outline',
                pack: null
            }
        case 'density':
            return {
                icon: 'keypad-outline',
                pack: null
            }
        default:
            return {
                icon: 'question-mark-circle-outline',
                pack: null
            }
    }
}

export const getSubitemNameFromDataType = (dataType) => {
    switch (dataType) {
        case 'TEST_POINT':
            return 'CARD'
        case 'RECTIFIER':
            return 'CIRCUIT'
        default:
            return null
    }
}

export const getStatusProps = (status) => {
    switch (status) {
        case 0:
            return { icon: 'checkmark-circle-outline', color: success, status: 'success', title: 'Pass' }
        case 1:
            return { icon: 'alert-triangle-outline', color: warning, status: 'warning', title: 'Attention' }
        case 2:
            return { icon: 'alert-circle-outline', color: danger, status: 'danger', title: 'Issue' }
        default:
            return { icon: 'question-mark-circle-outline', color: basic, status: 'basic', title: 'Unknown' }
    }
}

const getMax = (a, b) => a !== null && b !== null ? Math.max(a, b) : (a === null ? b : a)
const getMin = (a, b) => a !== null && b !== null ? Math.min(a, b) : (a === null ? b : a)

export const calculateRegionCorners = (markers) => {
    return ({
        minLat: markers.reduce((min, marker) => getMin(marker.latitude, min), markers[0]?.latitude ?? null),
        minLon: markers.reduce((min, marker) => getMin(marker.longitude, min), markers[0]?.longitude ?? null),
        maxLat: markers.reduce((max, marker) => getMax(marker.latitude, max), markers[0]?.latitude ?? null),
        maxLon: markers.reduce((max, marker) => getMax(marker.longitude, max), markers[0]?.longitude ?? null),
    })
}


export const calculateInitRegion = (markers) => {
    const region = calculateRegionCorners(markers)
    const validate = [fieldValidation(region.minLat, 'latitude'), fieldValidation(region.maxLat, 'latitude'), fieldValidation(region.minLon, 'longitude'), fieldValidation(region.maxLon, 'longitude')]
    if (region.maxLat !== null && region.minLat !== null && region.maxLon !== null && region.minLon !== null && validate.every(i => i.valid)) {
        const midLat = (region.minLat + region.maxLat) / 2
        const midLon = (region.minLon + region.maxLon) / 2
        const deltaLat = region.maxLat - region.minLat
        const deltaLon = region.maxLon - region.minLon
        return {
            latitude: midLat,
            longitude: midLon,
            latitudeDelta: deltaLat < 0.001 ? 0.001 : deltaLat,
            longitudeDelta: deltaLon < 0.001 ? 0.001 : deltaLon,
        }
    }
    else return null
}

const PiOver180 = Math.PI / 180
const R = 6371e3

export const coordTransform = (lat1, lon1, lat2, lon2) => {
    const fi1 = lat1 * PiOver180
    const fi2 = lat2 * PiOver180
    const deltaL = (lon2 - lon1) * PiOver180
    const b = Math.atan2(deltaL * Math.cos(fi2), Math.cos(fi1) * Math.sin(fi2) - Math.sin(fi1) * Math.cos(fi2) * Math.cos(deltaL))
    const d = Math.acos(Math.sin(fi1) * Math.sin(fi2) + Math.cos(fi1) * Math.cos(fi2) * Math.cos(deltaL)) * R
    return { distance: d, heading: b }
}

export const getDistance = (d) => {
    const dR = Math.round(d)
    if (dR === -1)
        return '-'
    if (dR === 0)
        return '< 1 m'
    else if (dR > 0 && dR < 1000)
        return dR.toString() + ' m'
    else if (dR > 999 && dR < 10000)
        return (dR / 1000).toPrecision(3) + ' km'
    else if (dR > 10000 && dR < 100000)
        return Math.round(dR / 1000).toString() + ' km'
    else if (dR > 100000)
        return '> 100 km'
}

export const getDefaultUnit = (unitList, defaultUnitIndex, extraData=[], referenceCellIndex = undefined) => {
    if (unitList.length === 0)
        return null
    else
        if (referenceCellIndex !== undefined) {
            const base = unitList[extraData?.defaultPotentialUnit] ?? unitList[0]
            const rcType = extraData.referenceCellList[referenceCellIndex]?.rcType ?? 0
            const sub = referenceCellCodes[rcType]
            return {
                main: base,
                script: sub,
                format: 'sub'
            }
        }
        else {
            // convertion last digit to superscript for display purposes, not ideal, but it's just easy
            const unit = unitList[defaultUnitIndex]
            if (unit) {
                if (!isNaN(unit[unit.length - 1]))
                    return {
                        main: unit.slice(unit.length - 1),
                        format: 'super',
                        script: unit[unit.length - 1]
                    }
                else return unit
            }
            else return null
        }
}