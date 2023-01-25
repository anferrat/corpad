import { ReferenceCellRepository } from "../../../../repository/sqlite/ReferenceCellRepository"
import { ReferenceCellTypes } from "../../../../entities/survey/other/properties"
import { Error } from "../../../../utils/Error"

export class CreateReferenceCell {
    constructor() {
        this.refCellRepo = new ReferenceCellRepository()
    }
    async execute(createReferenceCellRequestObject) {
        const rcTypeCheck = Object.values(ReferenceCellTypes).indexOf(createReferenceCellRequestObject.rcType) !== -1
        if (rcTypeCheck)
            return await this.refCellRepo.create(createReferenceCellRequestObject)
        else throw new Error('CorpadError', 'Reference cell type is out of range')
    }
}