export const PHOTO_LIMIT = 6

export const ItemTypes = Object.freeze({
    TEST_POINT: 'TEST_POINT',
    PIPELINE: 'PIPELINE',
    RECTIFIER: 'RECTIFIER',
})

export const TestPointTypes = Object.freeze({
    TEST_STATION: 0,
    HEADER: 1,
    JUNCTION_BOX: 2,
    FIELD_NOTE: 3,
    MEASURMENT: 4
})

export const ItemStatuses = {
    GOOD: 0,
    ATTENTION: 1,
    BAD: 2,
    UNKNOWN: 3,
    NO_STATUS: null
}

export const IconTypes = Object.freeze({
    [ItemTypes.TEST_POINT]: {
        [TestPointTypes.TEST_STATION]: 'TS',
        [TestPointTypes.JUNCTION_BOX]: 'JB',
        [TestPointTypes.HEADER]: 'HD',
        [TestPointTypes.FIELD_NOTE]: 'FN',
        [TestPointTypes.MEASURMENT]: 'MN'
    },
    [ItemTypes.RECTIFIER]: 'RT',
    [ItemTypes.PIPELINE]: 'PL'
})

export const SubitemTypes = Object.freeze({
    ANODE: 'AN',
    PIPELINE: 'PL',
    REFERENCE_CELL: 'RE',
    COUPON: 'CN',
    BOND: 'BD',
    SHUNT: 'SH',
    TEST_LEAD: 'OT',
    RISER: 'RS',
    ISOLATION: 'IK',
    STRUCTURE: 'FC',
    CIRCUIT: 'CT',
    ANODE_BED: 'AB',
    SOIL_RESISTIVITY: 'SR',
})

export const PipelineProducts = Object.freeze({
    GAS: 0,
    OIL: 1,
    WATER: 2,
    OTHER: 3
})

export const PipelineMaterials = Object.freeze({
    CARBON_STEEL: 0,
    ALLOY_STEEL: 1,
    CAST_IRON: 2,
    COPPER: 3,
    NICKEL: 4,
    PVC: 5,
    HDPE: 6,
    OTHER: 7
})

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
    D0: 10,
    D1: 11,
    D2: 12,
    D3: 13,
    D4: 14,
    D5: 15,
    D6: 16,
    D7: 17,
    D8: 18,
    D9: 19,
})

export const DisplayCardDataTypes = Object.freeze({
    TIME_MODIFIED: 0,
    MATERIAL: 1,
    LOCATION: 2,
    TAP: 3,
    ASSETS: 4,
})

export const OnboardingScreens = Object.freeze({
    REFERENCE_CELL_EDIT: 'editReferenceCell',
    MAP: 'map',
    POTENTIAL_TYPES: 'potentialTypes',
    SIDES_EDIT: 'editBond',
    TEST_POINT_EDIT: 'editTestPoint',
    MAIN: 'main',
})

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
        CURRENT_VOLTAGE: 0,
        CURRENT_TARGET: 1,
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

export const LengthUnits = Object.freeze({
    METERS: 0,
    CENTIMETERS: 1,
    FEET: 2
})

export const ResistivityUnits = Object.freeze({
    OHM_METERS: 0,
    OHM_CENTIMITTERS: 1,
    OHM_FEET: 2
})

export const FactorUnits = Object.freeze({
    AMPS_OVER_MILIVOLTS: 0,
    AMPS_OVER_VOLTS: 1,
    VOLTS_OVER_AMPS: 2,
    MILIVOLTS_OVER_AMPS: 3
})

