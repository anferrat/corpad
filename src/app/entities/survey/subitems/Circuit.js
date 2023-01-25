import { CurrentUnits, PotentialUnits } from "../other/properties"
import { Subitem } from "./Subitem"

export class Circuit extends Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage) {
        super(id, parentId, uid, type, name, timeCreated, timeModified)
        this.ratioCurrent = ratioCurrent
        this.ratioVoltage = ratioVoltage
        this.current = current
        this.voltage = voltage
        this.targetMax = targetMax
        this.targetMin = targetMin
        this.currentUnit = CurrentUnits.AMPS
        this.voltageUnit = PotentialUnits.VOLTS
    }
}