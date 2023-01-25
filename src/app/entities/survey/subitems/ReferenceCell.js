import { Subitem } from "./Subitem";

export class ReferenceCell extends Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified, rcType, wireGauge, wireColor) {
        super(id, parentId, uid, type, name, timeCreated, timeModified)
        this.wireGauge = wireGauge
        this.wireColor = wireColor
        this.rcType = rcType
    }
}