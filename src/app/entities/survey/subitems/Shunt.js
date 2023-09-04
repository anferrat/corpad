import { ItemTypes, SubitemTypes, CurrentUnits, FactorUnits, PotentialUnits } from "../../../../constants/global";
import { Subitem } from "./Subitem";

export class Shunt extends Subitem {
    constructor(id, parentId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB, prevVoltageDrop) {
        super(id, parentId, uid, SubitemTypes.SHUNT, ItemTypes.TEST_POINT, name)
        this.factor = factor
        this.ratioVoltage = ratioVoltage
        this.ratioCurrent = ratioCurrent
        this.factorSelected = Boolean(factorSelected)
        this.current = current
        this.voltageDrop = voltageDrop
        this.fromAtoB = Boolean(fromAtoB)
        this.sideA = sideA
        this.sideB = sideB
        this.prevVoltageDrop = prevVoltageDrop
    }
    static currentUnit = CurrentUnits.AMPS
    static voltageDropUnit = PotentialUnits.MILIVOLTS
    static factorUnit = FactorUnits.AMPS_OVER_MILIVOLTS

    calculate() {
        if ((this.factor || this.factor === 0) && (this.voltageDrop || this.voltageDrop === 0)) {
            this.current = parseFloat((this.factor * this.voltageDrop).toFixed(5))
        }
        else if ((this.ratioCurrent || this.ratioCurrent === 0) && this.ratioVoltage && (this.voltageDrop || this.voltageDrop === 0)) {
            this.current = parseFloat((this.voltageDrop / this.ratioVoltage * this.ratioCurrent).toFixed(5))
        }

        if (this.current < 0 && this.voltageDrop < 0) {
            this.fromAtoB = !this.fromAtoB
            this.cuurent = Math.abs(this.current)
            this.voltageDrop = Math.abs(this.voltageDrop)
        }
    }

    reset() {
        this.prevVoltageDrop = this.voltageDrop
        this.current = null
        this.voltageDrop = null
        this.fromAtoB = true
    }
}