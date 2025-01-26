export class MultimeterStatusListener {
    constructor(bluetoothRepo, settingRepo, appStateListenerService, connectMultimeterService) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
        this.appStateListenerService = appStateListenerService
        this.connectMultimeterService = connectMultimeterService
    }

    execute(callback, peripheralId) {
        const onEvent = async (id, status) => {
            if (peripheralId === id && id !== null)
                callback({ isConnected: status })
        }

        const onAppStateChange = async (callback) => {
            try {
                if (peripheralId !== null) {
                    const status = await this.bluetoothRepo.isDeviceConnected(peripheralId)
                    callback({ isConnected: status })
                }
            }
            catch { }
        }

        const connect = this.bluetoothRepo.connectedDevicesListener((id) => onEvent(id, true))
        const disconnect = this.bluetoothRepo.disconnectedDevicesListener((id) => onEvent(id, false))
        const updateOnAppStateChange = this.appStateListenerService.addStatusListener(nextState => {
            if (nextState === 'active')
                onAppStateChange(callback)
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