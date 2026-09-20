import { ItemTypes, SubitemTypes, PipeDiameters, WireColors, TestPointTypes, PermanentPotentialTypes, SortingOptions, ItemStatuses, PipeSchedules, WireGauges, CurrentUnits, AreaUnits, CurrentDensityUnits, FactorUnits, PotentialUnits, AnodeMaterials, ReferenceCellTypes, IsolationTypes, CouponTypes, PipelineMaterials, PipelineProducts, PowerSources, TapOptions, CoarseFineOptions, ExportItemProperties, ExportSubitemProperties, CalculatorTypes, PipelineCoating, IsolationShorted, MultimeterTypes, TimeUnits, MultimeterMeasurementTypes, MultimeterCycles, MultimeterSyncModes, ImageSources, MapLayerFeatures, StrokeColors, StrokeWidths, ExportFormatTypes, LengthUnits, ResistivityUnits, AnodeBedEnclosureTypes, AnodeBedMaterialTypes, AnodeBedTypes, SubscriptionStatuses, FileMimeTypes, ExternalLinkTypes, TestPointReadingOptions, RectifierReadingOptions, PipelineFilterItems, MeasurementPropertyTypes, TimeSyncSources, MultimeterModes, MultimeterVoltageRanges, MultimeterCurrentRanges } from "./global"

let activeLabelCatalog = null

export const setActiveLabelCatalog = (catalog) => {
    activeLabelCatalog = catalog ?? null
}

const createLabelMap = (name, fallback) => new Proxy(fallback, {
    get: (target, property) => activeLabelCatalog?.[name]?.[property] ?? target[property],
    ownKeys: target => Object.keys(activeLabelCatalog?.[name] ?? target),
    getOwnPropertyDescriptor: (target, property) => ({
        enumerable: true,
        configurable: true,
        value: activeLabelCatalog?.[name]?.[property] ?? target[property]
    })
})

export const labelMapNames = Object.freeze([
    'DefaultNames',
    'PipeDiameterLabels',
    'WireColorLabels',
    'ItemTypeLabels',
    'ItemTypeLabelsPlural',
    'TestPointTypeLabels',
    'SubitemTypeLabels',
    'PermanentPotentialTypeLabels',
    'SortingOptionLabels',
    'StatusLabels',
    'PipeScheduleLabels',
    'WireGaugeLabels',
    'CurrentUnitLabels',
    'AreaUnitLabels',
    'CurrentDensityUnitLabels',
    'FactorUnitLabels',
    'PotentialUnitLabels',
    'LengthUnitLabels',
    'LengthUnitDescriptionLabels',
    'ResistivityUnitLabels',
    'ResistivityUnitDescriptionLabels',
    'PotentialUnitDescriptionLabels',
    'AnodeMaterialLabels',
    'ReferenceCellTypeLabels',
    'ReferenceCellCodeLabels',
    'IsolationTypeLabels',
    'CouponTypeLabels',
    'PipelineMaterialLabels',
    'PipelineCoatingLabels',
    'IsolationShortedLabels',
    'PipelineProductLabels',
    'PowerSourceLabels',
    'TapOptionLabels',
    'CoarseFineOptionLabels',
    'ExportItemPropertyLabels',
    'ExportSubitemPropertyLabels',
    'CalculatorTypeLabels',
    'CalculatorTypeTitleLabels',
    'CalculatorTypeDescriptionLabels',
    'CalculatorTypeFileNameLabels',
    'MultimeterTypeLabels',
    'TimeUnitLabels',
    'MeasurementTypeLabels',
    'MultimeterCycleLabels',
    'MultimeterSyncModeLabels',
    'ImageSourceLabels',
    'MapLayerFeatureLabels',
    'StrokeColorLabels',
    'StrokeWidthLabels',
    'ExportFormatTypeLabeles',
    'AnodeBedEnclosureTypeLabels',
    'AnodeBedMateriaTypelLabels',
    'AnodeBedTypeLabesl',
    'SubscriptionStatusLabels',
    'FileMimeTypeLabels',
    'ExternalLinkTypeLabels',
    'TestPointReadingOptionLabels',
    'RectifierReadingOptionLabels',
    'PipelineFilterItemLabels',
    'MeasurementPropertyTypeLabels',
    'TimeSyncSourceLabels',
    'MultimeterModeLabels',
    'MultimeterRangeLabels'
])
export const DefaultNames = createLabelMap('DefaultNames', {
    [ItemTypes.TEST_POINT]: 'TP',
    [ItemTypes.RECTIFIER]: 'RT',
    [ItemTypes.PIPELINE]: 'Pipeline',
    [SubitemTypes.PIPELINE]: 'Pipe lead',
    [SubitemTypes.ANODE]: 'Anode lead',
    [SubitemTypes.REFERENCE_CELL]: 'Ref cell',
    [SubitemTypes.COUPON]: 'Coupon',
    [SubitemTypes.RISER]: 'Riser',
    [SubitemTypes.SHUNT]: 'Shunt',
    [SubitemTypes.STRUCTURE]: 'Facility',
    [SubitemTypes.ISOLATION]: 'Isolation',
    [SubitemTypes.TEST_LEAD]: 'Test lead',
    [SubitemTypes.BOND]: 'Bond',
    [SubitemTypes.CIRCUIT]: 'Circuit',
    [SubitemTypes.ANODE_BED]: 'Anode bed',
    [SubitemTypes.SOIL_RESISTIVITY]: 'Soil resistivity'
})

