import { ReadingAbstract } from "./ReadingAbstract";

export class Reading extends ReadingAbstract {
    constructor(id, value, deviceTimestamp, type, unit, flag, isAc, deviceType) {
        super(id, deviceTimestamp, type, unit, flag, isAc, deviceType)
        this.value = value
    }
}