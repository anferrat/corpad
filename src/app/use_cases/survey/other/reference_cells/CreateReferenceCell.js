import { ReferenceCell } from "../../../../entities/survey/other/ReferenceCell"
import { ReferenceCellRepository } from "../../../../repository/sqlite/ReferenceCellRepository"
import { guid } from "../../../../utils/guid"

export class CreateReferenceCell {
    constructor() {
        this.refCellRepo = new ReferenceCellRepository()
    }
    execute(rcType, name) {
        const referenceCell = new ReferenceCell(null, guid(), rcType, name, false)
        return this.refCellRepo.create(referenceCell)
    }
}