export const PipeDiameterLabels = createLabelMap('PipeDiameterLabels', {
    [PipeDiameters.NPS0_5]: 'NPS ½',
    [PipeDiameters.NPS3_4]: 'NPS ¾',
    [PipeDiameters.NPS1]: 'NPS 1',
    [PipeDiameters.NPS5_4]: 'NPS 1¼',
    [PipeDiameters.NPS3_2]: 'NPS 1½',
    [PipeDiameters.NPS2]: 'NPS 2',
    [PipeDiameters.NPS5_2]: 'NPS 2½',
    [PipeDiameters.NPS3]: 'NPS 3',
    [PipeDiameters.NPS7_2]: 'NPS 3½',
    [PipeDiameters.NPS4]: 'NPS 4',
    [PipeDiameters.NPS5]: 'NPS 5',
    [PipeDiameters.NPS6]: 'NPS 6',
    [PipeDiameters.NPS7]: 'NPS 7',
    [PipeDiameters.NPS8]: 'NPS 8',
    [PipeDiameters.NPS9]: 'NPS 9',
    [PipeDiameters.NPS10]: 'NPS 10',
    [PipeDiameters.NPS12]: 'NPS 12',
    [PipeDiameters.NPS14]: 'NPS 14',
    [PipeDiameters.NPS16]: 'NPS 16',
    [PipeDiameters.NPS18]: 'NPS 18',
    [PipeDiameters.NPS20]: 'NPS 20',
    [PipeDiameters.NPS22]: 'NPS 22',
    [PipeDiameters.NPS24]: 'NPS 24',
    [PipeDiameters.NPS26]: 'NPS 26',
    [PipeDiameters.NPS28]: 'NPS 28',
    [PipeDiameters.NPS30]: 'NPS 30',
    [PipeDiameters.NPS32]: 'NPS 32',
    [PipeDiameters.NPS34]: 'NPS 34',
    [PipeDiameters.NPS36]: 'NPS 36',
    [PipeDiameters.NPS40]: 'NPS 40',
    [PipeDiameters.NPS42]: 'NPS 42',
    [PipeDiameters.NPS44]: 'NPS 44',
    [PipeDiameters.NPS46]: 'NPS 46',
    [PipeDiameters.NPS48]: 'NPS 48',
    [PipeDiameters.NPS52]: 'NPS 52',
    [PipeDiameters.NPS56]: 'NPS 56',
    [PipeDiameters.NPS60]: 'NPS 60',
    [PipeDiameters.NPS64]: 'NPS 64',
    [PipeDiameters.NPS68]: 'NPS 68',
    [PipeDiameters.NPS72]: 'NPS 72',
    [PipeDiameters.NPS76]: 'NPS 76',
    [PipeDiameters.NPS80]: 'NPS 80',
    [PipeDiameters.NPS88]: 'NPS 88'
})

export const WireColorLabels = createLabelMap('WireColorLabels', {
    [WireColors.BLACK]: 'Black',
    [WireColors.BLACK_RED]: 'Black w/ red',
    [WireColors.DARK_BLUE]: 'Dark blue',
    [WireColors.GREEEN_YELLOW]: 'Green w/ yellow',
    [WireColors.GREEN]: 'Green',
    [WireColors.LIGHT_BLUE]: 'Light blue',
    [WireColors.PINK]: 'Pink',
    [WireColors.RED]: 'Red',
    [WireColors.WHITE]: 'White',
    [WireColors.WHITE_BLACK]: 'White w/ black',
    [WireColors.WHITE_RED]: 'White w/ red',
    [WireColors.YELLOW]: 'Yellow'
})

export const ItemTypeLabels = createLabelMap('ItemTypeLabels', {
    [ItemTypes.TEST_POINT]: 'Test point',
    [ItemTypes.RECTIFIER]: 'Rectifier',
    [ItemTypes.PIPELINE]: 'Pipeline'
})

export const ItemTypeLabelsPlural = createLabelMap('ItemTypeLabelsPlural', {
    [ItemTypes.TEST_POINT]: 'Test points',
    [ItemTypes.RECTIFIER]: 'Rectifiers',
    [ItemTypes.PIPELINE]: 'Pipelines'
})

