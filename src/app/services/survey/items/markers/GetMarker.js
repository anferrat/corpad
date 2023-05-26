import { ItemTypes } from "../../../../../constants/global"
import { errors } from "../../../../utils/Error"

export class GetMarker {
    constructor(testPointRepo, rectifierRepo, basicPresenter) {
        this.rectifierRepo = rectifierRepo
        this.testPointRepo = testPointRepo
        this.basicPresenter = basicPresenter
    }

    async _getMarker(itemType, id) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return (await this.testPointRepo.getById([id]))
            case ItemTypes.RECTIFIER:
                return (await this.rectifierRepo.getById([id]))
            default: throw new Error(errors.GENERAL, `No marker exists with id ${id} and type ${itemType}`)
        }
    }

    async execute(itemType, id) {
        const [item] = await this._getMarker(itemType, id)
        return this.basicPresenter.execute(item.getMarker())
    }
}