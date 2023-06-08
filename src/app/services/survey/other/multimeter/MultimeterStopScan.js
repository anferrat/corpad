export class MultimeterStopScan {
    constructor(bluetoothRepo) {
        this.bluetoothRepo = bluetoothRepo
    }

    async execute() {
        return await this.bluetoothRepo.stopScan()
    }
}