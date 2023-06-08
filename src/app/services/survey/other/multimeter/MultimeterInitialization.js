export class MultimeterInitialization {
    constructor(bluetoothRepo, settingRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
        this.CONNECTION_DELAY = 3000
    }

    async execute() {
        await this.bluetoothRepo.init()
        await this.bluetoothRepo.checkState()
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId } = multimeter
        if (peripheralId !== null && peripheralId) {
            setTimeout(() => this.bluetoothRepo.connect(peripheralId), this.CONNECTION_DELAY)

        }
    }
}