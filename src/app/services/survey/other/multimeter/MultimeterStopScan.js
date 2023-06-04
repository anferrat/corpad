export class MultimeterStopScan {
    constructor(bluetoothRepo) {
        this.bluetoothrepo = bluetoothRepo
    }

    async execute() {
        return await this.bluetoothRepo.stopScan()
    }
}