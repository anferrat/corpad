export class DisconnectMultimeter {
    constructor(bluetoothRepo, settingRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
    }

    async execute() {
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId } = multimeter
        if (peripheralId !== null && peripheralId)
            await this.bluetoothRepo.disconnect(peripheralId)
    }
}