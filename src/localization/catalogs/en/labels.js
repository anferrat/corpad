import * as labelModule from '../../../constants/labels'
import { labelMapNames } from '../../../constants/labels'

const pick = names => Object.fromEntries(names.map(name => [name, { ...labelModule[name] }]))

export const sections = {
    common: pick([
        'StatusLabels',
        'SortingOptionLabels',
        'TimeUnitLabels',
        'SubscriptionStatusLabels',
        'FileMimeTypeLabels',
        'ExternalLinkTypeLabels'
    ]),
    navigation: pick([]),
    survey: pick([
        'DefaultNames',
        'ItemTypeLabels',
        'ItemTypeLabelsPlural',
        'TestPointTypeLabels',
        'SubitemTypeLabels',
        'PermanentPotentialTypeLabels',
        'PipelineFilterItemLabels',
        'TestPointReadingOptionLabels',
        'RectifierReadingOptionLabels'
    ]),
    measurements: pick([
        'PipeDiameterLabels',
        'PipeScheduleLabels',
        'CurrentUnitLabels',
        'AreaUnitLabels',
        'CurrentDensityUnitLabels',
        'FactorUnitLabels',
        'PotentialUnitLabels',
        'LengthUnitLabels',
        'LengthUnitDescriptionLabels',
        'ResistivityUnitLabels',
        'ResistivityUnitDescriptionLabels',
        'PotentialUnitDescriptionLabels'
    ]),
    items: pick([
        'WireColorLabels',
        'WireGaugeLabels',
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
        'AnodeBedEnclosureTypeLabels',
        'AnodeBedMateriaTypelLabels',
        'AnodeBedTypeLabesl'
    ]),
    importExport: pick([
        'ExportItemPropertyLabels',
        'ExportSubitemPropertyLabels',
        'ExportFormatTypeLabeles'
    ]),
    calculator: pick([
        'CalculatorTypeLabels',
        'CalculatorTypeTitleLabels',
        'CalculatorTypeDescriptionLabels',
        'CalculatorTypeFileNameLabels'
    ]),
    multimeter: pick([
        'MultimeterTypeLabels',
        'MeasurementPropertyTypeLabels',
        'MeasurementTypeLabels',
        'MultimeterCycleLabels',
        'MultimeterSyncModeLabels',
        'MultimeterModeLabels',
        'MultimeterRangeLabels',
        'TimeSyncSourceLabels'
    ]),
    map: pick([
        'ImageSourceLabels',
        'MapLayerFeatureLabels',
        'StrokeColorLabels',
        'StrokeWidthLabels'
    ])
}

export const labels = Object.assign({}, ...Object.values(sections))

const missingLabels = labelMapNames.filter(name => !labels[name])
if (missingLabels.length > 0)
    throw new Error(`Uncategorized label maps: ${missingLabels.join(', ')}`)
