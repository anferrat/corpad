import { PipelineRepository } from "../../../../repository/sqlite/PipelineRepository"


export class UpdatePipelineProperty {
    constructor() {
        this.pipelineRepo = new PipelineRepository()
    }
    async execute(id, property, value) {
        const currentTime = Date.now()
        await this.pipelineRepo.updateProperty({ id, property, value, currentTime })
        return {
            timeModified: currentTime
        }
    }
}