import { RectifierRepository } from "../../../../repository/sqlite/RectifierRepository"

export class GetRectifierIdList {
    constructor() {
        this.rectifierRepo = new RectifierRepository()
    }
    async execute() {
        return await this.rectifierRepo.getIdList({ sorting, latitude, longitude })
    }
}