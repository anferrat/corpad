export class MultimeterStopScan {
    constructor(bluetoothRepo, permissions) {
        this.bluetoothRepo = bluetoothRepo
        this.permissions = permissions
    }

    async execute() {
        await this.permissions.bluetooth()
        return await this.bluetoothRepo.stopScan()
    }
}