import { ReadingAbstract } from "./ReadingAbstract"

export class ReadingSet extends ReadingAbstract {
    constructor(id, readings, deviceTimestamp, offset, type, unit, flag, isAc, deviceType) {
        super(id, deviceTimestamp, type, unit, flag, isAc, deviceType)
        this.readings = readings
        this.offset = offset
    }
}