export const TestPointTypeLabels = createLabelMap('TestPointTypeLabels', {
    [TestPointTypes.FIELD_NOTE]: 'Field note',
    [TestPointTypes.HEADER]: 'Piping',
    [TestPointTypes.JUNCTION_BOX]: 'Junction box',
    [TestPointTypes.TEST_STATION]: 'Test station',
    [TestPointTypes.MEASURMENT]: 'Measurement'
})

export const SubitemTypeLabels = createLabelMap('SubitemTypeLabels', {
    [SubitemTypes.ANODE]: 'Anode test lead',
    [SubitemTypes.BOND]: 'Bond',
    [SubitemTypes.CIRCUIT]: 'Rectifier circuit',
    [SubitemTypes.COUPON]: 'Coupon',
    [SubitemTypes.ISOLATION]: 'Isolation assembly',
    [SubitemTypes.PIPELINE]: 'Pipeline test lead',
    [SubitemTypes.REFERENCE_CELL]: 'Stationary reference lead',
    [SubitemTypes.RISER]: 'Pipeline riser',
    [SubitemTypes.SHUNT]: 'Shunt',
    [SubitemTypes.STRUCTURE]: 'Foreign structure',
    [SubitemTypes.TEST_LEAD]: 'Test lead',
    [SubitemTypes.ANODE_BED]: 'Anode bed',
    [SubitemTypes.SOIL_RESISTIVITY]: 'Soil resistivity test'
})

export const PermanentPotentialTypeLabels = createLabelMap('PermanentPotentialTypeLabels', {
    [PermanentPotentialTypes.ON]: 'On',
    [PermanentPotentialTypes.OFF]: 'Off',
    [PermanentPotentialTypes.AC]: 'AC',
    [PermanentPotentialTypes.DEPOL]: 'Native',
    [PermanentPotentialTypes.CONNECTED]: 'Connected',
    [PermanentPotentialTypes.DISCONNECTED]: 'Disconnected'
})

export const SortingOptionLabels = createLabelMap('SortingOptionLabels', {
    [SortingOptions.ASCENDING_NAME]: 'Name: A - Z',
    [SortingOptions.DESCENDING_NAME]: 'Name: Z - A',
    [SortingOptions.NEW_TO_OLD]: 'Date modified: Newest first',
    [SortingOptions.OLD_TO_NEW]: 'Date modified: Oldest first',
    [SortingOptions.NEAREST]: 'Location: Nearest first',
})

export const StatusLabels = createLabelMap('StatusLabels', {
    [ItemStatuses.GOOD]: 'Pass',
    [ItemStatuses.ATTENTION]: 'Alert',
    [ItemStatuses.BAD]: 'Problem',
    [ItemStatuses.UNKNOWN]: 'Unchecked'
})

export const PipeScheduleLabels = createLabelMap('PipeScheduleLabels', {
    [PipeSchedules.S10]: '10',
    [PipeSchedules.S20]: '20',
    [PipeSchedules.S30]: '30',
    [PipeSchedules.STD]: 'STD',
    [PipeSchedules.S40]: '40',
    [PipeSchedules.S60]: '60',
    [PipeSchedules.XS]: 'XS',
    [PipeSchedules.S80]: '80',
    [PipeSchedules.S100]: '100',
    [PipeSchedules.S120]: '120',
    [PipeSchedules.S140]: '140',
    [PipeSchedules.S160]: '160',
    [PipeSchedules.XXS]: 'XXS'
})

export const WireGaugeLabels = createLabelMap('WireGaugeLabels', {
    [WireGauges.AVG0_PLUS]: '> 0 AWG',
    [WireGauges.AVG0]: '0 AWG',
    [WireGauges.AVG1]: '1 AWG',
    [WireGauges.AVG2]: '2 AWG',
    [WireGauges.AVG3]: '3 AWG',
    [WireGauges.AVG4]: '4 AWG',
    [WireGauges.AVG5]: '5 AWG',
    [WireGauges.AVG6]: '6 AWG',
    [WireGauges.AVG7]: '7 AWG',
    [WireGauges.AVG8]: '8 AWG',
    [WireGauges.AVG9]: '9 AWG',
    [WireGauges.AVG10]: '10 AWG',
    [WireGauges.AVG11]: '11 AWG',
    [WireGauges.AVG12]: '12 AWG',
    [WireGauges.AVG13]: '13 AWG',
    [WireGauges.AVG14]: '14 AWG',
    [WireGauges.AVG15]: '15 AWG',
    [WireGauges.AVG16]: '16 AWG',
    [WireGauges.AVG17]: '17 AWG',
    [WireGauges.AVG17_MINUS]: '< 17 AWG'
})

