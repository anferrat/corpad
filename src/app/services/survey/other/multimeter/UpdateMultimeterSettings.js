import { MultimeterSettings } from "../../../../entities/survey/other/MultimeterSettings"

export class UpdateMultimeterSettings {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute(multimeterData) {
        const { onTime, offTime, delay, syncMode, firstCycle } = multimeterData
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId, type, name } = multimeter
        const multimeterSettings = new MultimeterSettings(peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle)
        await this.settingRepo.updateMultimeter(multimeterSettings)
    }
}