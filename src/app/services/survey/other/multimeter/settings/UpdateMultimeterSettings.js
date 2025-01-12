import { MultimeterSyncModes } from "../../../../../../constants/global"
import { MultimeterSettings } from "../../../../../entities/survey/other/MultimeterSettings"

export class UpdateMultimeterSettings {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async _updateSettings(settings) {
        const { peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive, timeSyncMode, offDelay, onSetup, captureRate } = settings
        const { multimeter } = await this.settingRepo.get()
        const newSettings = new MultimeterSettings(
            peripheralId !== undefined ? peripheralId : multimeter.peripheralId,
            name !== undefined ? name : multimeter.name,
            type !== undefined ? type : multimeter.type,
            onTime !== undefined ? onTime : multimeter.onTime,
            offTime !== undefined ? offTime : multimeter.offTime,
            delay !== undefined ? delay : multimeter.delay,
            syncMode !== undefined ? syncMode : multimeter.syncMode,
            firstCycle !== undefined ? firstCycle : multimeter.firstCycle,
            onOffCaptureActive !== undefined ? onOffCaptureActive : multimeter.onOffCaptureActive,
            timeSyncMode !== undefined ? timeSyncMode : multimeter.timeSyncMode,
            offDelay !== undefined ? offDelay : multimeter.offDelay,
            onSetup !== undefined ? onSetup : multimeter.onSetup,
            captureRate !== undefined ? captureRate : multimeter.captureRate
        )
        await this.settingRepo.updateMultimeter(newSettings)
        return newSettings
    }

    async execute(multimeterData) {
        const { onTime, offTime, syncMode, firstCycle, onOffCaptureActive, timeSyncMode, onSetup, offDelay, captureRate } = multimeterData
        const isTimeSync = syncMode === MultimeterSyncModes.GPS
        return await this._updateSettings({
            onTime: onOffCaptureActive ? onTime : undefined,
            offTime: onOffCaptureActive ? offTime : undefined,
            onSetup: onOffCaptureActive && isTimeSync ? onSetup : undefined,
            offDelay: onOffCaptureActive && isTimeSync ? offDelay : undefined,
            syncMode: onOffCaptureActive ? syncMode : undefined,
            firstCycle: onOffCaptureActive && isTimeSync ? firstCycle : undefined,
            timeSyncMode: onOffCaptureActive && isTimeSync ? timeSyncMode : undefined,
            onOffCaptureActive,
            captureRate
        })
    }

    async executeForPairing(multimeterData) {
        const { id, multimeterType, name } = multimeterData
        return await this._updateSettings({ peripheralId: id, type: multimeterType, name })
    }

    async executeForUnpairing() {
        const { multimeter } = await this.settingRepo.get()
        await this._updateSettings({ peripheralId: null, type: null, name: null })
        return multimeter
    }

    async executeForOnOffCapture(onOffCaptureActive) {
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId, type, name, onTime, offTime, delay, syncMode, firstCycle } = multimeter
        const multimeterSettings = new MultimeterSettings(peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive)
        await this.settingRepo.updateMultimeter(multimeterSettings)
    }
}