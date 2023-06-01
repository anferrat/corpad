import fieldValidation from './validation'

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

export const currentCalculation2 = (voltageDrop, ratioCurrent, ratioVoltage) => { //for shunt in CT
    const v = fieldValidation(voltageDrop, 'voltageDrop')
    const rc = fieldValidation(ratioCurrent, 'ratioCurrent')
    const rv = fieldValidation(ratioVoltage, 'ratioVoltage')
    if (v.valid && rv.valid && rc.valid && v.value !== null && v.value !== '' && rv.value !== null && rv.value !== '' && rc.value !== null && rc.value !== '' && rv.value !== 0) {
        return (Math.round(((voltageDrop * ratioCurrent / ratioVoltage) + Number.EPSILON) * 10000) / 10000)
    }
    else
        return null
}

export const getListStateByType = (dataType, state) => { //used in List (filters, sorting, body) move it there
    switch (dataType) {
        case 'TEST_POINT':
            return state.testPointList
        case 'RECTIFIER':
            return state.rectifierList
        case 'PIPELINE':
            return state.pipelineList
    }
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