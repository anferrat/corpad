import { ItemTypes } from "../../../../entities/survey/items/SurveyItem"
import { Error } from "../../../../utils/Error"

export class GetSubitemList {
    constructor (testPointRepo, rectifierRepo, listPresenter) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.listPresenter = listPresenter
    }

    _getList(id, itemType) {
        if (itemType === ItemTypes.TEST_POINT)
            return this.testPointRepo.getSubitemList(id)
        else if (itemType === ItemTypes.RECTIFIER)
            return this.rectifierRepo.getSubitemList(id)
        else if (itemType = ItemTypes.PIPELINE)
            return []
        else throw new Error('CorpadError', `Item type ${itemType} is not supported.`)
    }


    async execute(id, itemType) {
        const list = await this.getList(id, itemType)
        return this.listPresenter.execute(list)
    }
}