import { ItemTypes, SubitemTypes } from "../../../../constants/global";
import { Subitem } from "./Subitem";

export class PipelineLead extends Subitem {
    constructor(id, parentId, uid, name, pipelineId, wireGauge, wireColor) {
        super(id, parentId, uid, SubitemTypes.PIPELINE, ItemTypes.TEST_POINT, name)
        this.wireGauge = wireGauge
        this.wireColor = wireColor
        this.pipelineId = pipelineId
    }

    setPipelineId(pipelineId) {
        this.pipelineId = pipelineId
    }
}