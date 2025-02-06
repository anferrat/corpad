export const validateXLimit = (xMax) => {
    let value = xMax
    value.trim()
    value = Math.floor(Number(value))
    let valid = !isNaN(value) && value >= 1 && value <= 60
    return { value, valid }
}

export const validateYLimit = (yMax) => {
    let value = yMax
    value.trim()
    value = Math.floor(Number(value))
    let valid = !isNaN(value) && Math.abs(value) <= 600
    return { value, valid }
}