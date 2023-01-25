import { RectifierRepository } from "../../../../repository/sqlite/RectifierRepository"

export class UpdateRectifierProperty {
    constructor() {
        this.rectifierRepo = new RectifierRepository()
    }

    async execute(id, property, value) {
        const currentTime = Date.now()
        await this.rectifierRepo.updateProperty({ id, property, value, currentTime })
        return {
            timeModified: currentTime
        }
    }
}