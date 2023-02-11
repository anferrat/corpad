export class UpdateMainReference {
    constructor (referenceCellRepo, basicPresenter) {
        this.refCellRepo = referenceCellRepo
        this.basicPresenter = basicPresenter
    }
    async execute(id) {
        const [newMainReference, currentMainReference] = await Promise.all([this.refCellRepo.getReferenceCellById(id), this.refCellRepo.getMainReference()])
        if (newMainReference.id !== currentMainReference.id) {
            await this.refCellRepo.updateMainReference(id)
            return this.basicPresenter.execute(newMainReference.makeMainReference())
        }
        else return this.basicPresenter.execute(currentMainReference)
    }
}