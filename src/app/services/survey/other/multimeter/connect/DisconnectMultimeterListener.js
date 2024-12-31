export class DisconnectMultimeterListener {
    constructor(bluetoothRepo, settingRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
    }

    execute(callback) {
        const onDisconnect = async (id) => {
            const { multimeter } = await this.settingRepo.get()
            if (id === multimeter.peripheralId && multimeter.peripheralId !== null)
                callback(id)
        }
        return this.bluetoothRepo.disconnectedDevicesListener(onDisconnect)
    }
}