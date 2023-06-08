import { MultimeterSettings } from "../../../../entities/survey/other/MultimeterSettings"

export class UnpairMultimeter {
    constructor(settingRepo, bluetoothRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
    }

    async execute() {
        const settings = await this.settingRepo.get()
        const { multimeter } = settings
        const { peripheralId, onTime, offTime, delay, syncMode, firstCycle } = multimeter
        if (peripheralId) {
            const connected = await this.bluetoothRepo.isDeviceConnected(peripheralId)
            if (connected) {
                await this.bluetoothRepo.disconnect(peripheralId)
            }
        }
        const multimeterSettings = new MultimeterSettings(null, null, null, onTime, offTime, delay, syncMode, firstCycle)
        await this.settingRepo.updateMultimeter(multimeterSettings)
    }
}