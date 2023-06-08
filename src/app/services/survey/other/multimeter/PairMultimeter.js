import { MultimeterSettings } from "../../../../entities/survey/other/MultimeterSettings"

export class PairMultimeter {
    constructor(settingRepo, bluetoothRepo) {
        this.settingRepo = settingRepo
        this.bluetoothRepo = bluetoothRepo
    }

    async execute(multimeterData) {
        const { id, multimeterType, name } = multimeterData
        const { multimeter } = await this.settingRepo.get()
        const { onTime, offTime, delay, syncMode, firstCycle } = multimeter
        const multimeterSettings = new MultimeterSettings(id, name, multimeterType, onTime, offTime, delay, syncMode, firstCycle)
        await this.settingRepo.updateMultimeter(multimeterSettings)
        await this.bluetoothRepo.connect(id)
        return
    }
}