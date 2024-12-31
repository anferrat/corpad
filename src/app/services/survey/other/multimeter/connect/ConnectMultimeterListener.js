export class ConnectMultimeterListener {
    constructor(bluetoothRepo, settingRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
    }

    execute(callback) {
        const onConnect = async (id) => {
            const { multimeter } = await this.settingRepo.get()
            if (multimeter.peripheralId === id && id !== null) {
                callback(id)
            }
        }
        return this.bluetoothRepo.connectedDevicesListener(onConnect)
    }
}