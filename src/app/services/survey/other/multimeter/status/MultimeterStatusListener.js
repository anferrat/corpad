export class MultimeterStatusListener {
    constructor(bluetoothRepo, settingRepo, appStateListenerService, connectMultimeterService) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
        this.appStateListenerService = appStateListenerService
        this.connectMultimeterService = connectMultimeterService
    }

    execute(callback) {
        const onEvent = async (id, status) => {
            try {
                const { multimeter } = await this.settingRepo.get()
                if (multimeter.peripheralId === id && id !== null) {
                    callback({ isConnected: status })
                }
            }
            catch { }
        }

        const onAppStateChange = async (callback) => {
            try {
                const { multimeter } = await this.settingRepo.get()
                if (multimeter.peripheralId !== null && multimeter.peripheralId !== null) {
                    const status = await this.bluetoothRepo.isDeviceConnected(multimeter.peripheralId)
                    callback({ isConnected: status })
                }
            }
            catch { }
        }

        const connect = this.bluetoothRepo.connectedDevicesListener((id) => onEvent(id, true))
        const disconnect = this.bluetoothRepo.disconnectedDevicesListener((id) => onEvent(id, false))
        const updateOnAppStateChange = this.appStateListenerService.addStatusListener(nextState => {
            if (nextState === 'active') {
                onAppStateChange(callback)
            }
        })

        return {
            remove: () => {
                connect.remove()
                disconnect.remove()
                updateOnAppStateChange.remove()
            }
        }
    }
}