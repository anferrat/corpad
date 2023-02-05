import { Marker } from "./Marker"
import { ItemStatuses, ItemTypes } from "./SurveyItem"

export class Rectifier extends Marker {
    constructor(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent) {
        super(id, uid, name, status, timeCreated, timeModified, comment, ItemTypes.RECTIFIER, undefined, location, latitude, longitude)
        this.model = model
        this.serialNumber = serialNumber
        this.powerSource = powerSource
        this.acVoltage = acVoltage
        this.acCurrent = acCurrent
        this.tapSetting = tapSetting
        this.tapValue = tapValue
        this.tapCoarse = tapCoarse
        this.tapFine = tapFine
        this.maxVoltage = maxVoltage
        this.maxCurrent = maxCurrent
    }
}

export const PowerSources = Object.freeze({
    AC_POWER: 0,
    TEG: 1,
    WIND: 2,
    SOLAR: 3,
})

export const TapOptions = Object.freeze({
    COARSE_FINE: 0,
    RESISTOR: 1,
    AUTO: 2
})

export const CoarseFineOptions = Object.freeze({
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    J: 8,
    K: 9,
    0: 10,
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 15,
    6: 16,
    7: 17,
    8: 18,
    9: 19,
})