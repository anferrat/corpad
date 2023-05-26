import { ItemTypes } from "../../../../constants/global";
import { Error, errors } from "../../../utils/Error";

export class GetItem {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, defaultNameRepo, basicPresenter, itemPresenter) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.defaultNameRepo = defaultNameRepo
        this.itemPresenter = itemPresenter
        this.basicPresenter = basicPresenter
    }

    async _getItemData(id, itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return (await this.testPointRepo.getById([id]))[0]
            case ItemTypes.RECTIFIER:
                return (await this.rectifierRepo.getById([id]))[0]
            case ItemTypes.PIPELINE:
                return (await this.pipelineRepo.getById([id]))[0]
            default:
                throw new Error(errors.GENERAL, `No such type ${itemType}. Unable to delete item`)
        }
    }

    _getDefaultName(defaultName, index) {
        if (defaultName === null)
            return `${index}`
        else return `${defaultName} ${index}`
    }



    async executeWithDefaultName(id, itemType) {
        const [item, defaultNameBase] = await Promise.all([
            this._getItemData(id, itemType),
            this.defaultNameRepo.getByType(itemType)
        ])
        const defaultName = this._getDefaultName(defaultNameBase, id)
        return this.itemPresenter.execute(item, defaultName)
    }

    async execute(id, itemType) {
        return this.basicPresenter.execute(await this._getItemData(id, itemType))
    }
}