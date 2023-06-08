import { ItemTypes } from "../../../../../../../constants/global"
import { Error, errors } from "../../../../../../utils/Error"
import { _Potentials } from "./load_from_database/_Potentials"
import { _Item } from "./load_from_database/_Item"
import { _Subitem } from "./load_from_database/_Subitem"

/*
ExportConverters generate item data (or subitems, or potentials) into intermediate objects with value property and some other properties that uniquly identify value.
It also filters data from repos according to filter values.

itemObject: {
 property: <Property>,
 value: <Value>
}

subitemObject: {
 property: <Property>,
 subitemType: <SubitemType>,
 typeProprtyIndex: <index> //iterates if combination of subitemType and export property occurs more than once within test point (starts at 0)
 value:<Value>,
 unit: <Unit>
}

potentialObject {
 pipelineId: <id>,
 subitemType: <Subitemtype>,
 potentialTypeId: <id>,
 value: <Value>,
 subitemIndex: <index>
}
     */

export class _LoadFromDatabase {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, potentialRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.potentialRepo = potentialRepo

        this.itemExportConverter = new _Item()
        this.subitemExportConverter = new _Subitem()
        this.potentialExportConverter = new _Potentials()
    }

    _getItems(itemType, sorting) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.testPointRepo.getAll(sorting)
            case ItemTypes.RECTIFIER:
                return this.rectifierRepo.getAll(sorting)
            case ItemTypes.PIPELINE:
                return this.pipelineRepo.getAll(sorting)
            default: throw new Error(errors.GENERAL, 'No such item type')
        }
    }

    _getSubitems(itemType, itemId) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.testPointRepo.getSubitemsById(itemId)
            case ItemTypes.RECTIFIER:
                return this.rectifierRepo.getSubitemsById(itemId)
            case ItemTypes.PIPELINE:
                return []
            default: throw new Error(errors.GENERAL, 'No such item type', '', 109)
        }
    }

    _getPotentials(itemType, subitems) {
        if (itemType === ItemTypes.TEST_POINT)
            return Promise.all(subitems.map(async (subitem) => {
                const potentials = await this.potentialRepo.getBySubitemId(subitem.id)
                subitem.setPotentials(potentials)
                return subitem
            }))
        else return []
    }


    async execute({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties }) {
        const items = await this._getItems(itemType, sorting)
        if(items.length === 0)
        throw new Error(errors.GENERAL, 'No items to export', 'No export items', 111)
        return await Promise.all(items.map(async item => {
            const itemValues = this.itemExportConverter.execute(item, itemProperties)
            const subitems = await this._getSubitems(itemType, item.id)
            const subitemValues = this.subitemExportConverter.execute(subitems, subitemProperties)
            const subitemsWithPotentials = await this._getPotentials(itemType, subitems)
            const potentialValues = this.potentialExportConverter.execute({ subitems: subitemsWithPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, exportPotentials })
            return {
                item: itemValues,
                subitem: subitemValues,
                potential: potentialValues,
            }
        }))
    }
}