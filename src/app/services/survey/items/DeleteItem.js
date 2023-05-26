import { ItemTypes } from "../../../../constants/global";
import { Error, errors } from "../../../utils/Error";

export class DeleteItem {
    constructor(testPointRepo, rectifierRepo, pipelineRepo) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
    }

    execute(id, itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                this.testPointRepo.delete(id)
                break
            case ItemTypes.RECTIFIER:
                this.rectifierRepo.delete(id)
                break
            case ItemTypes.PIPELINE:
                this.pipelineRepo.delete(id)
                break
            default:
                throw new Error(errors.GENERAL, `No such type ${itemType}. Unable to delete item`)
        }
    }
}