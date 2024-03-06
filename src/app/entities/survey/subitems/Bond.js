import { Subitem } from "./Subitem"
import { ItemTypes, SubitemTypes, CurrentUnits } from "../../../../constants/global"

export class Bond extends Subitem {
    constructor(id, parentId, uid, name, fromAtoB, current, sideA, sideB, prevCurrent) {
        super(id, parentId, uid, SubitemTypes.BOND, ItemTypes.TEST_POINT, name,)
        this.current = current
        this.fromAtoB = Boolean(fromAtoB)
        this.sideA = sideA
        this.sideB = sideB
        this.prevCurrent = prevCurrent
    }
    static currentUnit = CurrentUnits.AMPS

    calculate() {
        if (this.current < 0) {
            this.current = Math.abs(this.current)
            this.fromAtoB = !this.fromAtoB
        }
    }

    reset() {
        this.prevCurrent = this.current
        this.current = null
        this.fromAtoB = true
    }

    setSides(sideA, sideB) {
        this.sideA = sideA
        this.sideB = sideB
    }
}