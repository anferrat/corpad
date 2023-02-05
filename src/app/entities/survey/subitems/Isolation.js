import { ItemTypes } from "../items/SurveyItem";
import { CurrentUnits } from "../other/properties";
import { Subitem, SubitemTypes } from "./Subitem";

export class Isolation extends Subitem {
    constructor(id, parentId, uid, name, fromAtoB, isolationType, shorted, current, sideA, sideB) {
        super(id, parentId, uid, SubitemTypes.ISOLATION, ItemTypes.TEST_POINT, name)
        this.fromAtoB = fromAtoB
        this.isolationType = isolationType
        this.shorted = shorted
        this.current = current
        this.currentUnit = CurrentUnits.AMPS
        this.sideA = sideA
        this.sideB = sideB
    }
}

