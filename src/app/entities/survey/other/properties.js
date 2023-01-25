import { ItemTypes } from "../items/SurveyItem"

export const PipeDiameters = Object.freeze({
    NPS0_5: 0,
    NPS3_4: 1,
    NPS1: 2,
    NPS5_4: 3,
    NPS3_2: 4,
    NPS2: 5,
    NPS5_2: 6,
    NPS3: 7,
    NPS7_2: 8,
    NPS4: 9,
    NPS5: 10,
    NPS6: 11,
    NPS7: 12,
    NPS8: 13,
    NPS9: 14,
    NPS10: 15,
    NPS12: 16,
    NPS14: 17,
    NPS16: 18,
    NPS18: 19,
    NPS20: 20,
    NPS22: 21,
    NPS24: 22,
    NPS26: 23,
    NPS28: 24,
    NPS30: 25,
    NPS32: 26,
    NPS34: 27,
    NPS36: 28,
    NPS40: 29,
    NPS42: 30,
    NPS44: 31,
    NPS46: 32,
    NPS48: 33,
    NPS52: 34,
    NPS56: 35,
    NPS60: 36,
    NPS64: 37,
    NPS68: 38,
    NPS72: 39,
    NPS76: 40,
    NPS80: 41,
    NPS88: 42
})

export const ReferenceCellTypes = Object.freeze({
    COPPER_SULFATE: 0,
    ZINC: 1,
    SILVER_CHLORIDE: 2,
    SATURATED_CALOMEL: 3,
    NORMAL_HYDROGEN: 4
})

export const WireColors = Object.freeze({
    BLACK: 0,
    GREEN: 1,
    WHITE: 2,
    YELLOW: 3,
    RED: 4,
    PINK: 5,
    LIGHT_BLUE: 6,
    DARK_BLUE: 7,
    WHITE_RED: 8,
    WHITE_BLACK: 9,
    BLACK_RED: 10,
    GREEEN_YELLOW: 11
})

export const PotentialUnits = Object.freeze({
    NEGATIVE_MILIVOLTS: 0,
    MILIVOLTS: 1,
    NEGATIVE_VOLTS: 2,
    VOLTS: 3
})

export const SortingOptions = Object.freeze({
    ASCENDING_NAME: 0,
    DESCENDING_NAME: 1,
    NEW_TO_OLD: 2,
    OLD_TO_NEW: 3,
    NEAREST: 4
})

export const DisplayedReadingOptions = Object.freeze({
    [ItemTypes.TEST_POINT]: Object.freeze({
        ON_OFF: 0,
        OFF_DEPOL: 1,
        CURRENT: 2,
        DENSITY: 3,
        SHORTING_CURRENT: 4
    }),
    [ItemTypes.RECTIFIER]: Object.freeze({
        CURRENT: 0,
        VOLTAGE: 1,
        CURRENT_TARGET: 2
    })
})

export const CouponTypes = Object.freeze({
    AC: 0,
    DC: 1
})

export const CurrentUnits = Object.freeze({
    MICRO_AMPS: 0,
    MILI_AMPS: 1,
    AMPS: 2
})

export const IsolationTypes = Object.freeze({
    ISOLATION_KIT: 0,
    ISOLATION_JOINT: 1,
    OTHER: 2,
})

export const PermanentPotentialTypes = Object.freeze({
    ON: 'PERM_ON',
    OFF: 'PERM_OFF',
    DEPOL: 'PERM_NATIVE',
    CONNECTED: 'PERM_CONNECTED',
    DISCONNECTED: 'PERM_DISCONNECTED'
})