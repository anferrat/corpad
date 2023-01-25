import { CurrentUnits } from "../other/properties"
import { Subitem } from "./Subitem"

export class Bond extends Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified, fromAtoB, current, sideA, sideB) {
        super(id, parentId, uid, type, name, timeCreated, timeModified)
        this.current = current
        this.fromAtoB = fromAtoB
        this.currentUnit = CurrentUnits.AMPS
        this.sideA = sideA
        this.sideB = sideB
    }
}