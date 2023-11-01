export class MultimeterInitialization {
    constructor(bluetoothRepo, settingRepo, multimeterFactory) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
        this.multimeterFactory = multimeterFactory
        this.CONNECTION_DELAY = 3000
    }

    async execute(autoConnect = true) {
        try {
            await this.bluetoothRepo.init()
            if (autoConnect) {
                const { multimeter } = await this.settingRepo.get()
                const { peripheralId, type } = multimeter
                if (peripheralId !== null && peripheralId) {
                    await this.bluetoothRepo.checkState()
                    const multimeterSrvice = this.multimeterFactory.execute(type)
                    setTimeout(async () => {
                        try {
                            await multimeterSrvice.startMultimeter(peripheralId)
                        }
                        catch { }
                    }, this.CONNECTION_DELAY)

                }
            }
        }
        catch (er) {
            //No errors on app initialization
        }
    }
}