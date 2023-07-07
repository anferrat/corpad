export class DisconnectMultimeter {
    constructor(bluetoothRepo, settingRepo, permissions) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
        this.permissions = permissions
    }

    async execute() {
        const [{ multimeter }] = await Promise.all([
            this.settingRepo.get(),
            this.permissions.bluetooth()
        ])
        const { peripheralId } = multimeter
        if (peripheralId !== null && peripheralId)
            await this.bluetoothRepo.disconnect(peripheralId)
    }
}