export const CurrentUnitLabels = createLabelMap('CurrentUnitLabels', {
    [CurrentUnits.AMPS]: 'A',
    [CurrentUnits.MILI_AMPS]: 'mA',
    [CurrentUnits.MICRO_AMPS]: '\u00B5A',
})

export const AreaUnitLabels = createLabelMap('AreaUnitLabels', {
    [AreaUnits.CENTIMETER_SQUARE]: 'cm2',
    [AreaUnits.METER_SQUARE]: 'm2'
})

export const CurrentDensityUnitLabels = createLabelMap('CurrentDensityUnitLabels', {
    [CurrentDensityUnits.AMPS_OVER_CM_SQUARE]: 'A/cm2',
    [CurrentDensityUnits.AMPS_OVER_METER_SQUARE]: 'A/m2',
    [CurrentDensityUnits.MILI_AMPS_OVER_CM_SQUARE]: 'mA/cm2',
    [CurrentDensityUnits.MILI_AMPS_OVER_METER_SQUARE]: 'mA/m2'
})

export const FactorUnitLabels = createLabelMap('FactorUnitLabels', {
    [FactorUnits.AMPS_OVER_MILIVOLTS]: 'A/mV',
    [FactorUnits.AMPS_OVER_VOLTS]: 'A/V',
    [FactorUnits.MILIVOLTS_OVER_AMPS]: 'mV/A',
    [FactorUnits.VOLTS_OVER_AMPS]: 'V/A'
})

export const PotentialUnitLabels = createLabelMap('PotentialUnitLabels', {
    [PotentialUnits.MILIVOLTS]: 'mV',
    [PotentialUnits.NEGATIVE_MILIVOLTS]: '-mV',
    [PotentialUnits.NEGATIVE_VOLTS]: '-V',
    [PotentialUnits.VOLTS]: 'V'
})

export const LengthUnitLabels = createLabelMap('LengthUnitLabels', {
    [LengthUnits.CENTIMETERS]: 'cm',
    [LengthUnits.METERS]: 'm',
    [LengthUnits.FEET]: 'ft'
})

export const LengthUnitDescriptionLabels = createLabelMap('LengthUnitDescriptionLabels', {
    [LengthUnits.CENTIMETERS]: 'Centimeter',
    [LengthUnits.METERS]: 'Meter',
    [LengthUnits.FEET]: 'Foot'
})

export const ResistivityUnitLabels = createLabelMap('ResistivityUnitLabels', {
    [ResistivityUnits.OHM_CENTIMITTERS]: '\u03A9-cm',
    [ResistivityUnits.OHM_FEET]: '\u03A9-ft',
    [ResistivityUnits.OHM_METERS]: '\u03A9-m'
})

export const ResistivityUnitDescriptionLabels = createLabelMap('ResistivityUnitDescriptionLabels', {
    [ResistivityUnits.OHM_CENTIMITTERS]: 'Ohm-centimeter',
    [ResistivityUnits.OHM_FEET]: 'Ohm-foot',
    [ResistivityUnits.OHM_METERS]: 'Ohm-meter'
})


export const PotentialUnitDescriptionLabels = createLabelMap('PotentialUnitDescriptionLabels', {
    [PotentialUnits.MILIVOLTS]: 'Millivolts',
    [PotentialUnits.NEGATIVE_MILIVOLTS]: 'Neg. milivolts',
    [PotentialUnits.NEGATIVE_VOLTS]: 'Neg. volts',
    [PotentialUnits.VOLTS]: 'Volts'
})

export const AnodeMaterialLabels = createLabelMap('AnodeMaterialLabels', {
    [AnodeMaterials.ALUMINUM]: 'Aluminum',
    [AnodeMaterials.MAGNEZIUM]: 'Magnesium',
    [AnodeMaterials.OTHER]: 'Other',
    [AnodeMaterials.ZINC]: 'Zinc'
})

export const ReferenceCellTypeLabels = createLabelMap('ReferenceCellTypeLabels', {
    [ReferenceCellTypes.COPPER_SULFATE]: 'Copper-sulfate',
    [ReferenceCellTypes.NORMAL_HYDROGEN]: 'Normal hydrogen',
    [ReferenceCellTypes.SATURATED_CALOMEL]: 'Saturated calomel',
    [ReferenceCellTypes.SILVER_CHLORIDE]: 'Silver-chloride',
    [ReferenceCellTypes.ZINC]: 'Zinc'
})

export const ReferenceCellCodeLabels = createLabelMap('ReferenceCellCodeLabels', {
    [ReferenceCellTypes.COPPER_SULFATE]: 'CSE',
    [ReferenceCellTypes.NORMAL_HYDROGEN]: 'NHE',
    [ReferenceCellTypes.SATURATED_CALOMEL]: 'SCE',
    [ReferenceCellTypes.SILVER_CHLORIDE]: 'SSC',
    [ReferenceCellTypes.ZINC]: 'ZRE'
})

