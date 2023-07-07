import { MultimeterSettings } from "../../../../entities/survey/other/MultimeterSettings"

export class PairMultimeter {
    constructor(settingRepo, bluetoothRepo, permissions) {
        this.settingRepo = settingRepo
        this.bluetoothRepo = bluetoothRepo
        this.permissions = permissions
    }

    async execute(multimeterData) {
        const { id, multimeterType, name } = multimeterData
        const [{ multimeter }] = await Promise.all([this.settingRepo.get(), this.permissions.bluetooth()])
        const { onTime, offTime, delay, syncMode, firstCycle } = multimeter
        const multimeterSettings = new MultimeterSettings(id, name, multimeterType, onTime, offTime, delay, syncMode, firstCycle)
        await Promise.all([this.settingRepo.updateMultimeter(multimeterSettings), this.bluetoothRepo.connect(id)])
        return
    }
}