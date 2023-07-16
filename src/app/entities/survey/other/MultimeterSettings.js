export class MultimeterSettings {
    constructor(peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive) {
        this.peripheralId = peripheralId
        this.name = name
        this.type = type
        this.onTime = onTime
        this.offTime = offTime
        this.delay = delay
        this.syncMode = syncMode
        this.firstCycle = firstCycle
        this.onOffCaptureActive = onOffCaptureActive
    }
}