import { SurveyFileDataFields } from "../PipelineSurveyFile";
import { Element } from "./Element";

export class CircuitElement extends Element {
    constructor(id, uid, name, rectifierId, ratioCurrent, ratioVoltage, voltageDrop, current, voltage, targetMin, targetMax) {
        super(SurveyFileDataFields.CIRCUITS)
        this.id = id
        this.uid = uid
        this.name = name
        this.rectifierId = rectifierId
        this.ratioCurrent = ratioCurrent
        this.ratioVoltage = ratioVoltage
        this.voltageDrop = voltageDrop
        this.current = current
        this.voltage = voltage
        this.targetMin = targetMin
        this.targetMax = targetMax
    }
}