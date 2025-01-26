export class MultimeterInitialization {
    constructor(bluetoothRepo, connectMultimeterService) {
        this.bluetoothRepo = bluetoothRepo
        this.connectMultimeterService = connectMultimeterService
        this.CONNECTION_DELAY = 3000
    }

    async execute(autoConnect = true) {
        try {
            await this.bluetoothRepo.init()
            if (autoConnect)
                await this.connectMultimeterService.execute(this.CONNECTION_DELAY)
        }
        catch (er) {
            console.log(er)
            //No errors on app initialization
        }
    }
}