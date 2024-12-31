export class MultimeterScan {
    constructor(bluetoothRepo, permissions) {
        this.bluetoothRepo = bluetoothRepo
        this.permissions = permissions
       
    }

    async execute(seconds) {
        await this.permissions.bluetooth()
        return await this.bluetoothRepo.scan([], seconds, false)
    }
}