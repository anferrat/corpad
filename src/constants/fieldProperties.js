
import { potentialUnits, currentUnits, statuses, testPointTypes, testPointTypeCodes, wireColorList } from "./constants"
import { getColor } from "../styles/colors"

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
    constructor(label, placeholder, invalidCaption, unitList, standardUnitIndex, keyboardType, itemList, accessoryList) {
        this.label = label
        this.placeholder = placeholder
        this.invalidCaption = invalidCaptions[invalidCaption]
        this.unitList = unitList === null ? [] : unitList
        this.standardUnitIndex = standardUnitIndex
        this.keyboardType = keyboardType
        this.itemList = itemList
        this.accessoryList = accessoryList
    }
}

export const fieldProperties = {
    name: new FieldProperty('Name', '', 0, null, null, 'default', [], null),
    status: new FieldProperty('Status', 'Select status', null, null, null, 'default', statuses, statuses.map((_, i) => ({ icon: 'circle', pack: 'cp', fill: getColor(i) }))),
    testPointType: new FieldProperty('Test point type', 'Select type', 6, null, null, 'default', testPointTypes, testPointTypeCodes.map(t => ({ icon: t, pack: 'cp' }))),
    wireColor: new FieldProperty('Wire color', 'Select color', 6, null, null, 'default', wireColorList.map(w => w.title), wireColorList.map(w => ({ icon: 'circle', pack: 'cp', fill: w.color[0], fill2: w.color[1] }))),
    potential: new FieldProperty('Potential', null, 4, potentialUnits, 3, 'numeric', [], null),
    latitude: new FieldProperty('Latitude', 'xx.xxxx', 2, null, null, 'numeric', [], null),
    longitude: new FieldProperty('Longitude', 'xx.xxxx', 3, null, null, 'numeric', [], null),
    location: new FieldProperty('Location', 'Location descripton', 1, null, null, 'default', [], null),
    comment: new FieldProperty('Comments', 'Type comments here', 1, null, null, 'default', [], null),
    model: new FieldProperty('Model', 'Rectifier model', 1, null, null, 'default', [], null),
    serialNumber: new FieldProperty('Serial number', 'Rectifier serial number', 1, null, null, 'default', [], null),
    licenseNumber: new FieldProperty('Licence #', 'e.g. 35388-11', 1, null, null, 'default', [], null),
    tapValue: new FieldProperty('VA', '0%', 5, null, null, 'numeric', [], null),
    current: new FieldProperty('Current', null, 4, currentUnits, 2, 'numeric', [], null),
    voltageDrop: new FieldProperty('Voltage drop', null, 4, potentialUnits, 3, 'numeric', [], null)
}