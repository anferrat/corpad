import { CurrentUnits } from "../other/properties";
import { Subitem } from "./Subitem";

export class Isolation extends Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified, fromAtoB, isolationType, shorted, current, sideA, sideB) {
        super(id, parentId, uid, type, name, timeCreated, timeModified)
        this.fromAtoB = fromAtoB
        this.isolationType = isolationType
        this.shorted = shorted
        this.current = current
        this.currentUnit = CurrentUnits.AMPS
        this.sideA = sideA
        this.sideB = sideB
    }
}

