import { MultimeterTypes } from "../../../../../constants/global";

const convertValue = (value, multimeterType) => {
    switch (multimeterType) {
        case MultimeterTypes.POKIT:
            return Math.floor(value - value % 500)
        default:
            return value
    }
}

const isValid = (value, multimeterType) => {
    switch (multimeterType) {
        case MultimeterTypes.POKIT:
            return Number.isInteger(value) && value >= 500 && value <= 20000
        default:
            return false
    }
}

export const validateCycleTime = (value, multimeterType) => {
    const valid = isValid(parseInt(value), multimeterType)
    const converted = convertValue(value, multimeterType)
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