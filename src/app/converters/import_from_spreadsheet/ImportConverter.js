import { ItemConverter } from "./ItemConverter"
import { PropertyConverter } from "./PropertyConverter"
import { SubitemConverter } from "./SubitemConverter"

export class ImportConverter {
    constructor () {
        this.propertyConverter = new PropertyConverter()
        this.itemConverter = new ItemConverter(this.propertyConverter)
        this.subitemConverter = new SubitemConverter(this.propertyConverter)
    }

    execute({ itemType, data, fields, defaultNames, referenceCells, potentialTypes, item, subitems, pipelineList }) {
        const convertedNames = Object.fromEntries(defaultNames.map(name => [name.type, name.name]))
        return data.map((row, rowIndex) => {
            let warnings = []
            const convertedItem = this.itemConverter.execute(row, rowIndex, fields, item, itemType, convertedNames)
            return {
                item: convertedItem,
                subitems: subitems.map(subitem => {
                    return this.subitemConverter.execute(row, fields, subitem, convertedNames, referenceCells, potentialTypes, pipelineList)
                })
                    .filter(subitem => {
                        if (subitem === null)
                            //need to include potential converter warnings
                            warnings.push({
                                type: subitem?.type,
                                originalValue: subitem,
                                convertedValue: null,
                                warningCode: 'subitemConverter'
                            })
                        return subitem !== null
                    }),
                success: convertedItem !== null,
                warnings: warnings
            }
        })
    }
}
