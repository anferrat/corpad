import { ItemTypes } from "../items/SurveyItem";
import { Subitem, SubitemTypes } from "./Subitem";

export class Shunt extends Subitem {
    constructor(id, parentId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB) {
        super(id, parentId, uid, SubitemTypes.SHUNT, ItemTypes.TEST_POINT, name)
        this.factor = factor
        this.ratioVoltage = ratioVoltage
        this.ratioCurrent = ratioCurrent
        this.factorSelected = factorSelected
        this.current = current
        this.voltageDrop = voltageDrop
        this.fromAtoB = fromAtoB
        this.sideA = sideA
        this.sideB = sideB
    }
}