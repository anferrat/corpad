import { PipelineRepository } from "../../../../repository/sqlite/PipelineRepository"

export class GetPipelineIdList {
    constructor() {
        this.pipelineRepo = new PipelineRepository()
    }
    async execute(sorting) {
        return await this.pipelineRepo.getIdList(sorting)
    }
}