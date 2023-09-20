import { Pipeline } from "../../../entities/survey/items/Pipeline";
import { Rectifier } from "../../../entities/survey/items/Rectifier";
import { ItemTypes } from "../../../../constants/global";
import { TestPoint } from "../../../entities/survey/items/TestPoint";
import { Error, errors } from "../../../utils/Error";

export class UpdateItem {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, itemPresenter) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.itemPresenter = itemPresenter
    }

    _getItem(item) {
        const { itemType, defaultName } = item
        const currentTime = Date.now()
        const name = item.name ?? defaultName ?? null
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                {
                    const { id, uid, timeCreated, status, comment, location, latitude, longitude, testPointType } = item
                    return new TestPoint(id, uid, name, status, timeCreated, currentTime, comment, location, latitude, longitude, testPointType)
                }
            case ItemTypes.RECTIFIER:
                {
                    const { id, uid, timeCreated, status, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent } = item
                    return new Rectifier(id, uid, name, status, timeCreated, currentTime, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent)
                }
            case ItemTypes.PIPELINE:
                {
                    const { id, uid, timeCreated, comment, nps, material, coating, licenseNumber, product, tpCount } = item
                    return new Pipeline(id, uid, name, timeCreated, currentTime, comment, nps, material, coating, licenseNumber, product, tpCount)

                }
            default:
                throw new Error(errors.GENERAL, `No such type ${itemType}. Unable to update item`)
        }
    }

    _updateItem(item) {
        const { itemType } = item
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.testPointRepo.update(item)
            case ItemTypes.RECTIFIER:
                return this.rectifierRepo.update(item)
            case ItemTypes.PIPELINE:
                return this.pipelineRepo.update(item)
            default:
                throw new Error(errors.GENERAL, `No such type ${itemType}. Unable to update item`)
        }
    }

    async execute(item) {
        const { defaultName, imageUris } = item
        const updatedItem = this._getItem(item)
        await this._updateItem(updatedItem)
        return this.itemPresenter.execute(updatedItem, defaultName, [])
    }
}