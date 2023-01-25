import { TestPointRepository } from "../../../../repository/sqlite/TestPointRepository"
import { DefaultNameRepository } from "../../../../repository/sqlite/DefaultNameRepository"
import { ItemTypes } from "../../../../entities/survey/items/SurveyItem"


export class GetTestPointById {
    constructor() {
        this.testPointRepo = new TestPointRepository()
        this.defaultNameRepo = new DefaultNameRepository()
    }
    async execute(id) {
        const [testPoint, defualtName] = await Promise.all([
            this.testPointRepo.getById(id),
            this.defaultNameRepo.getByType(ItemTypes.TEST_POINT)
        ])
        testPoint.setDefaultName(defualtName)
        return testPoint
    }
}