import { Subitem } from "./Subitem";

export class PipelineLead extends Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified, pipelineId, wireGauge, wireColor) {
        super(id, parentId, uid, type, name, timeCreated, timeModified)
        this.wireGauge = wireGauge
        this.wireColor = wireColor
        this.pipelineId = pipelineId
    }
}