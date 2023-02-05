import { ItemTypes } from "../items/SurveyItem";
import { Subitem } from "./Subitem";
import { SubitemTypes } from "./Subitem";

export class Anode extends Subitem {
    constructor(id, parentId, uid, name, anodeMaterial, wireGauge, wireColor) {
        super(id, parentId, uid, SubitemTypes.ANODE, ItemTypes.TEST_POINT, name)
        this.anodeMaterial = anodeMaterial
        this.wireGauge = wireGauge
        this.wireColor = wireColor
    }
}