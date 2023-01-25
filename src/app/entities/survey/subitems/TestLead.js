import { Subitem } from "./Subitem"

export class TestLead extends Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified, wireGauge, wireColor) {
        super(id, parentId, uid, type, name, timeCreated, timeModified)
        this.wireGauge = wireGauge
        this.wireColor = wireColor
    }
}