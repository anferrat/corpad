
const valueConverter = (value) => {
    if (Number.isInteger(value)) {
        return value
    }
    else if (isNaN(value))
        if (value?.trim() === '')
            return null
        else
            return value?.trim() ?? null
    else
        if (value === undefined || value === null || (value?.trim ? value?.trim() === '' : false))
            return null
        else
            return Math.round((value * 10000000)) / 10000000
}


const isNull = (value) => value === null
const reg = (expression) => new RegExp(expression)

const validate = (v, type) => {
    switch (type) {
        case 'longitude':
            return (reg('^[+-]?((180\.?0*$)|(((1[0-7][0-9])|([0-9]{0,2}))\.?[0-9]*$))').test(v) && (v <= 180) && (v >= -180)) || isNull(v)
        case 'latitude':
            return (reg('^[+-]?((90\.?0*$)|(([0-8]?[0-9])\.?[0-9]*$))').test(v) && (v <= 90) && (v >= -90) || isNull(v))
        case 'potential':
            return !isNaN(v)
        case 'name':
            return isNull(v) || reg('^[-a-zA-Z0-9_.\s() ]*$').test(v) && String(v).length <= 40
        case 'name_not_empty':
        case 'surveyName':
            return !isNull(v) && reg('^[-a-zA-Z0-9_.\s() ]*$').test(v) && String(v).length <= 40
        case 'location':
            return isNull(v) || String(v).length <= 80
        case 'comment':
            return isNull(v) || String(v).length <= 300
        case 'model':
        case 'licenseNumber':
        case 'serialNumber':
            return isNull(v) || String(v).length <= 80
        case 'tapValue':
            return (!isNaN(v) && v >= 0 && v <= 100) || isNull(v)
        case 'current':
        case 'voltage':
        case 'ratioVoltage':
        case 'ratioCurrent':
        case 'factor':
        case 'maxVoltage':
        case 'targetMax':
        case 'targetMin':
        case 'maxCurrent':
        case 'voltageDrop':
        case 'area':
            return !isNaN(v)
        case 'potentialName':
            return !isNull(v) && reg('^[-a-zA-Z0-9_.\s() ]*$').test(v) && String(v).length <= 12 && String(v).length >= 2
        case 'testPointType':
            return !isNull(v)
        case 'timeCreated':
        case 'timeModified':
            return v > 0
        default:
            return true
    }
}

const validation = (value, type) => {
    const v = valueConverter(value)
    const valid = validate(v, type)
    return {
        valid: valid,
        value: v
    }
}

export default validation