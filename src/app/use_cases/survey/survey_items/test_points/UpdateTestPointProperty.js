import { TestPointRepository } from "../../../../repository/sqlite/TestPointRepository"


export class UpdateTestPointProperty {
    constructor() {
        this.testPointRepo = new TestPointRepository()
    }
    async execute(id, property, value) {
        const currentTime = Date.now()
        await this.testPointRepo.updateProperty({ id, property, value, currentTime })
        return {
            timeModified: currentTime
        }
    }
}