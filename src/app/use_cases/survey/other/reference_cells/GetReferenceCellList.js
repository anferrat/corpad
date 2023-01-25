import { ReferenceCellRepository } from "../../../../repository/sqlite/ReferenceCellRepository"

export class GetReferenceCellList {
    constructor() {
        this.refCellRepo = new ReferenceCellRepository()
    }

    async execute() {
        return await this.refCellRepo.getAll()
    }
}