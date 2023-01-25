import { RectifierRepository } from "../../../../repository/sqlite/RectifierRepository"

export class DeleteRectifier {
    constructor() {
        this.rectifierRepo = new RectifierRepository()
    }
    async execute(id) {
        return await this.rectifierRepo.delete(id)
    }
}