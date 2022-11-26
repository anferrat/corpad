import { testPointTypes, statusInfo, powerSourceList, tapOptions, pipeCoating, pipeDiameterList, pipeMaterials, pipeProducts, wireColorList, wireGaugesList, anodeMaterialList, isolationAssemblyTypes, referenceCellTypes, areaUnits, currentUnits, currentDensityUnits, potentialUnits } from '../constants/constants'
import fieldValidation from '../components/fieldValidation'
/*
class Input - describes item property parameters when importing text data from csv file.
    importType: 1 - use default value, 0 - use falue from data with corresponding fieldIndex, 2 (name fields only) - use default field name
    defaultValue - value used when importType is 0. Static value for all items. Contains index of itemlist in case of class Select
    fieldIndex - index of field in fields array if importType is 1. In this case values will be populated from csv data from corresponding field
    unit - index of unit of UnitList. Indicates what is the unit of imported values for conversion purposes. Values stored in DB in standard units.
    unitList - list of available units for the property

class Select - describes item property parameters when importing data that must be converted to index the list of values. (eg. status, testPointType)
    same props as Input class
    itemList - array of available result values. 
    attributeList - list of attributes.

class Attribute - matches index value of an item in itemList with the one or many indexes of the values of selected field from csv
index - index value from itemList
mappedIndexes - indexes of values from field
*/

class Attribute {
    constructor(index, mappedIndexes) {
        this.index = index
        this.mappedIndexes = mappedIndexes
    }
}

export class Input {
    constructor(importType = 1, unit = null, unitList = [], defaultValue = null, fieldIndex = null, valid = true) {
        this.importType = importType
        this.defaultValue = defaultValue
        this.fieldIndex = fieldIndex
        this.unit = unit
        this.unitList = unitList
        this.valid = valid
    }

    setImportType(type) {
        if (type === 0 || type === 1 || type === 2)
            if (type === 0)
                return new Input(type, this.unit, this.unitList, this.defaultValue, null, true)
            else if (type === 1)
                return new Input(type, this.unit, this.unitList, null, this.fieldIndex, true)
            else
                return new Input(type, this.unit, this.unitList, null, null, true)
        else return this
    }

    setFieldIndex(index) {
        if (!isNaN(index) || index === null)
            return new Input(this.importType, this.unit, this.unitList, this.defaultValue, index, this.valid)
        else return this
    }

    setDefaultValue(value) {
        this.defaultValue = value
        return this
    }

    validate(value, property) {
        return fieldValidation(value, property, property === 'name')
    }
}

export class Select extends Input {
    constructor({ itemList = [], attributeMap = [], importType = 0, unit = null, unitList = [], defaultValue = null, fieldIndex = null, valid = true }) {
        super(importType, unit, unitList, defaultValue, fieldIndex, valid)
        this.itemList = itemList
        this.attributeMap = attributeMap
    }
}

export class ITEM {
    constructor(itemType) {
        this.name = new Input(2)
        if (itemType === 'TEST_POINT') {
            this.testPointType = new Select({ itemList: testPointTypes })
            this.location = new Input()
            this.latitude = new Input()
            this.longitude = new Input()
            this.comment = new Input()
            this.status = new Select({ itemList: statusInfo.map(s => s.title) })
        }
        else if (itemType === 'RECTIFIER') {
            this.location = new Input()
            this.latitude = new Input()
            this.longitude = new Input()
            this.comment = new Input()
            this.status = new Select({ itemList: statusInfo.map(s => s.title) })
            this.model = new Input()
            this.serialNumber = new Input()
            this.powerSource = new Select({ itemList: powerSourceList })
            this.acVoltage = new Input()
            this.acCurrent = new Input()
            this.tapSetting = null
            this.tapValue = new Input()
            this.tapCoarse = new Select({ itemList: tapOptions })
            this.tapFine = new Select({ itemList: tapOptions })
            this.maxVoltage = new Input()
            this.maxCurrent = new Input()
        }
        else if (itemType === 'PIPELINE') {
            this.nps = new Select({ itemList: pipeDiameterList })
            this.material = new Select({ itemList: pipeMaterials })
            this.coating = new Select({ itemList: pipeCoating })
            this.licenseNumber = new Input()
            this.product = new Select({ itemList: pipeProducts })
            this.comment = new Input()
        }
    }

