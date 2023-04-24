import { DataUnitConverter } from "./DataUnitConverter"
import { ItemImport } from "./ItemImport"
import { SubitemImport } from "./SubitemImport"

export class ImportSpreadsheetData {
    constructor (testPointRepository, rectifierRepository, pipelineRepository, subitemRepository, potentialRepository, subitemFactory, unitConverter) {
        this.itemImport = new ItemImport(testPointRepository, rectifierRepository, pipelineRepository)
        this.subitemImport = new SubitemImport(subitemRepository, potentialRepository, subitemFactory, new DataUnitConverter(unitConverter))
    }

    async execute(data, itemType, callback) {
        for (i = 0; i < data.length; i++) {
            if (data[i].success) {
                const item = data[i]?.item
                const subitems = data[i]?.subitems
                const itemId = await this.itemImport.execute(item, itemType)
                const warnings = await this.subitemImport.execute(subitems, itemId)
                callback({
                    id: itemId ?? null,
                    index: i,
                    warnings: [...data[i].warnings, ...warnings],
                    success: Boolean(itemId),
                })
            }
            else {
                callback({
                    id: null,
                    index: i,
                    warnings: [],
                    success: false
                })
            }
        }
        return {
            importTime: Date.now()
        }
    }
}