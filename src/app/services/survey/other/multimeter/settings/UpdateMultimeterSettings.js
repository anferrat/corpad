import { MultimeterSettings } from "../../../../../entities/survey/other/MultimeterSettings"

export class UpdateMultimeterSettings {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async _updateSettings(settings) {
        const { peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive, timeSyncMode, offDelay, onSetup, captureRate } = settings
        const { multimeter } = await this.settingRepo.get()
        const newSettings = new MultimeterSettings(
            peripheralId ?? multimeter.peripheralId,
            name ?? multimeter.name,
            type ?? multimeter.type,
            onTime ?? multimeter.onTime,
            offTime ?? multimeter.offTime,
            delay ?? multimeter.delay,
            syncMode ?? multimeter.syncMode,
            firstCycle ?? multimeter.firstCycle,
            onOffCaptureActive ?? multimeter.onOffCaptureActive,
            timeSyncMode ?? multimeter.timeSyncMode,
            offDelay ?? multimeter.offDelay,
            onSetup ?? multimeter.onSetup,
            captureRate ?? multimeter.captureRate
        )
        await this.settingRepo.updateMultimeter(newSettings)
    }

    async execute(multimeterData) {
        const { onTime, offTime, delay, syncMode, firstCycle } = multimeterData
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId, type, name, onOffCaptureActive } = multimeter
        const multimeterSettings = new MultimeterSettings(peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive)
        await this.settingRepo.updateMultimeter(multimeterSettings)
    }

    async executeForPairing(multimeterData) {
        const { id, multimeterType, name } = multimeterData
        await this._updateSettings({ peripheralId: id, type: multimeterType, name })
    }

    async executeForUnpairing() {
        await this._updateSettings({ peripheralId: null, type: null, name: null })
    }

    async executeForOnOffCapture(onOffCaptureActive) {
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId, type, name, onTime, offTime, delay, syncMode, firstCycle } = multimeter
        const multimeterSettings = new MultimeterSettings(peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive)
        await this.settingRepo.updateMultimeter(multimeterSettings)
    }
}