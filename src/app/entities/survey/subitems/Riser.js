import { Subitem } from "./Subitem";

export class Riser extends Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified, pipelineId, wireGauge, wireColor, nps) {
        super(id, parentId, uid, type, name, timeCreated, timeModified)
        this.wireGauge = wireGauge
        this.wireColor = wireColor
        this.pipelineId = pipelineId
        this.nps = nps
    }
}