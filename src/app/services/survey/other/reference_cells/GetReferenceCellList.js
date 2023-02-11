export class GetReferenceCellList {
    constructor (referenceCellRepo, listPresenter) {
        this.refCellRepo = referenceCellRepo, listPresenter
    }

    async execute() {
        return this.listPresenter.execute(await this.refCellRepo.getAll())
    }
}