import { MultimeterSettings } from "../../../../entities/survey/other/MultimeterSettings"

export class PairMultimeter {
    constructor(settingRepo, permissions, multimeterFactory) {
        this.settingRepo = settingRepo
        this.permissions = permissions
        this.multimeterFactory = multimeterFactory
    }

    async execute(multimeterData) {
        const { id, multimeterType, name } = multimeterData
        const [{ multimeter }] = await Promise.all([this.settingRepo.get(), this.permissions.bluetooth()])
        const { onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive } = multimeter
        const multimeterSettings = new MultimeterSettings(id, name, multimeterType, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive)
        await Promise.all([this.settingRepo.updateMultimeter(multimeterSettings), this.multimeterFactory.execute(multimeterType).startMultimeter(id)])
        return
    }
}