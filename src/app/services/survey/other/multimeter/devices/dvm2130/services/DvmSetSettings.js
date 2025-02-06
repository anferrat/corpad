import { MultimeterModes } from "../../../../../../../../constants/global"

export class DvmSetSettings {
    constructor(commands) {
        this.commands = commands
    }

    async execute(peripheralId, mode, range, rate, currentMode, currentRange, currentRate, tick) {
        let localTick = tick
        let localRange = currentRange
        let localMode = currentMode
        let localRate = currentRate
        if ((currentMode === mode && currentRange === range && currentRate === rate) || mode === MultimeterModes.DVM2130.IDLE)
            return {
                ntick: localTick,
                nrange: localRange,
                nrate: localRate,
                nmode: localMode,
            }
        else {

            if (currentMode !== mode || currentRange !== range) {
                await this.commands.SETTING_UPDATE(peripheralId, mode, range, localTick)
                localTick++
                localMode = mode
                localRange = range
            }
            if (currentRate !== rate) {
                await this.commands.CAPTURE_RATE_UPDATE(peripheralId, rate, localTick)
                localTick++
                localRate = rate
            }
            return {
                ntick: localTick,
                nrange: localRange,
                nrate: localRate,
                nmode: localMode,
            }
        }
    }
}