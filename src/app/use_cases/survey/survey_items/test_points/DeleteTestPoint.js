import { TestPointRepository } from "../../../../repository/sqlite/TestPointRepository"


export class DeleteTestPoint {
    constructor() {
        this.testPointRepo = new TestPointRepository()
    }
    async execute(id) {
        return await this.testPointRepo.delete(id)
    }
}