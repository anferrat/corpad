import { ItemTypes } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"

export class GetItemIdList {
    constructor(testPointRepo, rectifierRepo, pipelineRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
    }

    async execute({ itemType, filters, sorting, latitude, longitude }) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.testPointRepo.getIdList({ filters, sorting, latitude, longitude })
            case ItemTypes.RECTIFIER:
                return this.rectifierRepo.getIdList({ sorting, latitude, longitude })
            case ItemTypes.PIPELINE:
                return this.pipelineRepo.getIdList(sorting)
            default:
                throw new Error(errors.GENERAL, `No such type ${itemType}. Unable to delete item`)
        }
    }
}