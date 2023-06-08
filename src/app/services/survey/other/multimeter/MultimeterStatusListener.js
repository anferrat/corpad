export class MultimeterStatusListener {
    constructor(bluetoothRepo, settingRepo, appStateListenerService) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
        this.appStateListenerService = appStateListenerService
    }

    execute(callback) {
        const onEvent = async (id, status) => {
            const { multimeter } = await this.settingRepo.get()
            if (multimeter.peripheralId === id && id !== null) {
                callback({ isConnected: status })
            }
        }

        const onAppStateChange = async (callback) => {
            const { multimeter } = await this.settingRepo.get()
            if (multimeter.peripheralId !== null && multimeter.peripheralId !== null) {
                const status = await this.bluetoothRepo.isDeviceConnected(multimeter.peripheralId)
                callback({ isConnected: status })

            }
        }

        const connect = this.bluetoothRepo.connectedDevicesListener((id) => onEvent(id, true))
        const disconnect = this.bluetoothRepo.disconnectedDevicesListener((id) => onEvent(id, false))
        const updateOnAppStateChange = this.appStateListenerService.addStatusListener(nextState => {
            if (nextState === 'active') {
                onAppStateChange(callback)
            }
        })

        return () => {
            connect.remove()
            disconnect.remove()
            updateOnAppStateChange.remove()
        }
    }
}