import { TestPoint } from "../../../../entities/survey/items/TestPoint"
import { TestPointRepository } from "../../../../repository/sqlite/TestPointRepository"


export class UpdateTestPoint {
    constructor() {
        this.testPointRepo = new TestPointRepository()
    }
    async execute({ id, uid, name, timeCreated, location, latitude, longitude, comment, testPointType, status, defaultName }) {
        const currentTime = Date.now()
        const newName = name ?? defaultName
        const newItem = new TestPoint(id, uid, newName, status, timeCreated, currentTime, comment, location, latitude, longitude, testPointType)
        await this.testPointRepo.update(newItem)
        return newItem
    }
}