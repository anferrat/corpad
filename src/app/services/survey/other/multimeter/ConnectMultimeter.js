export class ConnectMultimeter {
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
        if (peripheralId !== null && peripheralId) {
            const isConnected = await this.bluetoothRepo.isDeviceConnected(peripheralId)
            if (isConnected)
                return {
                    isConnected
                }
            else {
                this.bluetoothRepo.connect(peripheralId)
                return {
                    isConnected: false
                }

            }
        }
        return {
            isConnected: false
        }
    }
}