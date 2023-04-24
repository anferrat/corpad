import { Error, errors } from "../../../../utils/Error"

export class DeleteReferenceCell {
    constructor(referenceCellRepo) {
        this.refCellRepo = referenceCellRepo
    }
    async execute(id) {
        const mainReferenceCell = await this.refCellRepo.getMainReference()
        if (mainReferenceCell.id !== id)
            await this.refCellRepo.delete(id)
        else throw new Error(errors.GENERAL, `Reference cell with id ${id} is main reference cell. Deleting main refernce is not permitted.`)
    }
}