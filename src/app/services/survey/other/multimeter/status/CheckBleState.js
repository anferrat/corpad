export class CheckBleState {
    constructor(bluetoothRepo) {
        this.bluetoothRepo = bluetoothRepo
    }

    async execute() {
        const state = await this.bluetoothRepo.checkState()
        return state === this.bluetoothRepo.onState
    }
}