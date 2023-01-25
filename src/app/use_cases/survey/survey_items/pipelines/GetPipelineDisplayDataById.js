import { PipelineRepository } from "../../../../repository/sqlite/PipelineRepository"

export class GetPipelineDisplayDataById {
    constructor() {
        this.pipelineRepo = new PipelineRepository()
    }

    async execute(id) {
        const pipeline = await this.pipelineRepo.getById(id)
        pipeline.setSubitemList([])
        return pipeline
    }
}