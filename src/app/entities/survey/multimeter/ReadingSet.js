import { ReadingAbstract } from "./ReadingAbstract"

export class ReadingSet extends ReadingAbstract {
    constructor(readings, deviceTimestamp, offset, type, unit, flag) {
        super(deviceTimestamp, type, unit, flag)
        this.readings = readings
        this.offset = offset
    }
}