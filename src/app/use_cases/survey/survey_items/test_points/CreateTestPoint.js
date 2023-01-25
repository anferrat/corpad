import { TestPointRepository } from "../../../../repository/sqlite/TestPointRepository"
import { guid } from "../../../../utils/guid"


export class CreateTestPoint {
    constructor() {
        this.testPointRepo = new TestPointRepository()
    }
    async execute() {
        const name = null
        const currentTime = Date.now()
        const uid = guid()
        return await this.testPointRepo.create({ name, uid, currentTime })
    }
    async executeWithCoord(latitude, longitude) {
        const name = null
        const currentTime = Date.now()
        const uid = guid()
        await this.testPointRepo.create({ name, uid, currentTime, latitude, longitude })
    }
}