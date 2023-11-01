import { ItemTypes, ItemStatuses, SubitemTypes, CalculatorTypes, TestPointTypes, SubscriptionStatuses } from './global'

//List of icons that are tightly coupled with constants
export const ItemTypeSingleIcons = Object.freeze({
    [ItemTypes.TEST_POINT]: 'TS',
    [ItemTypes.RECTIFIER]: 'RT',
    [ItemTypes.PIPELINE]: 'PL'
})
export const ItemTypeSingleIconsFilled = Object.freeze({
    [ItemTypes.TEST_POINT]: 'TS-filled',
    [ItemTypes.RECTIFIER]: 'RT-filled',
    [ItemTypes.PIPELINE]: 'PL-filled'
})

export const ItemTypeIcons = Object.freeze({
    [ItemTypes.TEST_POINT]: 'TSS',
    [ItemTypes.RECTIFIER]: 'RT',
    [ItemTypes.PIPELINE]: 'PL'
})

export const ItemTypeIconsFilled = Object.freeze({
    [ItemTypes.TEST_POINT]: 'TSS-filled',
    [ItemTypes.RECTIFIER]: 'RT-filled',
    [ItemTypes.PIPELINE]: 'PL-filled'
})

export const StatusIcons = Object.freeze({
    [ItemStatuses.ATTENTION]: 'alert-triangle-outline',
    [ItemStatuses.BAD]: 'alert-circle-outline',
    [ItemStatuses.UNKNOWN]: 'question-mark-circle-outline',
    [ItemStatuses.GOOD]: 'checkmark-circle-outline'
})

export const SubitemTypeIcons = Object.freeze({
    [SubitemTypes.ANODE]: 'AN',
    [SubitemTypes.BOND]: 'BD',
    [SubitemTypes.CIRCUIT]: 'CT',
    [SubitemTypes.COUPON]: 'CN',
    [SubitemTypes.ISOLATION]: 'IK',
    [SubitemTypes.PIPELINE]: 'PL',
    [SubitemTypes.REFERENCE_CELL]: 'RE',
    [SubitemTypes.RISER]: 'RS',
    [SubitemTypes.SHUNT]: 'SH',
    [SubitemTypes.STRUCTURE]: 'FC',
    [SubitemTypes.TEST_LEAD]: 'OT',
    [SubitemTypes.ANODE_BED]: 'AB',
    [SubitemTypes.SOIL_RESISTIVITY]: 'SR'
})

export const SubitemTypeIconsFilled = Object.freeze({
    [SubitemTypes.ANODE]: 'AN-filled',
    [SubitemTypes.BOND]: 'BD-filled',
    [SubitemTypes.CIRCUIT]: 'CT-filled',
    [SubitemTypes.COUPON]: 'CN-filled',
    [SubitemTypes.ISOLATION]: 'IK-filled',
    [SubitemTypes.PIPELINE]: 'PL-filled',
    [SubitemTypes.REFERENCE_CELL]: 'RE-filled',
    [SubitemTypes.RISER]: 'RS-filled',
    [SubitemTypes.SHUNT]: 'SH-filled',
    [SubitemTypes.STRUCTURE]: 'FC-filled',
    [SubitemTypes.TEST_LEAD]: 'OT-filled',
    [SubitemTypes.ANODE_BED]: 'AB-filled',
    [SubitemTypes.SOIL_RESISTIVITY]: 'SR-filled'
})

export const CalculatorTypeIcons = Object.freeze({
    [CalculatorTypes.COATING]: 'coating',
    [CalculatorTypes.CURRENT_FOUR_WIRE]: '4pin',
    [CalculatorTypes.CURRENT_TWO_WIRE]: '2pin',
    [CalculatorTypes.REFERENCE_CELL]: 'swap',
    [CalculatorTypes.SHUNT]: 'swap',
    [CalculatorTypes.WENNER]: 'layers-outline'
})

export const CalculatorTypeIconPacks = Object.freeze({
    [CalculatorTypes.COATING]: 'cp',
    [CalculatorTypes.CURRENT_FOUR_WIRE]: 'cp',
    [CalculatorTypes.CURRENT_TWO_WIRE]: 'cp',
    [CalculatorTypes.REFERENCE_CELL]: null,
    [CalculatorTypes.SHUNT]: null,
    [CalculatorTypes.WENNER]: null
})

export const TestPointTypeIcons = Object.freeze({
    [TestPointTypes.TEST_STATION]: 'TS',
    [TestPointTypes.JUNCTION_BOX]: 'JB',
    [TestPointTypes.HEADER]: 'HD',
    [TestPointTypes.FIELD_NOTE]: 'FN',
    [TestPointTypes.MEASURMENT]: 'MN'
})

export const ExportMarkerSymbols = Object.freeze({
    [ItemTypes.TEST_POINT]:
    {
        [TestPointTypes.FIELD_NOTE]: 'c',
        [TestPointTypes.TEST_STATION]: 't',
        [TestPointTypes.HEADER]: 'p',
        [TestPointTypes.MEASURMENT]: 'm',
        [TestPointTypes.JUNCTION_BOX]: 'j'
    },
    [ItemTypes.RECTIFIER]: 'r'

})

export const SubscriptionStatusIcons = Object.freeze({
    [SubscriptionStatuses.GRANTED]: 'checkmark-circle-2',
    [SubscriptionStatuses.NOT_GRANTED]: 'close-circle',
    [SubscriptionStatuses.UNKNOWN_GRANTED]: 'checkmark-circle-2',
    [SubscriptionStatuses.UNKNOWN_NOT_GRANTED]: 'alert-triangle',
    [SubscriptionStatuses.PENDING]: 'question-mark-circle'
})