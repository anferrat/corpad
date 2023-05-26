import { ItemTypes, SubitemTypes } from "../../../../constants/global"
import { Subitem } from "./Subitem"

export class TestLead extends Subitem {
    constructor(id, parentId, uid, name, wireGauge, wireColor) {
        super(id, parentId, uid, SubitemTypes.TEST_LEAD, ItemTypes.TEST_POINT, name)
        this.wireGauge = wireGauge
        this.wireColor = wireColor
    }
}