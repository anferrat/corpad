import { ReferenceCell } from "../../../../entities/survey/other/ReferenceCell"
import { guid } from "../../../../utils/guid"

export class CreateReferenceCell {
    constructor (referenceCellRepo, basicPresenter) {
        this.refCellRepo = referenceCellRepo
        this.basicPresenter = basicPresenter
    }
    async execute(referenceCellData) {
        const { rcType, name } = referenceCellData
        const referenceCell = new ReferenceCell(null, guid(), rcType, name, false)
        return this.basicPresenter.execute(await this.refCellRepo.create(referenceCell))
    }
}