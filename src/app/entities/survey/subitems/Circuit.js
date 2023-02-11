import { ItemTypes } from "../items/SurveyItem"
import { CurrentUnits, PotentialUnits } from "../other/properties"
import { Subitem, SubitemTypes } from "./Subitem"

export class Circuit extends Subitem {
    constructor (id, parentId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage, voltageDrop) {
        super(id, parentId, uid, SubitemTypes.CIRCUIT, ItemTypes.RECTIFIER, name)
        this.ratioCurrent = ratioCurrent
        this.ratioVoltage = ratioVoltage
        this.current = current
        this.voltage = voltage
        this.targetMax = targetMax
        this.targetMin = targetMin
        this.voltageDrop = voltageDrop
        this.currentUnit = CurrentUnits.AMPS
        this.voltageUnit = PotentialUnits.VOLTS
    }

    //add methods for current verification calculation
}