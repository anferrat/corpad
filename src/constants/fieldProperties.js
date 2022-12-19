
import { potentialUnits, currentUnits, statuses, testPointTypes, testPointTypeCodes, wireColorList, tapOptions, powerSourceList, pipeMaterials, pipeCoating, pipeProducts, wireGaugesList, anodeMaterialList, referenceCellTypes } from "./constants"
import { getColor } from "../styles/colors"
import { npsList } from "./thicknessTable"

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
    constructor(label, placeholder, invalidCaption, keyboardType, itemList, accessoryList) {
        this.label = label
        this.placeholder = placeholder
        this.invalidCaption = invalidCaptions[invalidCaption]
        this.keyboardType = keyboardType
        this.itemList = itemList
        this.accessoryList = accessoryList
    }
}

export const fieldProperties = {
    name: new FieldProperty('Name', '', 0, 'default', [], null),
    status: new FieldProperty('Status', 'Select status', null, 'default', statuses, statuses.map((_, i) => ({ icon: 'circle', pack: 'cp', fill: getColor(i) }))),
    testPointType: new FieldProperty('Test point type', 'Select type', 6, 'default', testPointTypes, testPointTypeCodes.map(t => ({ icon: t, pack: 'cp' }))),
    wireColor: new FieldProperty('Wire color', 'Select color', 6, 'default', wireColorList.map(w => w.title), wireColorList.map(w => ({ icon: 'color-circle-double', pack: 'cp', fill: w.color[0], fill2: w.color[1] ?? w.color[0] }))),
    wireGauge: new FieldProperty('Wire gauge', 'Select gauge', 6, 'default', wireGaugesList, []),
    potential: new FieldProperty(null, null, 4, 'numeric', [], null),
    latitude: new FieldProperty('Latitude', 'xx.xxxx', 2, 'numeric', [], null),
    longitude: new FieldProperty('Longitude', 'xx.xxxx', 3, 'numeric', [], null),
    location: new FieldProperty('Location', 'Location descripton', 1, 'default', [], null),
    comment: new FieldProperty('Comments', 'Type comments here', 1, 'default', [], null),
    model: new FieldProperty('Model', 'Rectifier model', 1, 'default', [], null),
    serialNumber: new FieldProperty('Serial number', 'Rectifier serial number', null, 'default', [], null),
    licenseNumber: new FieldProperty('Licence #', 'e.g. 35388-11', 1, 'default', [], null),
    tapValue: new FieldProperty('VA', '0%', 5, 'numeric', [], null),
    tapFine: new FieldProperty('Fine', '#', null, 'default', tapOptions, tapOptions.map(() => ({ icon: 'hash' }))),
    tapCoarse: new FieldProperty('Coarse', '#', null, 'default', tapOptions, tapOptions.map(() => ({ icon: 'hash' }))),
    powerSource: new FieldProperty('Power source', 'Select source', null, 'default', powerSourceList, []),
    maxVoltage: new FieldProperty('DC Volts', '', 4, 'numeric', [], null),
    maxCurrent: new FieldProperty('DC Apms', '', 4, 'numeric', [], null),
    current: new FieldProperty('Current', null, 4, 'numeric', [], null),
    voltageDrop: new FieldProperty('Voltage drop', null, 4, 'numeric', [], null),
    material: new FieldProperty('Material', 'Select material', null, 'default', pipeMaterials, []),
    coating: new FieldProperty('Coating', 'Select coating', null, 'default', pipeCoating, []),
    product: new FieldProperty('Product', 'Select product', null, 'default', pipeProducts, []),
    nps: new FieldProperty('NPS', 'Select pipe size', null, 'default', npsList, []),
    anodeMaterial: new FieldProperty('Anode material', 'Select material', null, 'default', anodeMaterialList, []),
    rcType: new FieldProperty('Reference cell type', 'Select type', null, 'default', referenceCellTypes, [])
}