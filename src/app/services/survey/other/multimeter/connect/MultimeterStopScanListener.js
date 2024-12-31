export class MultimeterStopScanListener {
    constructor(bluetoothRepo) {
        this.bluetoothRepo = bluetoothRepo
    }

    execute(callback) {
        //No need for ble permissions here
        return this.bluetoothRepo.bluetoothScanStoppedListener(callback)
    }
}