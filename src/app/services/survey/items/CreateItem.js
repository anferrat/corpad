import { Pipeline } from "../../../entities/survey/items/Pipeline";
import { Rectifier, TapOptions } from "../../../entities/survey/items/Rectifier";
import { ItemStatuses, ItemTypes, TestPointTypes } from "../../../../constants/global"
import { TestPoint } from "../../../entities/survey/items/TestPoint";
import { Error, errors } from "../../../utils/Error";
import { guid } from "../../../utils/guid";

export class CreateItem {
    constructor(testPointRepo, rectifierRepo, pipelineRepo, basicPresenter) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.pipelineRepo = pipelineRepo
        this.basicPresenter = basicPresenter
    }

    async execute(itemType, latitide = null, longitude = null) {
        const uid = guid()
        const currentTime = Date.now()
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                const testPoint = new TestPoint(null, uid, null, ItemStatuses.UNKNOWN, currentTime, currentTime, null, null, latitide, longitude, TestPointTypes.TEST_STATION)
                return this.basicPresenter.execute(await this.testPointRepo.create(testPoint))
            case ItemTypes.RECTIFIER:
                const rectifier = new Rectifier(null, uid, null, ItemStatuses.UNKNOWN, currentTime, currentTime, null, null, latitide, longitude, null, null, null, null, null, TapOptions.COARSE_FINE, null, null, null, null, null)
                return this.basicPresenter.execute(await this.rectifierRepo.create(rectifier))
            case ItemTypes.PIPELINE:
                const pipeline = new Pipeline(null, uid, null, currentTime, currentTime, null, null, null, true, null, null, 0)
                return this.basicPresenter.execute(await this.pipelineRepo.create(pipeline))
            default:
                throw new Error(errors.GENERAL, `No such type ${itemType}. Unable to create item`)
        }
    }
}