import { ItemTypes } from "../items/SurveyItem";
import { Subitem, SubitemTypes } from "./Subitem";

export class StatReferenceCell extends Subitem {
    constructor(id, parentId, uid, name, rcType, wireGauge, wireColor) {
        super(id, parentId, uid, SubitemTypes.REFERENCE_CELL, ItemTypes.TEST_POINT, name)
        this.wireGauge = wireGauge
        this.wireColor = wireColor
        this.rcType = rcType
    }
}