export const IsolationTypeLabels = createLabelMap('IsolationTypeLabels', {
    [IsolationTypes.ISOLATION_JOINT]: 'Isolation joint',
    [IsolationTypes.ISOLATION_KIT]: 'Isolation kit',
    [IsolationTypes.OTHER]: 'Other'
})

export const CouponTypeLabels = createLabelMap('CouponTypeLabels', {
    [CouponTypes.AC]: 'AC',
    [CouponTypes.DC]: 'DC'
})

export const PipelineMaterialLabels = createLabelMap('PipelineMaterialLabels', {
    [PipelineMaterials.ALLOY_STEEL]: 'Alloy steel',
    [PipelineMaterials.CARBON_STEEL]: 'Carbon steel',
    [PipelineMaterials.CAST_IRON]: 'Cast iron',
    [PipelineMaterials.COPPER]: 'Copper',
    [PipelineMaterials.HDPE]: 'HDPE',
    [PipelineMaterials.NICKEL]: 'Nickel',
    [PipelineMaterials.PVC]: 'PVC',
    [PipelineMaterials.OTHER]: 'Other'
})

export const PipelineCoatingLabels = createLabelMap('PipelineCoatingLabels', {
    [PipelineCoating.BARE]: 'Bare',
    [PipelineCoating.COATED]: 'Coated'
})

export const IsolationShortedLabels = createLabelMap('IsolationShortedLabels', {
    [IsolationShorted.SHORTED]: 'Shorted',
    [IsolationShorted.NOT_SHORTED]: 'Not shorted'
})

export const PipelineProductLabels = createLabelMap('PipelineProductLabels', {
    [PipelineProducts.GAS]: 'Natural gas',
    [PipelineProducts.OIL]: 'Liquid hydrocarbons',
    [PipelineProducts.WATER]: 'Water',
    [PipelineProducts.OTHER]: 'Other'
})

export const PowerSourceLabels = createLabelMap('PowerSourceLabels', {
    [PowerSources.AC_POWER]: 'AC grid',
    [PowerSources.SOLAR]: 'Solar panel',
    [PowerSources.TEG]: 'TEG',
    [PowerSources.WIND]: 'Wind turbine'
})

export const TapOptionLabels = createLabelMap('TapOptionLabels', {
    [TapOptions.AUTO]: 'Automatic',
    [TapOptions.COARSE_FINE]: 'Coarse-Fine',
    [TapOptions.RESISTOR]: 'VA %'
})

export const CoarseFineOptionLabels = createLabelMap('CoarseFineOptionLabels', {
    [CoarseFineOptions.A]: 'A',
    [CoarseFineOptions.B]: 'B',
    [CoarseFineOptions.C]: 'C',
    [CoarseFineOptions.D]: 'D',
    [CoarseFineOptions.E]: 'E',
    [CoarseFineOptions.F]: 'F',
    [CoarseFineOptions.G]: 'G',
    [CoarseFineOptions.H]: 'H',
    [CoarseFineOptions.I]: 'I',
    [CoarseFineOptions.J]: 'J',
    [CoarseFineOptions.K]: 'K',
    [CoarseFineOptions.D0]: '0',
    [CoarseFineOptions.D1]: '1',
    [CoarseFineOptions.D2]: '2',
    [CoarseFineOptions.D3]: '3',
    [CoarseFineOptions.D4]: '4',
    [CoarseFineOptions.D5]: '5',
    [CoarseFineOptions.D6]: '6',
    [CoarseFineOptions.D7]: '7',
    [CoarseFineOptions.D8]: '8',
    [CoarseFineOptions.D9]: '9',
})

export const ExportItemPropertyLabels = createLabelMap('ExportItemPropertyLabels', {
    [ExportItemProperties.NAME]: 'Name',
    [ExportItemProperties.TEST_POINT_TYPE]: 'Test point type',
    [ExportItemProperties.TIME_MODIFIED]: 'Last time modified',
    [ExportItemProperties.STATUS]: 'Status',
    [ExportItemProperties.LATITUDE]: 'Latitude',
    [ExportItemProperties.LONGITUDE]: 'Longitude',
    [ExportItemProperties.LOCATION]: 'Location',
    [ExportItemProperties.COMMENT]: 'Comment',
    [ExportItemProperties.MATERIAL]: 'Material',
    [ExportItemProperties.NPS]: 'NPS',
    [ExportItemProperties.LICENSE_NUMBER]: 'License number',
    [ExportItemProperties.PRODUCT]: 'Product',
    [ExportItemProperties.MODEL]: 'Model',
    [ExportItemProperties.SERIAL_NUMBER]: 'Serial number',
    [ExportItemProperties.RECTIFIER_OUTPUT]: 'Rectifier output',
    [ExportItemProperties.MAX_VOLTAGE]: 'Max. voltage',
    [ExportItemProperties.MAX_CURRENT]: 'Max. current'
})

