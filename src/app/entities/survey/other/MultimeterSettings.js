export class MultimeterSettings {
    constructor(peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle) {
        this.peripheralId = peripheralId
        this.name = name
        this.type = type
        this.onTime = onTime
        this.offTime = offTime
        this.delay = delay
        this.syncMode = syncMode
        this.firstCycle = firstCycle
    }
}