import { ItemTypes, SubitemTypes } from "../../../../constants/global";
import { Subitem } from "./Subitem";

export class Riser extends Subitem {
    constructor(id, parentId, uid, name, pipelineId, nps) {
        super(id, parentId, uid, SubitemTypes.RISER, ItemTypes.TEST_POINT, name)
        this.pipelineId = pipelineId
        this.nps = nps
    }
}