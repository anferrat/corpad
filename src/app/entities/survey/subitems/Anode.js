import { Subitem } from "./Subitem";

export class Anode extends Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified, androidMaterial, wireGauge, wireColor) {
        super(id, parentId, uid, type, name, timeCreated, timeModified)
        this.androidMaterial = androidMaterial
        this.wireGauge = wireGauge
        this.wireColor = wireColor
    }
}