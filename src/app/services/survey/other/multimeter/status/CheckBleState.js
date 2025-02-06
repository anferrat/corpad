export class CheckBleState {
    constructor(bluetoothRepo, permissions) {
        this.bluetoothRepo = bluetoothRepo
        this.permissions = permissions
    }

    async execute(bleInitialized) {
        await permissions.bluetooth()
        if (!bleInitialized)
            await this.bluetoothRepo.init()
        const state = await this.bluetoothRepo.checkState()
        return state === this.bluetoothRepo.onState
    }
}