import { RectifierRepository } from "../../../../repository/sqlite/RectifierRepository"
import { guid } from "../../../../utils/guid"


export class CreateRectifier {
    constructor() {
        this.rectifierRepo = new RectifierRepository()
    }
    async execute() {
        const currentTime = Date.now()
        const uid = guid()
        return await this.rectifierRepo.create({ uid, currentTime })
    }
    async executeWithCoord(latitude, longitude) {
        const currentTime = Date.now()
        const uid = guid()
        return await this.rectifierRepo.create({ uid, currentTime, latitude, longitude })
    }
}