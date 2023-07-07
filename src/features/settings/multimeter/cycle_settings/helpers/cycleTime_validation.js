import { MultimeterTypes } from "../../../../../constants/global";

const convertValue = (value, multimeterType) => {
    switch (multimeterType) {
        case MultimeterTypes.POKIT:
            return (Math.floor(value / 1000) * 1000)
        default:
            return value
    }
}

const isValid = (value, multimeterType) => {
    switch (multimeterType) {
        case MultimeterTypes.POKIT:
            return Number.isInteger(value) && value >= 1000 && value <= 20000
        default:
            return false
    }
}

export const validateCycleTime = (value, multimeterType) => {
    const valid = isValid(parseInt(value), multimeterType)
    console.log(value, Number.isInteger(parseInt(value)))
    const converted = convertValue(value, multimeterType)
    console.log(converted)
    if (!valid)
        return {
            valid,
            value
        }
    else return {
        valid,
        value: converted
    }
}