export class ReadingAbstract {
    constructor(id, deviceTimestamp, type, unit, flag, isAc, deviceType) {
        this.id = id
        this.deviceTimestamp = deviceTimestamp
        this.type = type
        this.unit = unit
        this.flag = flag
        this.isAc = isAc
        this.deviceType = deviceType
    }

    setFlag(flag) {
        this.flag = flag
    }

    setUnit(unit) {
        this.unit = unit
    }

    setValue(value) {
        this.value = value
    }

    setTime(timestamp) {
        this.deviceTimestamp = timestamp
    }
}