export const ExportSubitemPropertyLabels = createLabelMap('ExportSubitemPropertyLabels', {
    [ExportSubitemProperties.VOLTAGE_DROP]: 'Voltage drop',
    [ExportSubitemProperties.CURRENT]: 'Current',
    [ExportSubitemProperties.SHUNT_RATIO]: 'Ratio',
    [ExportSubitemProperties.AREA]: 'Area',
    [ExportSubitemProperties.DENSITY]: 'Density',
    [ExportSubitemProperties.FACTOR]: 'Factor',
    [ExportSubitemProperties.SHORTED]: 'Shorting status',
    [ExportSubitemProperties.VOLTAGE]: 'Voltage',
    [ExportSubitemProperties.TARGET]: 'Target'
})

export const CalculatorTypeLabels = createLabelMap('CalculatorTypeLabels', {
    [CalculatorTypes.COATING]: 'Coating quality',
    [CalculatorTypes.CURRENT_FOUR_WIRE]: 'Current span (4-wire)',
    [CalculatorTypes.CURRENT_TWO_WIRE]: 'Current span (2-wire)',
    [CalculatorTypes.REFERENCE_CELL]: 'Reference converter',
    [CalculatorTypes.SHUNT]: 'Shunt converter',
    [CalculatorTypes.WENNER]: 'Layer resistivity'
})

export const CalculatorTypeTitleLabels = createLabelMap('CalculatorTypeTitleLabels', {
    [CalculatorTypes.COATING]: 'Conductance',
    [CalculatorTypes.CURRENT_FOUR_WIRE]: 'Current span',
    [CalculatorTypes.CURRENT_TWO_WIRE]: 'Current span',
    [CalculatorTypes.REFERENCE_CELL]: 'Reference',
    [CalculatorTypes.SHUNT]: 'Shunt',
    [CalculatorTypes.WENNER]: 'Resistivity'
})

export const CalculatorTypeDescriptionLabels = createLabelMap('CalculatorTypeDescriptionLabels', {
    [CalculatorTypes.COATING]: 'Calculate coating conductance of the pipeline section using ON/OFF potentials and current, and determine coating quality.',
    [CalculatorTypes.CURRENT_FOUR_WIRE]: 'Calculate in-line current using voltage drop between two points and calculated pipe resistance.',
    [CalculatorTypes.CURRENT_TWO_WIRE]: 'Calculate in-line current using pipe diameter and voltage drop between two points.',
    [CalculatorTypes.REFERENCE_CELL]: 'Convert voltage values with reference to different cell types.',
    [CalculatorTypes.SHUNT]: 'Convert voltage drop across a shunt to current using shunt factor or ratio.',
    [CalculatorTypes.WENNER]: 'Calculate resistivity of soil layers using Wenner method and Barnes analysis.'
})

export const CalculatorTypeFileNameLabels = createLabelMap('CalculatorTypeFileNameLabels', {
    [CalculatorTypes.COATING]: 'Coating_conductance',
    [CalculatorTypes.CURRENT_FOUR_WIRE]: 'Current_span_four_wire',
    [CalculatorTypes.CURRENT_TWO_WIRE]: 'Current_span_two_wire',
    [CalculatorTypes.REFERENCE_CELL]: 'Ref_cell_conversion',
    [CalculatorTypes.SHUNT]: 'Shunt_current',
    [CalculatorTypes.WENNER]: 'Wenner_test'
})

export const MultimeterTypeLabels = createLabelMap('MultimeterTypeLabels', {
    [MultimeterTypes.POKIT]: 'Pokit Pro',
    [MultimeterTypes.DVM2130]: 'DVM 2130'
})

export const TimeUnitLabels = createLabelMap('TimeUnitLabels', {
    [TimeUnits.SECONDS]: 's',
    [TimeUnits.MILISECONDS]: 'ms',
    [TimeUnits.MINUTES]: 'm',
    [TimeUnits.HOURS]: 'hr'
})

export const MeasurementTypeLabels = createLabelMap('MeasurementTypeLabels', {
    [MultimeterMeasurementTypes.POTENTIALS]: 'DC Volts',
    [MultimeterMeasurementTypes.VOLTAGE]: 'DC Volts',
    [MultimeterMeasurementTypes.CURRENT]: 'DC Amps',
    [MultimeterMeasurementTypes.COUPON_CURRENT]: 'DC Miliamps',
    [MultimeterMeasurementTypes.VOLTAGE_DROP]: 'DC Milivolts',
    [MultimeterMeasurementTypes.COUPON_CURRENT_AC]: 'AC Miliamps',
    [MultimeterMeasurementTypes.POTENTIALS_AC]: 'AC Volts'
})

