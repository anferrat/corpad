import { ItemTypes } from "../items/SurveyItem"
import { CurrentUnits } from "../other/properties"
import { Subitem } from "./Subitem"
import { SubitemTypes } from "./Subitem"

export class Bond extends Subitem {
    constructor(id, parentId, uid, name, fromAtoB, current, sideA, sideB) {
        super(id, parentId, uid, SubitemTypes.BOND, ItemTypes.TEST_POINT, name,)
        this.current = current
        this.fromAtoB = fromAtoB
        this.sideA = sideA
        this.sideB = sideB
    }
    static currentUnit = CurrentUnits.AMPS

    calculate() {
        if (this.current < 0) {
            this.current = Math.abs(this.current)
            this.fromAtoB = !this.fromAtoB
        }
    }

    reset() {
        this.current = null
        this.fromAtoB = true
    }
}