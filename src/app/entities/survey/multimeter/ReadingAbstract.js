export class ReadingAbstract {
    constructor(deviceTimestamp, type, unit, flag) {
        this.deviceTimestamp = deviceTimestamp
        this.type = type
        this.unit = unit
        this.flag = flag
    }

    setFlag(flag) {
        this.flag = flag
    }

    setUnit(unit) {
        this.unit = unit
    }
}