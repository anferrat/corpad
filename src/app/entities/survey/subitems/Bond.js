import { ItemTypes } from "../items/SurveyItem"
import { CurrentUnits } from "../other/properties"
import { Subitem } from "./Subitem"
import { SubitemTypes } from "./Subitem"

export class Bond extends Subitem {
    constructor(id, parentId, uid, name, fromAtoB, current, sideA, sideB) {
        super(id, parentId, uid, SubitemTypes.BOND, ItemTypes.TEST_POINT, name,)
        this.current = current
        this.fromAtoB = fromAtoB
        this.currentUnit = CurrentUnits.AMPS
        this.sideA = sideA
        this.sideB = sideB
    }
}