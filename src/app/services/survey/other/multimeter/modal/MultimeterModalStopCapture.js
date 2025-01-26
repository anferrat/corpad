import { MultimeterModes } from "../../../../../../constants/global"

export class MultimeterModalStopCapture {
    constructor(multimeterFactory) {
        this.multimeterFactory = multimeterFactory
    }

    async execute(peripheralId, multimeterType) {
        const multimeterService = this.multimeterFactory.execute(multimeterType)
        await multimeterService.setSettings(peripheralId, MultimeterModes[multimeterType].IDLE, null, true, null, null)
    }
}