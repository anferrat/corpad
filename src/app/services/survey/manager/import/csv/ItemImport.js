import { Pipeline } from "../../../../../entities/survey/items/Pipeline"
import { Rectifier } from "../../../../../entities/survey/items/Rectifier"
import { ItemTypes } from "../../../../../entities/survey/items/SurveyItem"
import { TestPoint } from "../../../../../entities/survey/items/TestPoint"
import { guid } from "../../../../../utils/guid"

export class ItemImport {
    constructor (testPointRepository, rectifierRepository, pipelineRepository) {
        this.testPointRepo = testPointRepository
        this.rectifierRepo = rectifierRepository
        this.pipelineRepo = pipelineRepository
    }
    
    async execute(item, itemType) {
        try {
            const uid = guid()
            const currentTime = Date.now()
            switch (itemType) {
                case ItemTypes.TEST_POINT: {
                    const { name, status, comment, location, latitude, longitude, testPointType } = item
                    const testPoint = new TestPoint(null, uid, name, status, currentTime, currentTime, comment, location, latitude, longitude, testPointType)
                    const { id } = await this.testPointRepo.create(testPoint)
                    return id
                }
                case ItemTypes.RECTIFIER: {
                    const { name, status, comment, location, latitude, longitude, model, serialNumber, powerSource, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent } = item
                    const rectifier = new Rectifier(null, uid, name, status, currentTime, currentTime, comment, location, latitude, longitude, model, serialNumber, powerSource, null, null, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent)
                    const { id } = await this.rectifierRepo.create(rectifier)
                    return id
                }
                case ItemTypes.PIPELINE:
                    {
                        const { name, comment, nps, material, coating, licenseNumber, product } = item
                        const pipeline = new Pipeline(null, uid, name, currentTime, currentTime, comment, nps, material, coating, licenseNumber, product, 0)
                        const { id } = await this.pipelineRepo.create(pipeline)
                        return id
                    }
            }
        }
        catch (err) {
            return null
        }
    }
}