import { ItemTypes, CurrentUnits, PotentialUnits, SubitemTypes } from "../../../../constants/global"
import { Subitem } from "./Subitem"

export class Circuit extends Subitem {
    constructor(id, parentId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage, voltageDrop) {
        super(id, parentId, uid, SubitemTypes.CIRCUIT, ItemTypes.RECTIFIER, name)
        this.ratioCurrent = ratioCurrent
        this.ratioVoltage = ratioVoltage
        this.current = current
        this.voltage = voltage
        this.targetMax = targetMax
        this.targetMin = targetMin
        this.voltageDrop = voltageDrop
    }

    static currentUnit = CurrentUnits.AMPS
    static voltageUnit = PotentialUnits.VOLTS

    calculate() {
        if ((this.ratioCurrent || this.ratioCurrent === 0) && this.ratioVoltage && (this.voltageDrop || this.voltageDrop === 0)) {
            this.current = this.voltageDrop / this.ratioVoltage * this.ratioCurrent
        }
    }

    reset() {
        this.current = null
        this.voltage = null
        this.voltageDrop = null
    }
}