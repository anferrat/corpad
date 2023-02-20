import { ItemTypes } from "../items/SurveyItem";
import { CurrentUnits } from "../other/properties";
import { Subitem, SubitemTypes } from "./Subitem";

export class Isolation extends Subitem {
    constructor (id, parentId, uid, name, fromAtoB, isolationType, shorted, current, sideA, sideB) {
        super(id, parentId, uid, SubitemTypes.ISOLATION, ItemTypes.TEST_POINT, name)
        this.fromAtoB = fromAtoB
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
}