export const MultimeterCycleLabels = createLabelMap('MultimeterCycleLabels', {
    [MultimeterCycles.ON]: 'On',
    [MultimeterCycles.OFF]: 'Off'
})

export const MultimeterSyncModeLabels = createLabelMap('MultimeterSyncModeLabels', {
    [MultimeterSyncModes.REAL_TIME]: 'No cycle',
    [MultimeterSyncModes.GPS]: 'Time sync',
    [MultimeterSyncModes.HIGH_LOW]: 'High/Low',
    [MultimeterSyncModes.CYCLED]: 'Shift'
})

export const ImageSourceLabels = createLabelMap('ImageSourceLabels', {
    [ImageSources.CAMERA]: 'Camera',
    [ImageSources.LIBRARY]: 'Library',
    [ImageSources.STORAGE]: 'Storage'
})

export const MapLayerFeatureLabels = createLabelMap('MapLayerFeatureLabels', {
    [MapLayerFeatures.POINT]: 'Point',
    [MapLayerFeatures.LINE]: 'Line',
    [MapLayerFeatures.POLYGON]: 'Polygon'
})

export const StrokeColorLabels = createLabelMap('StrokeColorLabels', {
    [StrokeColors.BLUE]: 'Blue',
    [StrokeColors.GREEN]: 'Green',
    [StrokeColors.ORANGE]: 'Orange',
    [StrokeColors.PURPLE]: 'Purple',
    [StrokeColors.RED]: 'Red',
    [StrokeColors.YELLOW]: 'Yellow'
})

export const StrokeWidthLabels = createLabelMap('StrokeWidthLabels', {
    [StrokeWidths._05PT]: '1 px',
    [StrokeWidths._1PT]: '2 px',
    [StrokeWidths._1_5PT]: '3 px',
    [StrokeWidths._2PT]: '4 px',
    [StrokeWidths._3PT]: '6 px'
})

export const ExportFormatTypeLabeles = createLabelMap('ExportFormatTypeLabeles', {
    [ExportFormatTypes.CSV]: 'Comma Separated File (.csv)',
    [ExportFormatTypes.KML]: 'Keyhole Markup Language File (.kml)'
})

export const AnodeBedEnclosureTypeLabels = createLabelMap('AnodeBedEnclosureTypeLabels', {
    [AnodeBedEnclosureTypes.BURIED]: 'Buried',
    [AnodeBedEnclosureTypes.JUNCTION_BOX]: 'Junction box',
    [AnodeBedEnclosureTypes.UNDEGROUND_BOX]: 'Underground box'
})

export const AnodeBedMateriaTypelLabels = createLabelMap('AnodeBedMateriaTypelLabels', {
    [AnodeBedMaterialTypes.ALUMINUM]: 'Aluminum',
    [AnodeBedMaterialTypes.CONDUCTIVE_POLYMER]: 'Conductive polymer',
    [AnodeBedMaterialTypes.GRAPHITE]: 'Graphite',
    [AnodeBedMaterialTypes.MAGNETITE]: 'Magnetite',
    [AnodeBedMaterialTypes.MIXED_METAL_OXIDE]: 'Mixed metal oxide',
    [AnodeBedMaterialTypes.PLATINUM]: 'Platinum',
    [AnodeBedMaterialTypes.SCRAP_METAL]: 'Scrap metal'
})

export const AnodeBedTypeLabesl = createLabelMap('AnodeBedTypeLabesl', {
    [AnodeBedTypes.DEEP_VERTICAL]: 'Deep vertical',
    [AnodeBedTypes.SHALLOW_HORIZONTAL]: 'Shallow horizontal',
    [AnodeBedTypes.SHALLOW_VERTICAL]: 'Shallow vertical'
})

export const SubscriptionStatusLabels = createLabelMap('SubscriptionStatusLabels', {
    [SubscriptionStatuses.GRANTED]: 'Active',
    [SubscriptionStatuses.NOT_GRANTED]: 'Not active',
    [SubscriptionStatuses.UNKNOWN_GRANTED]: 'Active',
    [SubscriptionStatuses.UNKNOWN_NOT_GRANTED]: 'Needs attention',
    [SubscriptionStatuses.PENDING]: 'Pending'
})

export const FileMimeTypeLabels = createLabelMap('FileMimeTypeLabels', {
    [FileMimeTypes.BINARY]: 'Binary',
    [FileMimeTypes.CSV]: 'CSV',
    [FileMimeTypes.GPX]: 'GPX',
    [FileMimeTypes.IMAGE]: 'Image',
    [FileMimeTypes.JSON]: 'JSON',
    [FileMimeTypes.KML]: 'KML',
    [FileMimeTypes.TEXT]: 'Text',
    [FileMimeTypes.ZIP]: 'ZIP'
})

