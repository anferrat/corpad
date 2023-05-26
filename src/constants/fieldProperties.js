
import { ItemStatuses, TestPointTypes, WireColors, CoarseFineOptions } from "./global"
import { TestPointTypeIcons } from "./icons"
import { WireColorColors, StatusColors } from "../styles/colors"

const invalidCaptions = [
    'Name must only contain following characters: A-z, 0-9, -._()# and be less than 40 characters.',
    'Value is too long or using special characters that are not allowed.',
    'Must be between -90 and +90 degrees.',
    'Must be between -180 and +180 degrees.',
    'Must be a number',
    'Must be a number between 0 and 100',
    'Select value from the list'
]

export class FieldProperty {
    constructor(label, placeholder, invalidCaption, keyboardType, accessoryList) {
        this.label = label
        this.placeholder = placeholder
        this.invalidCaption = invalidCaptions[invalidCaption]
        this.keyboardType = keyboardType
        this.accessoryList = accessoryList
    }
}


export const fieldProperties = {
    name: new FieldProperty('Name', '', 0, 'default', []),
    status: new FieldProperty('Status', 'Select status', null, 'default', Object.fromEntries(Object.values(ItemStatuses).filter(status => status !== ItemStatuses.NO_STATUS).map(status => [status, { icon: 'circle', pack: 'cp', fill: StatusColors[status] }]))),
    testPointType: new FieldProperty('Test point type', 'Select type', 6, 'default', Object.fromEntries(Object.values(TestPointTypes).map(type => [type, { icon: TestPointTypeIcons[type], pack: 'cp' }]))),
    wireColor: new FieldProperty('Wire color', 'Select color', 6, 'default', Object.fromEntries(Object.values(WireColors).map(color => [color, { icon: 'color-circle-double', pack: 'cp', fill: WireColorColors[color][0], fill2: WireColorColors[color][1] ?? WireColorColors[color][0] }]))),
    wireGauge: new FieldProperty('Wire gauge', 'Select gauge', 6, 'default', []),
    potential: new FieldProperty(null, null, 4, 'numeric', []),
    latitude: new FieldProperty('Latitude', 'xx.xxxx', 2, 'numeric', []),
    longitude: new FieldProperty('Longitude', 'xx.xxxx', 3, 'numeric', []),
    location: new FieldProperty('Location', 'Location descripton', 1, 'default', []),
    comment: new FieldProperty('Comments', 'Type comments here', 1, 'default', []),
    model: new FieldProperty('Model', 'Rectifier model', 1, 'default', []),
    serialNumber: new FieldProperty('Serial number', 'Rectifier serial number', null, 'default', []),
    licenseNumber: new FieldProperty('Licence #', 'e.g. 35388-11', 1, 'default', []),
    tapValue: new FieldProperty('VA', '0%', 5, 'numeric', []),
    tapFine: new FieldProperty('Fine', '#', null, 'default', Object.fromEntries(Object.values(CoarseFineOptions).map(option => [option, { icon: 'hash' }]))),
    tapCoarse: new FieldProperty('Coarse', '#', null, 'default', Object.fromEntries(Object.values(CoarseFineOptions).map(option => [option, { icon: 'hash' }]))),
    powerSource: new FieldProperty('Power source', 'Select source', null, 'default', []),
    maxVoltage: new FieldProperty('DC Volts', null, 4, 'numeric', []),
    maxCurrent: new FieldProperty('DC Apms', null, 4, 'numeric', []),
    current: new FieldProperty('Current', null, 4, 'numeric', []),
    area: new FieldProperty('Area', null, 4, 'numeric', []),
    couponType: new FieldProperty('Coupon type', 'Select type', null, 'default', []),
    voltageDrop: new FieldProperty('Voltage drop', null, 4, 'numeric', []),
    factor: new FieldProperty('Shunt factor', null, 4, 'numeric', []),
    material: new FieldProperty('Material', 'Select material', null, 'default', []),
    coating: new FieldProperty('Coating', 'Select coating', null, 'default', []),
    product: new FieldProperty('Product', 'Select product', null, 'default', []),
    nps: new FieldProperty('NPS', 'Select pipe size', null, 'default', []),
    anodeMaterial: new FieldProperty('Anode material', 'Select material', null, 'default', []),
    rcType: new FieldProperty('Reference cell type', 'Select type', null, 'default', []),
    shorted: new FieldProperty('Shorted', 'Select status', null, 'default', []),
    voltage: new FieldProperty('Voltage', null, 4, 'numeric', []),
    targetMin: new FieldProperty('Current target (Min)', 'Min', 4, 'numeric', []),
    targetMax: new FieldProperty('Current target (Max)', 'Max', 4, 'numeric', []),
}