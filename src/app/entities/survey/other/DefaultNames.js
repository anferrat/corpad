import { ItemTypes } from "../../../../constants/global"
import { SubitemTypes } from "../../../../constants/global"


export const defaultNames = Object.freeze({
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
    [SubitemTypes.SOIL_RESISTIVITY]: 'Soil resistivity',
})