import { PipelineRepository } from "../../../../repository/sqlite/PipelineRepository"
import { guid } from "../../../../utils/guid"


export class CreatePipeline {
    constructor() {
        this.pipelineRepo = new PipelineRepository()
    }
    async execute() {
        const name = null
        const coating = true
        const currentTime = Date.now()
        const uid = guid()
        return await this.pipelineRepo.create({ name, uid, currentTime, coating })
    }
}