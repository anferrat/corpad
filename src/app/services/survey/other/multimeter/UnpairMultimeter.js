import { MultimeterSettings } from "../../../../entities/survey/other/MultimeterSettings"

export class UnpairMultimeter {
    constructor(settingRepo, bluetoothRepo, permissions) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
        this.permissions = permissions
    }

    async execute() {
        const settings = await this.settingRepo.get()
        const { multimeter } = settings
        const { peripheralId, onTime, offTime, delay, syncMode, firstCycle } = multimeter
        const multimeterSettings = new MultimeterSettings(null, null, null, onTime, offTime, delay, syncMode, firstCycle)
        await this.settingRepo.updateMultimeter(multimeterSettings)
        if (peripheralId) {
            try {
                await this.permissions.bluetooth()
                const connected = await this.bluetoothRepo.isDeviceConnected(peripheralId)
                if (connected) {
                    await this.bluetoothRepo.disconnect(peripheralId)
                }
            }
            catch { }
        }

    }
}