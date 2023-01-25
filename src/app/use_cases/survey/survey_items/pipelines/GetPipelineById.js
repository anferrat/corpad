import { PipelineRepository } from "../../../../repository/sqlite/PipelineRepository"
import { DefaultNameRepository } from "../../../../repository/sqlite/DefaultNameRepository"
import { ItemTypes } from "../../../../entities/survey/items/SurveyItem"


export class GetPipelineById {
    constructor() {
        this.pipelineRepo = new PipelineRepository()
        this.defaultNameRepo = new DefaultNameRepository()
    }
    async execute(id) {
        const [pipeline, defualtName] = await Promise.all([
            this.pipelineRepo.getById(id),
            this.defaultNameRepo.getByType(ItemTypes.PIPELINE)
        ])
        pipeline.setDefaultName(defualtName)
        return pipeline
    }
}