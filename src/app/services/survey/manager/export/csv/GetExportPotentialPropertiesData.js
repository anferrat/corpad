export class GetExportPotentailPropertiesData {
    constructor(pipelineRepo, referenceCellRepo, potentialTypeRepo, listPresenter) {
        this.pipelineRepo = pipelineRepo
        this.referenceCellRepo = referenceCellRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.listPresenter = listPresenter
    }

    async execute() {
        const [pipelines, referenceCells, potentialTypes] = await Promise.all([
            this.pipelineRepo.getAll(),
            this.referenceCellRepo.getAll(),
            this.potentialTypeRepo.getAll()
        ])
        return {
            pipelines: this.listPresenter.execute(pipelines),
            referenceCells: this.listPresenter.execute(referenceCells),
            potentialTypes: this.listPresenter.execute(potentialTypes),
        }
    }
}