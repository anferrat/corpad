import { MultimeterCaptureRate, MultimeterListenerEvents, MultimeterModes, MultimeterToggleStatuses, MultimeterVoltageRanges } from "../../../../../../../constants/global"
import { Error, errors } from "../../../../../../utils/Error"
import { MultimeterAbstract } from "../MultimeterAbstract"
import { DvmConstants } from "./constants/DvmConstants"
import { DvmUUIDs } from "./constants/DvmUUIDs"
import { Commands } from "./helpers/Commands"
import { DataConverter } from "./helpers/DataConverter"
import { IsModeSupported } from "./helpers/IsModeSupported"
import { DvmAutoRange } from "./services/DvmAutoRange"
import { DvmReadingListener } from "./services/DvmReadingListener"
import { DvmSetSettings } from "./services/DvmSetSettings"

export class Dvm2130Service extends MultimeterAbstract {
    constructor(bluetoothRepo) {
        super()
        this.bluetoothRepo = bluetoothRepo
        this.uuids = new DvmUUIDs()
        this.isModeSupportedService = new IsModeSupported()
        this.constants = new DvmConstants()

        this.commands = new Commands(bluetoothRepo, this.uuids, this.constants)
        this.dataConverterService = new DataConverter()
        this.dvmAutoRangeService = new DvmAutoRange()
        this.dvmReadingListenerService = new DvmReadingListener(bluetoothRepo, this.uuids, this.dataConverterService, this.dvmAutoRangeService)
        this.dvmSetSettingsService = new DvmSetSettings(this.commands)

        this.TICK = 0
        this.CURRENT_MODE = null
        this.CURRENT_RANGE = null
        this.CURRENT_CAPTURE_RATE = null
    }

    _setMMState(mode, range, rate, tick) {
        this.CURRENT_MODE = mode
        this.CURRENT_RANGE = range
        this.CURRENT_CAPTURE_RATE = rate
        this.TICK = tick
    }

    async start(peripheralId) {
        await super.connectionWrapper(async () => {
            let localTick = 0
            await this.bluetoothRepo.connect(peripheralId)
            await this.bluetoothRepo.retrieveServices(peripheralId)
            await this.bluetoothRepo.startNotification(peripheralId, this.uuids.services.MAIN, this.uuids.characteristics.DMM)
            await this.commands.START_ZZ(peripheralId)
            await this.commands.START_M(peripheralId, localTick)
            localTick++
            await this.commands.START_O(peripheralId, localTick)
            localTick++
            await this.commands.START_R(peripheralId, localTick)
            localTick++
            this._setMMState(MultimeterModes.DVM2130.DC_VOLTS, MultimeterVoltageRanges.DVM2130._250V, MultimeterCaptureRate._60Hz, localTick)
        })
    }

    async stop(peripheralId) {
        await super.connectionWrapper(async () => {
            await this.commands.STOP_1(peripheralId, this.TICK)
            await this.commands.STOP_2(peripheralId)
            await this.bluetoothRepo.stopNotification(peripheralId, this.uuids.services.MAIN, this.uuids.characteristics.DMM)
            await this.bluetoothRepo.disconnect(peripheralId)
        })
    }

    async setSettings(peripheralId, mode, range, isSingleRead, rate = MultimeterCaptureRate._60Hz, cycleTime = 1000) {
        const { ntick, nrange, nmode, nrate } = await this.dvmSetSettingsService.execute(peripheralId, mode, range, rate, this.CURRENT_MODE, this.CURRENT_RANGE, this.CURRENT_CAPTURE_RATE, this.TICK, this._setCurrentMode, this._setCurrentRange, this._setCaptureRate, this._setTick)
        //await new Promise(resolve => setTimeout(resolve, 500))
        this._setMMState(nmode, nrange, nrate, ntick)
    }



    addListener(peripheralId, toggleStatus, mode, range, rate, isSingleRead, cycleTime, onUpdate, onError) {
        let listener
        let updatingRange
        let currentRange = range
        const onRangeUpdate = async (range) => {
            try {
                updatingRange = true
                await this.setSettings(peripheralId, mode, range, isSingleRead, rate, cycleTime)
                onUpdate(MultimeterListenerEvents.NEW_RANGE, range)
                currentRange = range
            }
            catch (er) {
                onError(new Error(errors.MULTIMETER, 'Unable to update range', er, 851))
            }
            finally {
                updatingRange = false
            }
        }

        const getCurrentRange = () => currentRange

        const onOverLimit = async () => {
            //listener.remove()
            //onError(new Error(errors.MULTIMETER, 'Unable to collect readings', 'Over the limit reading is detected', 825))
        }

        listener = this.dvmReadingListenerService.addListener((event, value) => {
            if (!updatingRange)
                onUpdate(event, value)
        }, peripheralId, mode, getCurrentRange, rate, isSingleRead, cycleTime, onRangeUpdate, onOverLimit)

        return {
            remove: listener?.remove
        }
    }

    addToggleStatusListener() {
        return {
            remove: () => { }
        }
    }

    isSupported(toggleStatus, mode, range) {
        return this.isModeSupportedService.execute(toggleStatus, mode, range)
    }

    getToggleStatus() {
        return MultimeterToggleStatuses.DVM2130.DEFAULT
    }
}