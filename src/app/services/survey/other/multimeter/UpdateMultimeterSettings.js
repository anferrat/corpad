import { MultimeterSettings } from "../../../../entities/survey/other/MultimeterSettings"

export class UpdateMultimeterSettings {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute(multimeterData) {
        const { onTime, offTime, delay, syncMode, firstCycle } = multimeterData
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId, type, name, onOffCaptureActive } = multimeter
        const multimeterSettings = new MultimeterSettings(peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive)
        await this.settingRepo.updateMultimeter(multimeterSettings)
    }

    async executeForOnOffCapture(onOffCaptureActive) {
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId, type, name, onTime, offTime, delay, syncMode, firstCycle } = multimeter
        const multimeterSettings = new MultimeterSettings(peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive)
        await this.settingRepo.updateMultimeter(multimeterSettings)
    }
}