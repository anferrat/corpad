import { BluetoothRepository } from "../repository/bluetooth/BluetoothRepository"
import { SettingRepository } from "../repository/sqlite/SettingRepository"
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
import { PotentialCaptureSetup } from "../services/survey/other/multimeter/PotentialCaptureSetup"
import { PotentialCaptureListener } from "../services/survey/other/multimeter/PotentialCaptureListener"
import { Permissions } from "../services/other/Permissions"


class MultimeterController extends Controller {
    constructor(bluetoothRepo, settingRepo, permissions) {
        super()
        this.potentialCaptureSetupService = new PotentialCaptureSetup(settingRepo, bluetoothRepo, permissions)
        this.potentialCaptureListenerService = new PotentialCaptureListener(bluetoothRepo)
        this.multimeterScanService = new MultimeterScan(bluetoothRepo, permissions)
        this.multimeterStopScanService = new MultimeterStopScan(bluetoothRepo, permissions)
        this.multimeterStopScanListenerService = new MultimeterStopScanListener(bluetoothRepo)
        this.multimeterScanListenerService = new MultimeterScanListener(bluetoothRepo)
        this.getMultimeterSettingsService = new GetMultimeterSettings(settingRepo)
        this.updateMultimeterSettingService = new UpdateMultimeterSettings(settingRepo)
        this.pairMultimeterService = new PairMultimeter(settingRepo, bluetoothRepo, permissions)
        this.unpairMultimeterService = new UnpairMultimeter(settingRepo, bluetoothRepo, permissions)
        this.connectMultimeterService = new ConnectMultimeter(bluetoothRepo, settingRepo, permissions)
        this.disconnectMultimeterService = new DisconnectMultimeter(bluetoothRepo, settingRepo, permissions)
        this.appStateListenerService = new AppStateListener()
        this.multimeterStatusListenerService = new MultimeterStatusListener(bluetoothRepo, settingRepo, this.appStateListenerService)


        this.validation = new MultimeterValidation()
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
            const { multimeterType } = this.validation.checkMultimeterType(params)
            const multimeterData = this.validation.updateSettings(params, multimeterType)
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

    potentialCaptureSetup(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 652, async () => {
            return await this.potentialCaptureSetupService.execute()
        })
    }

    addPotentialListener(callback, data, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 652, () => {
            return this.potentialCaptureListenerService.addListener(callback, data)
        })
    }

}

const multimeterController = new MultimeterController(
    new BluetoothRepository(),
    new SettingRepository(),
    new Permissions()
)

export const startMultimeterScan = async (onError, onSuccess) => await multimeterController.scan(onError, onSuccess)

export const stopMultimeterScan = async (onError, onSuccess) => await multimeterController.stopScan(onError, onSuccess)

export const multimeterScanListener = ({ onDiscovered, pairedId }, onError, onSuccess) => multimeterController.scanListener({ onDiscovered, pairedId }, onError, onSuccess)

export const multimeterStopScanListener = (callback, onError, onSuccess) => multimeterController.stopScanListener(callback, onError, onSuccess)

export const getMultimeterSettings = (onError, onSuccess) => multimeterController.getSettings(onError, onSuccess)

export const updateMultimeterSettings = ({ onTime, offTime, delay, syncMode, firstCycle, multimeterType }, onError, onSuccess) => multimeterController.updateSettings({ onTime, offTime, delay, syncMode, firstCycle, multimeterType }, onError, onSuccess)

export const pairMultimeter = ({ id, multimeterType, name }, onError, onSuccess) => multimeterController.pairMultimeter({ id, multimeterType, name }, onError, onSuccess)

export const unpairMultimeter = (onError, onSuccess) => multimeterController.unpairMultimeter(onError, onSuccess)

export const connectMultimeter = (onError, onSuccess) => multimeterController.connectMultimeter(onError, onSuccess)

export const disconnectMultimeter = (onError, onSuccess) => multimeterController.disconnectMultimeter(onError, onSuccess)

export const addMultimeterStatusListener = (callback, onError, onSuccess) => multimeterController.addMultimeterStatusListener(callback, onError, onSuccess)

export const potentialCaptureSetup = (onError, onSuccess) => multimeterController.potentialCaptureSetup(onError, onSuccess)

export const addPotentialListener = (callback, { peripheralId, type, onTime, offTime, syncMode, firstCycle, timeAdjustment }, onError, onSuccess) => multimeterController.addPotentialListener(callback, { peripheralId, type, onTime, offTime, syncMode, firstCycle, timeAdjustment }, onError, onSuccess)