    setPropertyFieldIndex(property, newIndex) {
        this[property] = this[property].setFieldIndex(newIndex)
        return this
    }

    setProperty(property, { importType, defaultValue, fieldIndex, unit, unitList }) {
        if (importType === 0)
            this[property] = new Input(importType, unit, unitList, defaultValue, null, true)
        else if (importType === 1)
            this[property] = new Input(importType, unit, unitList, null, fieldIndex, true)
        else if (importType === 2 && property === 'name')
            this[property] = new Input(importType, unit, unitList)
        return this
    }

    setSelectProperty(property, selectObject) {
        if (selectObject.importType === 0)
            this[property] = new Select({ ...selectObject, attributeMap: [], fieldIndex: null, valid: true })
        else if (selectObject.importType === 1)
            this[property] = new Select({ ...selectObject, defaultValue: null, valid: true })
        return this
    }
}

export class POTENTIAL {
    constructor(type, referenceCellId, isPortable) {
        this.type = type
        this.referenceCellId = referenceCellId
        this.isPortable = isPortable
        this.value = new Input(0, 0, potentialUnits)
    }
}

export class SUBITEM {
    constructor(subitemType, autoPotentials = false, onType = null, offType = null, referenceCellId = null) {
        this.name = new Input(2)
        this.subitemType = subitemType
        const potentials = autoPotentials ? [new POTENTIAL(onType, referenceCellId, false), new POTENTIAL(offType, referenceCellId, false)] : []
        if (subitemType === 'PL') {
            this.pipelineId = new Select()
            this.wireColor = new Select({ itemList: wireColorList })
            this.wireGauge = new Select({ itemList: wireGaugesList })
            this.potentials = potentials
        }
        else if (subitemType === 'AN') {
            this.anodeMaterial = new Select({ itemList: anodeMaterialList })
            this.wireColor = new Select({ itemList: wireColorList })
            this.wireGauge = new Select({ itemList: wireGaugesList })
            this.potentials = potentials
        }
        else if (subitemType === 'BD') {
            this.sideA = []
            this.sideB = []
            this.fromAtoB = true
            this.current = new Input(0, 2, currentUnits)
        }
        else if (subitemType = 'CN') {
            this.area = new Input(0, 0, areaUnits)
            this.current = new Input(0, 2, currentUnits)
            this.density = new Input(0, 0, currentDensityUnits)
            this.wireColor = new Select({ itemList: wireColorList })
            this.wireGauge = new Select({ itemList: wireGaugesList })
            this.potentials = potentials
        }
        else if (subitemType = 'FC') {
            this.potentials = potentials
        }
        else if (subitemType = 'IK') {
            this.sideA = []
            this.sideB = []
            this.fromAtoB = true
            this.current = new Input()
            this.isolationType = new Select({ itemList: isolationAssemblyTypes })
        }
        else if (subitemType = 'OT') {
            this.potentials = potentials
        }
        else if (subitemType = 'RE') {
            this.rcType = new Select({ itemList: referenceCellTypes })
            this.wireColor = new Select({ itemList: wireColorList })
            this.wireGauge = new Select({ itemList: wireGaugesList })
            this.potentials = potentials
        }
        else if (subitemType = 'RS') {
            this.pipelineId = new Select()
            this.nps = new Select({ itemList: pipeDiameterList })
            this.potentials = potentials
        }
        else if (subitemType = 'SH') {
            this.fromAtoB = true
            this.sideA = []
            this.sideB = []
            this.voltageDrop = new Input()
            this.factor = new Input()
        }
    }
}