export const ExternalLinkTypeLabels = createLabelMap('ExternalLinkTypeLabels', {
    [ExternalLinkTypes.NFC]: 'NFC label',
    [ExternalLinkTypes.QR_CODE]: 'QR code'
})

export const TestPointReadingOptionLabels = createLabelMap('TestPointReadingOptionLabels', {
    [TestPointReadingOptions.ON_OFF]: 'Potentials: ON/OFF',
    [TestPointReadingOptions.OFF_NATIVE]: 'Potentials: OFF/Native',
    [TestPointReadingOptions.SHUNT_CURRENT]: 'Current: Shunts and bonds',
    [TestPointReadingOptions.CURRENT_DENSITY]: 'Current density: Coupons',
    [TestPointReadingOptions.SHORTING_CURRENT]: 'Shorting current: Isolation'
})

export const RectifierReadingOptionLabels = createLabelMap('RectifierReadingOptionLabels', {
    [RectifierReadingOptions.CURRENT_VOLTAGE]: 'Current and voltage',
    [RectifierReadingOptions.TARGET]: 'Current target'
})

export const PipelineFilterItemLabels = createLabelMap('PipelineFilterItemLabels', {
    [PipelineFilterItems.NOT_ASSIGNED]: 'Non-pipelines and unassigned'
})

export const MeasurementPropertyTypeLabels = createLabelMap('MeasurementPropertyTypeLabels', {
    [MeasurementPropertyTypes.POTENTIAL]: 'Potentials (DC)',
    [MeasurementPropertyTypes.POTENTIAL_AC]: 'Potentials (AC)',
    [MeasurementPropertyTypes.VOLTAGE]: 'Voltage (DC)',
    [MeasurementPropertyTypes.COUPON_CURRENT]: 'Coupon current (DC)',
    [MeasurementPropertyTypes.COUPON_CURRENT_AC]: 'Coupon current (AC)',
    [MeasurementPropertyTypes.VOLTAGE_DROP]: 'Voltage drop (DC)'
})

export const TimeSyncSourceLabels = createLabelMap('TimeSyncSourceLabels', {
    [TimeSyncSources.GPS]: 'GPS',
    [TimeSyncSources.NTP]: 'NTP',
    [TimeSyncSources.MIXED]: 'Mixed'
})

export const MultimeterModeLabels = createLabelMap('MultimeterModeLabels', {
    [MultimeterModes.POKIT.AC_AMPS]: 'Current AC',
    [MultimeterModes.POKIT.DC_AMPS]: 'Current DC',
    [MultimeterModes.POKIT.DC_VOLTS]: 'Voltage DC',
    [MultimeterModes.POKIT.AC_VOLTS]: 'Voltage AC',
    [MultimeterModes.DVM2130.DC_VOLTS]: 'Voltage DC',
    [MultimeterModes.DVM2130.AC_VOLTS]: 'Voltage AC',
    [MultimeterModes.POKIT.IDLE]: 'Idle',
    [MultimeterModes.DVM2130.IDLE]: 'Idle'
})

export const MultimeterRangeLabels = createLabelMap('MultimeterRangeLabels', {
    [MultimeterVoltageRanges.POKIT.AUTO]: 'Auto',
    [MultimeterVoltageRanges.POKIT._250MV]: '250 mV',
    [MultimeterVoltageRanges.POKIT._2V]: '2 V',
    [MultimeterVoltageRanges.POKIT._10V]: '10 V',
    [MultimeterVoltageRanges.POKIT._30V]: '30 V',
    [MultimeterVoltageRanges.POKIT._60V]: '60 V',
    [MultimeterVoltageRanges.POKIT._125V]: '125 V',
    [MultimeterVoltageRanges.POKIT._400V]: '400 V',
    [MultimeterVoltageRanges.POKIT._600V]: '600 V',
    [MultimeterCurrentRanges.POKIT.AUTO]: 'Auto',
    [MultimeterCurrentRanges.POKIT._500uA]: '0.5 mA',
    [MultimeterCurrentRanges.POKIT._2mA]: '2 mA',
    [MultimeterCurrentRanges.POKIT._10mA]: '10 mA',
    [MultimeterCurrentRanges.POKIT._125mA]: '125 mA',
    [MultimeterCurrentRanges.POKIT._300mA]: '300 mA',
    [MultimeterCurrentRanges.POKIT._3A]: '3 A',
    [MultimeterCurrentRanges.POKIT._10A]: '10 A',
    [MultimeterVoltageRanges.DVM2130._500mV]: '500 mV',
    [MultimeterVoltageRanges.DVM2130._5V]: '5 V',
    [MultimeterVoltageRanges.DVM2130._250V]: '250  V',
})
