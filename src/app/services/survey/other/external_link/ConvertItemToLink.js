import { ItemTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class ConvertItemToLink {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, potentialTypeRepo, referenceCellRepo, linkEncoder, ndefRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.referenceCellRepo = referenceCellRepo
        this.linkEncoder = linkEncoder
        this.ndefRepo = ndefRepo
    }

    async _getFullList(id, itemType) {
        if (itemType === ItemTypes.TEST_POINT)
            return Promise.all([
                this.testPointRepo.getById([id]),
                this.testPointRepo.getSubitemsWithPotentialsById(id),
                this.referenceCellRepo.getAllForItem(id, null),
                this.potentialTypeRepo.getAll(),
                this.pipelineRepo.getAll(),
            ])
        else if (itemType === ItemTypes.RECTIFIER)
            return Promise.all([
                this.rectifierRepo.getById([id]),
                this.rectifierRepo.getSubitemsById(id),
                [],
                [],
                []])
        else throw new Error(errors.GENERAL, `Item type ${itemType} is not supported.`)
    }

    async execute(itemId, itemType, linkType) {
        const [[item], subitems, referenceCells, potentialTypes, pipelines] = await this._getFullList(itemId, itemType)
        item.setSubitems(subitems)
        const link = this.linkEncoder.encode(item, pipelines, referenceCells, potentialTypes, linkType)
        const size = this.ndefRepo.getUriRecordSize(link)
        return {
            link,
            size,
            name: item.name
        }
    }
}