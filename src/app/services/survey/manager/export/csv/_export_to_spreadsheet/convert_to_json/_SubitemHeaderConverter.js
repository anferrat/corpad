import { ExportSubitemPropertyLabels, SubitemTypeLabels } from "../../../../../../../../constants/labels";

export class _SubitemHeaderConverter {
    constructor() { }

    execute(exportedValues) {
        return {
            list: this._convertSubitemPropertyValues(exportedValues),
            headers: this._getSubitemPropertyHeaders(exportedValues),
        }
    }

    _generateHeaderLabel(subitemType, typePropertyIndex, property, unit) {
        const subTypeLabel = SubitemTypeLabels[subitemType]
        const suffix = typePropertyIndex ? `_${typePropertyIndex + 1}` : ''
        const propertyLabel = ExportSubitemPropertyLabels[property]
        const unitSuffix = unit ? ` ${unit}` : ''
        return `${subTypeLabel}${suffix} - ${propertyLabel}${unitSuffix}`
    }

    _getSubitemPropertyHeaders(exportedValues) {
        const headers = []

        exportedValues.forEach(({ subitem }) => {
            subitem.forEach(({ subitemType, typePropertyIndex, property, unit }) => {
                const headerExists = ~headers.findIndex((header) => header.subitemType === subitemType && header.typePropertyIndex === typePropertyIndex && header.property === property)
                if (!headerExists)
                    headers.push({ subitemType, typePropertyIndex, property, unit })
            })
        })

        headers.sort((a, b) => {
            if (a.subitemType !== b.subitemType) {
                return a.subitemType.localeCompare(b.subitemType);
            } else if (a.typePropertyIndex !== b.typePropertyIndex) {
                return a.typePropertyIndex - b.typePropertyIndex;
            } else {
                return a.property.localeCompare(b.property);
            }
        })

        return headers.map(({ subitemType, typePropertyIndex, property, unit }) => this._generateHeaderLabel(subitemType, typePropertyIndex, property, unit))

    }

    _convertSubitemPropertyValues(exportedValues) {
        //generates list of objects, object per item, where each property is property label, and value is value
        return exportedValues.map(({ subitem }) => {
            const subitemValues = {}
            subitem.forEach(({ property, value, subitemType, typePropertyIndex, unit }) => {
                subitemValues[this._generateHeaderLabel(subitemType, typePropertyIndex, property, unit)] = value
            })
            return subitemValues
        })
    }
}