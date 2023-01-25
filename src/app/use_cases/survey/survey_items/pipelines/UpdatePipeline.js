import { Pipeline } from "../../../../entities/survey/items/Pipeline"
import { PipelineRepository } from "../../../../repository/sqlite/PipelineRepository"


export class UpdatePipeline {
    constructor() {
        this.pipelineRepo = new PipelineRepository()
    }
    async execute({ id, uid, name, timeCreated, comment, nps, material, coating, licenseNumber, product, defaultName }) {
        const currentTime = Date.now()
        const newName = name ?? defaultName
        const newItem = new Pipeline(id, uid, newName, timeCreated, currentTime, comment, nps, material, coating, licenseNumber, product)
        await this.pipelineRepo.update(newItem)
        return newItem
    }
}