export const AreaUnits = Object.freeze({
    CENTIMETER_SQUARE: 0,
    METER_SQUARE: 1
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

export const AnodeMaterials = Object.freeze({
    MAGNEZIUM: 0,
    ALUMINUM: 1,
    ZINC: 2,
    OTHER: 3
})

export const PipelineCoating = Object.freeze({
    BARE: 0,
    COATED: 1
})

export const IsolationShorted = Object.freeze({
    NOT_SHORTED: 0,
    SHORTED: 1,
})

export const WireGauges = Object.freeze({
    AVG0_PLUS: 0,
    AVG0: 1,
    AVG1: 2,
    AVG2: 3,
    AVG3: 4,
    AVG4: 5,
    AVG5: 6,
    AVG6: 7,
    AVG7: 8,
    AVG8: 9,
    AVG9: 10,
    AVG10: 11,
    AVG11: 12,
    AVG12: 13,
    AVG13: 14,
    AVG14: 15,
    AVG15: 16,
    AVG16: 17,
    AVG17: 18,
    AVG17_MINUS: 19,
})

export const SubitemPropertyUpdateTypes = Object.freeze({
    CURRENT: 'CURRENT',
    SHORTED: 'SHORTED',
    VOLTAGE_DROP: 'VOLTAGE_DROP',
    VOLTAGE: 'VOLTAGE'
})

export const ItemPropertyUpdateTypes = Object.freeze({
    STATUS: 'STATUS',
    TAP_VALUE: 'TAP_VALUE',
    TAP_COARSE: 'TAP_COARSE',
    TAP_FINE: 'TAP_FINE'
})

export const FileSystemLocations = Object.freeze({
    SURVEYS: 'surveys',
    EXPORTS: 'exports',
    DOWNLOADS: 'downloads',
    TEMP: 'temp',
    ASSETS: 'assets',
    TEMP_ASSETS: 'temp_assets',
    CURRENT_ASSETS: 'current_assets',
    TEMP_SURVEY: 'temp_survey',
    TEMP_DOWNLOADS: 'temp_downloads',
    CACHE: 'cache'
})

export const FileMimeTypes = Object.freeze({
    CSV: 'text/csv',
    KML: 'application/vnd.google-earth.kml+xml',
    JSON: 'application/json',
    TEXT: 'text/*',
    IMAGE: 'image/*',
    ZIP: 'application/zip',
    GPX: 'application/gpx+xml',
    BINARY: 'application/octet-stream'
})

export const FileTypeIdentifiers = Object.freeze({
    SURVEY_FILE: 'com.corpad.survey-file',
    SURVEY_FILE_WITH_ASSETS: 'com.corpad.survey-file-with-assets',
    CSV: 'public.comma-separated-values-text',
    KML: 'com.google.earth.kml',
    GPX: 'com.topografix.gpx',
    JSON: 'public.json',
    TEXT: 'public.plain-text',
    ITEM: 'public.item',
    CONTENT: 'public.content'
})

export const FileExtensions = Object.freeze({
    CSV: 'csv',
    KML: 'kml',
    JSON: 'json',
    TEXT: 'txt'
})

export const SurveyLoadingStatuses = Object.freeze({
    SAVING: 'saving',
    LOADING: 'loading',
    SELECTING: 'selecting',
    COMPLETED: 'completed',
    ERROR: 'error'
})

export const CalculatorTypes = Object.freeze({
    WENNER: 'wenner',
    SHUNT: 'shunt',
    COATING: 'coating',
    CURRENT_TWO_WIRE: 'current2Wire',
    CURRENT_FOUR_WIRE: 'current4Wire',
    REFERENCE_CELL: 'refCell'
})

export const ExportItemProperties = Object.freeze({
    NAME: 'name',
    TEST_POINT_TYPE: 'testPointType',
    TIME_MODIFIED: 'timeModified',
    STATUS: 'status',
    LATITUDE: 'latitude',
    LONGITUDE: 'longitude',
    LOCATION: 'location',
    COMMENT: 'comment',
    MATERIAL: 'material',
    NPS: 'nps',
    LICENSE_NUMBER: 'licenseNumber',
    PRODUCT: 'product',
    MODEL: 'model',
    SERIAL_NUMBER: 'serialNumber',
    RECTIFIER_OUTPUT: 'rectifierOutput',
    MAX_VOLTAGE: 'maxVoltage',
    MAX_CURRENT: 'maxCurrent'
})

export const ExportSubitemProperties = Object.freeze({
    VOLTAGE_DROP: 'voltageDrop',
    CURRENT: 'current',
    AREA: 'area',
    DENSITY: 'density',
    SHUNT_RATIO: 'ratio',
    FACTOR: 'factor',
    SHORTED: 'shorted',
    VOLTAGE: 'voltage',
    TARGET: 'target'
})

export const SurveyFileDataFields = Object.freeze({
    SURVEY: 'survey',
    TEST_POINTS: 'testPoints',
    RECTIFIERS: 'rectifiers',
    PIPELINES: 'pipelines',
    POTENTIAL_TYPES: 'potentialTypes',
    REFERENCE_CELLS: 'referenceCells',
    CARDS: 'cards',
    POTENTIALS: 'potentials',
    CIRCUITS: 'circuits',
    SIDES: 'sides',
})


export const PipeSchedules = Object.freeze({
    S10: 0,
    S20: 1,
    S30: 2,
    STD: 3,
    S40: 4,
    S60: 5,
    XS: 6,
    S80: 7,
    S100: 8,
    S120: 9,
    S140: 10,
    S160: 11,
    XXS: 12
})

export const CurrentDensityUnits = Object.freeze({
    AMPS_OVER_CM_SQUARE: 0,
    MILI_AMPS_OVER_CM_SQUARE: 1,
    AMPS_OVER_METER_SQUARE: 2,
    MILI_AMPS_OVER_METER_SQUARE: 3
})

export const MultimeterTypes = Object.freeze({
    POKIT: 'POKIT'
})

export const MultimeterServices = Object.freeze({
    [MultimeterTypes.POKIT]: {
        MULTIMETER: 'e7481d2f-5781-442e-bb9a-fd4e3441dadc',
        DSO: '1569801e-1425-4a7a-b617-a4f4ed719de6',
        DATA_LOGGER: 'a5ff3566-1fd8-4e10-8362-590a578a4121',
        STATUS: '57d3a771-267c-4394-8872-78223e92aec5'
    }
})

export const MultimeterCharacteristics = Object.freeze({
    [MultimeterTypes.POKIT]: {
        MULTIMETER: {
            SETTINGS: '53dc9a7a-bc19-4280-b76b-002d0e23b078',
            READING: '047d3559-8bee-423a-b229-4417fa603b90',
        },
        STATUS: {
            BUTTON_PRESS: '8fe5b5a9-b5b4-4a7b-8ff2-87224b970f89',
            STATUS: '3dba36e1-6120-4706-8dfd-ed9c16e569b6'
        }
    }
})

export const MultimeterSyncModes = Object.freeze({
    GPS: 0,
    HIGH_LOW: 1,
    REAL_TIME: 2,
    CYCLED: 3
})

export const MultimeterCycles = Object.freeze({
    OFF: 0,
    ON: 1
})

export const TimeUnits = Object.freeze({
    SECONDS: 0,
    MILISECONDS: 1,
    MINUTES: 2,
    HOURS: 3
})

export const MultimeterMeasurementTypes = Object.freeze({
    POTENTIALS: "POTENTIALS",
    VOLTAGE: 'VOLTAGE',
    VOLTAGE_DROP: 'VOLTAGE_DROP',
    COUPON_CURRENT: 'COUPON_CURRENT',
    CURRENT: 'CURRENT',
    COUPON_CURRENT_AC: 'COUPON_CURRENT_AC',
    POTENTIALS_AC: 'POTENTIALS_AC'
})

export const MediaTypes = Object.freeze({
    IMAGE: 0,
    //Not supported
    //RECORDING: 1,
    //VIDEO: 2
})

export const StrokeColors = Object.freeze({
    YELLOW: 0,
    RED: 1,
    GREEN: 2,
    BLUE: 3,
    PURPLE: 4,
    ORANGE: 5
})

export const StrokeWidths = Object.freeze({
    _05PT: 0,
    _1PT: 1,
    _1_5PT: 2,
    _2PT: 3,
    _3PT: 4
})

export const ImageSources = Object.freeze({
    CAMERA: 'CAMERA',
    LIBRARY: 'LIBRARY',
    STORAGE: 'STORAGE'
})

export const ExternalFileTypes = Object.freeze({
    SURVEY_WITH_ASSETS: 'surey_with_assets',
    SURVEY: 'survey',
    IMAGE: 'image',
    COMMA_SEPARATED_TEXT: 'comma_separated_text',
    KEYHOLE_MARKUP_LANGUAGE: 'keyhole_markup_language',
    GPS_EXCHANGE_FORMAT: 'gps_exchange_format',
    UNKNOWN_FILE: 'unknown_file' //when file url recieved from Android intent, it recieved as document provider content schema
})

export const MapLayerFeatures = Object.freeze({
    POINT: 'Point',
    LINE: 'LineString',
    POLYGON: 'Polygon'
})

export const ExportFormatTypes = Object.freeze({
    CSV: 'csv',
    KML: 'kml'
})

export const AnodeBedEnclosureTypes = Object.freeze({
    JUNCTION_BOX: 0,
    UNDEGROUND_BOX: 1,
    BURIED: 2

})

export const AnodeBedTypes = Object.freeze({
    SHALLOW_VERTICAL: 0,
    SHALLOW_HORIZONTAL: 1,
    DEEP_VERTICAL: 2
})

export const AnodeBedMaterialTypes = Object.freeze({
    GRAPHITE: 0,
    MIXED_METAL_OXIDE: 1,
    PLATINUM: 2,
    CONDUCTIVE_POLYMER: 3,
    SCRAP_METAL: 4,
    MAGNETITE: 5,
    ALUMINUM: 6
})

export const SubscriptionStatuses = Object.freeze({
    NOT_GRANTED: 0,
    GRANTED: 1,
    UNKNOWN_GRANTED: 2,
    UNKNOWN_NOT_GRANTED: 3,
    PENDING: 4,
})

export const ExternalLinkTypes = Object.freeze({
    NFC: 'NFC',
    QR_CODE: 'QR_CODE'
})

export const UrlTypes = Object.freeze({
    FILE: 'file',
    DATA_LINK: 'DATA_LINK'
})


export const NdefTagStatuses = Object.freeze({
    NOT_SUPPORTED: 1,
    SUPPORTED: 2,
    READ_ONLY: 3
})

export const NdefWritingStatuses = Object.freeze({
    LINK_CREATED: 'LINK_CREATED',
    NFC_MODULE_STATUS_RECEIVED: 'NFC_MODULE_STATUS_RECEIVED',
    NDEF_TECHNOLOGY_REQUESTED: 'NDEF_TECHNOLOGY_REQUESTED',
    TAG_STATUS_RECEIVED: 'TAG_STATUS_RECEIVED',
    WRITE_STARTED: 'WRITE_STARTED',
    WRITE_COMPLETED: 'WRITE_COMPLETED',
    WRITE_FAILED: 'WRITE_FAILED',
    NDEF_TECHNOLOGY_CANCELLED: 'NDEF_TECHNOLOGY_CANCELLED'
})
