export class MultimeterStopScanListener {
    constructor(bluetoothRepo) {
        this.bluetoothRepo = bluetoothRepo
    }

    execute(callback) {
        return this.bluetoothRepo.bluetoothScanStoppedListener(callback)
    }
}