export class DisplayCardData {
    constructor(type, value) {
        this.type = type
        this.value = value
    }
}

export const DisplayCardDataTypes = Object.freeze({
    TIME_MODIFIED: 0,
    MATERIAL: 1,
    LOCATION: 2,
    TAP: 3,
})