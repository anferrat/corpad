export class GetPipelineList {
    constructor(pipelineRepo) {
        this.pipelineRepo = pipelineRepo
    }

    execute() {
        return this.pipelineRepo.getAll()
    }
}