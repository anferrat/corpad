import { MultimeterSettings } from "../../../../entities/survey/other/MultimeterSettings"

export class UnpairMultimeter {
    constructor(settingRepo, permissions, multimeterFactory) {
        this.settingRepo = settingRepo
        this.permissions = permissions
        this.multimeterFactory = multimeterFactory
    }

    async execute() {
        const settings = await this.settingRepo.get()
        const { multimeter } = settings
        const { peripheralId, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive, type } = multimeter
        const multimeterSettings = new MultimeterSettings(null, null, null, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive)
        await this.settingRepo.updateMultimeter(multimeterSettings)
        if (peripheralId) {
            try {
                await this.permissions.bluetooth()
                this.multimeterFactory.execute(type).stopMultimeter(peripheralId)
            }
            catch { }
        }

    }
}