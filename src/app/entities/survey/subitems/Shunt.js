import { Subitem } from "./Subitem";

export class Shunt extends Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB) {
        super(id, parentId, uid, type, name, timeCreated, timeModified)
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