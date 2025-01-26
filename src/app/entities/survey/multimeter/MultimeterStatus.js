export class MultimeterStatus {
    constructor(toggleStatus, batteryPercentage, rssi, mode, captureRate) {
        this.toggleStatus = toggleStatus
        this.batteryPercentage = batteryPercentage
        this.rssi = rssi
        this.mode = mode
        this.captureRate = captureRate
    }
}