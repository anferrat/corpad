import { ItemTypes } from "../../../../../../constants/global"
import { Error, errors } from "../../../../../utils/Error"

export class ExportToSpreadsheet {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, fileSystemRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.fileSystemrepo = fileSystemRepo
    }

    execute({ itemType, sorting, itemProperties, exportPotentials, referenceCellId, potentialTypeIdList, selectedSubitemTypes, pipelineIdList, groupPotentialsByPipeline, subitemProperties }) {

    }
}

class ExportItemToSpreadSheetObject {
    constructor(testPointRepo, rectifierRepo, pipelineRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
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

    _getPropertyValue(item, property) {
        switch (property) {
            case 'name':
            case 'latitude':
            case 'longitude':
            case 'location:':
            case 'testPointType':
            case 'timeModified':
            case 'material':
            case 'nps':

                return item[property]
        }
    }

    execute({ itemType, sorting, itemProperties }) {
        const items = this._getItems(itemType, sorting)
        return Object.fromEntries(itemProperties.map(property => [
            property,

        ]))
    }
}