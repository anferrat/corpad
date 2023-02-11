import { Pipeline } from "../../../entities/survey/items/Pipeline";
import { Rectifier } from "../../../entities/survey/items/Rectifier";
import { ItemTypes } from "../../../entities/survey/items/SurveyItem";
import { TestPoint } from "../../../entities/survey/items/TestPoint";
import { Error } from "../../../utils/Error";

export class UpdateItem {
    constructor (testPointRepo, rectifierRepo, pipelineRepo, basicPresenter) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.basicPresenter = basicPresenter
    }

    async execute(item) {
        const { itemType, defaultName } = item
        const currentTime = Date.now()
        const name = item.name ?? defaultName ?? null
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                {
                    const { id, uid, timeCreated, status, comment, location, latitude, longitude, testPointType } = item
                    const testPoint = new TestPoint(id, uid, name, status, timeCreated, currentTime, comment, location, latitude, longitude, testPointType)
                    return this.basicPresenter.execute(await this.testPointRepo.update(testPoint))
                }
            case ItemTypes.RECTIFIER:
                {
                    const { id, uid, timeCreated, status, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent } = item
                    const rectifier = new Rectifier(id, uid, name, status, timeCreated, currentTime, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent)
                    return this.basicPresenter.execute(await this.rectifierRepo.update(rectifier))
                }
            case ItemTypes.PIPELINE:
                {
                    const { id, uid, timeCreated, comment, nps, material, coating, licenseNumber, product, tpCount } = item
                    const pipeline = new Pipeline(id, uid, name, timeCreated, currentTime, comment, nps, material, coating, licenseNumber, product, tpCount)
                    return this.basicPresenter.execute(this.pipelineRepo.update(pipeline))
                }
            default:
                throw new Error('CorpadError', `No such type ${itemType}. Unable to delete item`, err)
        }
    }
}