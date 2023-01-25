import { Marker } from "./Marker"
import { ItemStatuses, ItemTypes } from "./SurveyItem"

export class Rectifier extends Marker {
    constructor(id, uid, name = null, status = ItemStatuses.UNKNOWN, timeCreated, timeModified, comment = null, location = null, latitude = null, longitude = null, model = null, serialNumber = null, powerSource = null, acVoltage = null, acCurrent = null, tapSetting = TapOptions.COARSE_FINE, tapValue = null, tapCoarse = null, tapFine = null, maxVoltage = null, maxCurrent = null) {
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