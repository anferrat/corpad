export const convertValue = (value) => {
    try {
        return JSON.stringify(value)
    }
    catch (er) {
        return '#ERROR'
    }
}