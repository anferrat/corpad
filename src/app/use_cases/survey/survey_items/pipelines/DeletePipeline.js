import { PipelineRepository } from "../../../../repository/sqlite/PipelineRepository"

export class DeletePipeline {
    constructor() {
        this.pipelineRepo = new PipelineRepository()
    }
    execute(id) {
        return this.pipelineRepo.delete(id)
    }
}