import { BluetoothRepository } from "../repository/bluetooth/BluetoothRepository"
import { SettingRepository } from "../repository/sqlite/SettingRepository"
import { PokitMultimeterService } from "../services/other/PokitMultimeterService"
import { ConnectMultimeter } from "../services/survey/other/multimeter/ConnectMultimeter"
import { GetMultimeterSettings } from "../services/survey/other/multimeter/GetMultimeterSettings"
import { MultimeterScan } from "../services/survey/other/multimeter/MultimeterScan"
import { MultimeterScanListener } from "../services/survey/other/multimeter/MultimeterScanListener"
import { MultimeterStopScan } from "../services/survey/other/multimeter/MultimeterStopScan"
import { MultimeterStopScanListener } from "../services/survey/other/multimeter/MultimeterStopScanListener"
import { UpdateMultimeterSettings } from "../services/survey/other/multimeter/UpdateMultimeterSettings"
import { PairMultimeter } from "../services/survey/other/multimeter/PairMultimeter"
import { Controller } from "../utils/Controller"
import { MultimeterValidation } from "../validation/MultimeterValidation"
import { UnpairMultimeter } from "../services/survey/other/multimeter/UnpairMultimeter"
import { DisconnectMultimeter } from "../services/survey/other/multimeter/DisconnectMultimeter"
import { MultimeterStatusListener } from "../services/survey/other/multimeter/MultimeterStatusListener"
import { AppStateListener } from "../services/other/AppStateListenerService"


class MultimeterController extends Controller {
    constructor(bluetoothRepo, settingRepo) {
        super()
        this.miltimeterService = new PokitMultimeterService(bluetoothRepo, settingRepo)
        this.multimeterScanService = new MultimeterScan(bluetoothRepo)
        this.multimeterStopScanService = new MultimeterStopScan(bluetoothRepo)
        this.multimeterStopScanListenerService = new MultimeterStopScanListener(bluetoothRepo)
        this.multimeterScanListenerService = new MultimeterScanListener(bluetoothRepo)
        this.getMultimeterSettingsService = new GetMultimeterSettings(settingRepo)
        this.updateMultimeterSettingService = new UpdateMultimeterSettings(settingRepo)
        this.pairMultimeterService = new PairMultimeter(settingRepo, bluetoothRepo)
        this.unpairMultimeterService = new UnpairMultimeter(settingRepo, bluetoothRepo)
        this.connectMultimeterService = new ConnectMultimeter(bluetoothRepo, settingRepo)
        this.disconnectMultimeterService = new DisconnectMultimeter(bluetoothRepo, settingRepo)
        this.appStateListenerService = new AppStateListener()
        this.multimeterStatusListenerService = new MultimeterStatusListener(bluetoothRepo, settingRepo, this.appStateListenerService)


        this.validation = new MultimeterValidation()
    }

    init(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            return await this.miltimeterService.init()
        })
    }

    test(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            return await this.miltimeterService.test()
        })
    }

    scan(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            return await this.multimeterScanService.execute(10)
        })
    }

    stopScan(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            return await this.multimeterStopScanService.execute()
        })
    }

    stopScanListener(callback, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 100, () => {
            return this.multimeterStopScanListenerService.execute(callback)
        })
    }

    scanListener({ onDiscovered, pairedId }, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 100, () => {
            return this.multimeterScanListenerService.execute(onDiscovered, [pairedId])
        })
    }

    getSettings(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 651, async () => {
            return await this.getMultimeterSettingsService.execute()
        })
    }

    updateSettings(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 652, async () => {
            const multimeterData = this.validation.updateSettings(params)
            return await this.updateMultimeterSettingService.execute(multimeterData)
        })
    }

    pairMultimeter(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 652, async () => {
            const multimeterData = this.validation.pairMultimeter(params)
            return await this.pairMultimeterService.execute(multimeterData)
        })
    }

    unpairMultimeter(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 652, async () => {
            return await this.unpairMultimeterService.execute()
        })
    }

    connectMultimeter(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 652, async () => {
            return await this.connectMultimeterService.execute()
        })
    }


    disconnectMultimeter(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 652, async () => {
            return await this.disconnectMultimeterService.execute()
        })
    }

    addMultimeterStatusListener(callback, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 652, () => {
            return this.multimeterStatusListenerService.execute(callback)
        })
    }

    requestVoltage(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 652, async () => {
            return await this.miltimeterService.requestVolatgeReading()
        })
    }

    addVoltageListener(callback, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 652, async () => {
            return await this.miltimeterService.addVoltageListener(callback)
        })
    }

}

const multimeterController = new MultimeterController(
    new BluetoothRepository(),
    new SettingRepository(),
)

export const testMultimeter = async (onError, onSuccess) => await multimeterController.test(onError, onSuccess)

export const initBluetooth = async (onError, onSuccess) => await multimeterController.init(onError, onSuccess)

export const startMultimeterScan = async (onError, onSuccess) => await multimeterController.scan(onError, onSuccess)

export const stopMultimeterScan = async (onError, onSuccess) => await multimeterController.stopScan(onError, onSuccess)

export const multimeterScanListener = ({ onDiscovered, pairedId }, onError, onSuccess) => multimeterController.scanListener({ onDiscovered, pairedId }, onError, onSuccess)

export const multimeterStopScanListener = (callback, onError, onSuccess) => multimeterController.stopScanListener(callback, onError, onSuccess)

export const getMultimeterSettings = (onError, onSuccess) => multimeterController.getSettings(onError, onSuccess)

export const updateMultimeterSettings = ({ onTime, offTime, delay, syncMode }, onError, onSuccess) => multimeterController.updateSettings({ onTime, offTime, delay, syncMode }, onError, onSuccess)

export const pairMultimeter = ({ id, multimeterType, name }, onError, onSuccess) => multimeterController.pairMultimeter({ id, multimeterType, name }, onError, onSuccess)

export const unpairMultimeter = (onError, onSuccess) => multimeterController.unpairMultimeter(onError, onSuccess)

export const connectMultimeter = (onError, onSuccess) => multimeterController.connectMultimeter(onError, onSuccess)

export const disconnectMultimeter = (onError, onSuccess) => multimeterController.disconnectMultimeter(onError, onSuccess)

export const addMultimeterStatusListener = (callback, onError, onSuccess) => multimeterController.addMultimeterStatusListener(callback, onError, onSuccess)

export const requestVoltage = (onError, onSuccess) => multimeterController.requestVoltage(onError, onSuccess)

export const addVoltageListener = (callback, onError, onSuccess) => multimeterController.addVoltageListener(callback, onError, onSuccess)