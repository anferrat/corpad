export class CheckConnectedDevices {
    constructor(bluetoothRepo, permissions, settingRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.permissions = permissions
        this.settingRepo = settingRepo
    }

    async execute() {
        await this.permissions.bluetooth()
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId, name, type } = multimeter

        if (!peripheralId || !type)
            return []

        const isConnected = await this.bluetoothRepo.isDeviceConnected(peripheralId)
        if (!isConnected)
            return []

        return [{
            id: peripheralId,
            name,
            type
        }]
    }
}
