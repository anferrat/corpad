export class ConnectMultimeter {
    constructor(bluetoothRepo, settingRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
    }

    async execute() {
        const { multimeter } = await this.settingRepo.get()
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