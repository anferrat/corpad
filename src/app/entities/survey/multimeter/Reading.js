import { ReadingAbstract } from "./ReadingAbstract";

export class Reading extends ReadingAbstract {
    constructor(value, deviceTimestamp, type, unit, flag) {
        super(deviceTimestamp, type, unit, flag)
        this.value = value
    }
}