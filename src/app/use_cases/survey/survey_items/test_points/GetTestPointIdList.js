import { TestPointRepository } from "../../../../repository/sqlite/TestPointRepository"


export class GetTestPointIdList {
    constructor() {
        this.testPointRepo = new TestPointRepository()
    }
    async execute({ filters, sorting, latitude, longitude }) {
        return await this.testPointRepo.getIdList({ filters, sorting, latitude, longitude })
    }
}