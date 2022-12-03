
import { potentialUnits, currentUnits } from "./constants"

const invalidCaptions = [
    'Name must only contain following characters: A-z, 0-9, -._()# and be less than 40 characters.',
    'Value is too long or using special characters that are not allowed.',
    'Must be between -90 and +90 degrees.',
    'Must be between -180 and +180 degrees.',
    'Must be a number',
    'Must be a number between 0 and 100'
]

export class FieldProperty {
    constructor(label, placeholder, invalidCaption, unitList, standardUnitIndex, keyboardType) {
        this.label = label
        this.placeholder = placeholder
        this.invalidCaption = invalidCaptions[invalidCaption]
        this.unitList = unitList === null ? [] : unitList
        this.standardUnitIndex = standardUnitIndex
        this.keyboardType = keyboardType
    }
}

export const fieldProperties = {
    name: new FieldProperty('Name', 'My name', 0, null, null, 'default'),
    status: new FieldProperty('Status', 'Unknown', null, null, null, 'default'),
    potential: new FieldProperty('Potential', null, 4, potentialUnits, 3, 'numeric'),
    latitude: new FieldProperty('Latitude', 'xx.xxxx', 2, null, null, 'numeric'),
    longitude: new FieldProperty('Longitude', 'xx.xxxx', 3, null, null, 'numeric'),
    location: new FieldProperty('Location', 'Location descripton', 1, null, null, 'default'),
    comment: new FieldProperty('Comments', 'Type comments here', 1, null, null, 'default'),
    model: new FieldProperty('Model', 'Rectifier model', 1, null, null, 'default'),
    serialNumber: new FieldProperty('Serial number', 'Rectifier serial number', 1, null, null, 'default'),
    licenseNumber: new FieldProperty('Licence #', 'e.g. 35388-11', 1, null, null, 'default'),
    tapValue: new FieldProperty('VA', '0%', 5, null, null, 'numeric'),
    current: new FieldProperty('Current', null, 4, currentUnits, 2, 'numeric'),
    voltageDrop: new FieldProperty('Voltage drop', null, 4, potentialUnits, 3, 'numeric')

}