import { ItemTypes, CurrentUnits, SubitemTypes } from "../../../../constants/global"
import { Subitem } from "./Subitem"

export class Isolation extends Subitem {
    constructor(id, parentId, uid, name, fromAtoB, isolationType, shorted, current, sideA, sideB) {
        super(id, parentId, uid, SubitemTypes.ISOLATION, ItemTypes.TEST_POINT, name)
        this.fromAtoB = Boolean(fromAtoB)
        this.isolationType = isolationType
        this.shorted = shorted
        this.current = current
        this.sideA = sideA
        this.sideB = sideB
    }
    static currentUnit = CurrentUnits.AMPS

    calculate() {
        if (this.shorted && this.current < 0) {
            this.current = Math.abs(this.current)
            this.fromAtoB = !this.fromAtoB
        }
    }

    reset() {
        this.fromAtoB = true
        this.current = null
        this.shorted = false
    }

    setSides(sideA, sideB) {
        this.sideA = sideA
        this.sideB = sideB
    }
}

