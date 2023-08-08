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
import { ReadingCaptureSetup } from "../services/survey/other/multimeter/ReadingCaptureSetup"
import { ReadingCaptureListener } from "../services/survey/other/multimeter/ReadingCaptureListener"
import { Permissions } from "../services/other/Permissions"
import { GeolocationRepository } from "../repository/geolocation/GeolocationRepository"
import { StopReadingCapture } from "../services/survey/other/multimeter/StopReadingCapture"
import { MultimeterFactory } from "../services/survey/other/multimeter/_devices/MultimeterFactory"
import { GetOnOffPotentialPair } from "../services/survey/other/multimeter/GetOnOffPotentialPair"
import { PotentialRepository } from "../repository/sqlite/PotentialRepository"
import { PotentialTypeRepository } from "../repository/sqlite/PotentialTypeRepository"
import { UnitConverter } from "../services/other/UnitConverter"

class MultimeterController extends Controller {
    constructor(bluetoothRepo, settingRepo, geolocationRepo, potentialRepo, potentialTypeRepo, permissions, unitConverter) {
        super()
        this.multimeterFactory = new MultimeterFactory(bluetoothRepo, unitConverter)


        this.multimeterScanService = new MultimeterScan(bluetoothRepo, permissions)
        this.multimeterStopScanService = new MultimeterStopScan(bluetoothRepo, permissions)
        this.multimeterStopScanListenerService = new MultimeterStopScanListener(bluetoothRepo)
        this.multimeterScanListenerService = new MultimeterScanListener(bluetoothRepo)

        this.getMultimeterSettingsService = new GetMultimeterSettings(settingRepo)
        this.updateMultimeterSettingService = new UpdateMultimeterSettings(settingRepo)

        this.pairMultimeterService = new PairMultimeter(settingRepo, permissions, this.multimeterFactory)
        this.unpairMultimeterService = new UnpairMultimeter(settingRepo, permissions, this.multimeterFactory)
        this.connectMultimeterService = new ConnectMultimeter(settingRepo, permissions, this.multimeterFactory)
        this.disconnectMultimeterService = new DisconnectMultimeter(settingRepo, permissions, this.multimeterFactory)
        this.appStateListenerService = new AppStateListener()

        this.multimeterStatusListenerService = new MultimeterStatusListener(bluetoothRepo, settingRepo, this.appStateListenerService)

        this.getOnOffPotentialService = new GetOnOffPotentialPair(potentialRepo, potentialTypeRepo)
        this.readingCaptureSetupService = new ReadingCaptureSetup(settingRepo, permissions, this.multimeterFactory, this.getOnOffPotentialService)
        this.stopReadingCaptureService = new StopReadingCapture(this.multimeterFactory)
        this.readingCaptureListenerService = new ReadingCaptureListener(geolocationRepo, this.multimeterFactory)

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
            const multimeterType = this.validation.checkMultimeterType(params)
            const multimeterData = this.validation.updateSettings(params, multimeterType)
            return await this.updateMultimeterSettingService.execute(multimeterData)
        })
    }

    updateOnOffCaptureSetting(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 652, async () => {
            const { onOffCaptureActive } = params
            return await this.updateMultimeterSettingService.executeForOnOffCapture(onOffCaptureActive)
        })
    }

    pairMultimeter(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 653, async () => {
            const multimeterData = this.validation.pairMultimeter(params)
            return await this.pairMultimeterService.execute(multimeterData)
        })
    }

    unpairMultimeter(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 653, async () => {
            return await this.unpairMultimeterService.execute()
        })
    }

    connectMultimeter(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 651, async () => {
            return await this.connectMultimeterService.execute()
        })
    }


    disconnectMultimeter(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 651, async () => {
            return await this.disconnectMultimeterService.execute()
        })
    }


    readingCaptureSetup(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 654, async () => {
            const { measurementType, potentialId, subitemId } = params
            return await this.readingCaptureSetupService.execute({ measurementType, potentialId, subitemId })
        })
    }

    stopReadingCapture(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 654, async () => {
            const { multimeterType, id, measurementType } = this.validation.stopReadingCapture(params)
            return await this.stopReadingCaptureService.execute(id, multimeterType, measurementType)
        })
    }

    addReadingListener(onValueChange, onModeChange, onButtonPress, data, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 100, () => {
            return this.readingCaptureListenerService.addListener(onValueChange, onModeChange, onButtonPress, data)
        })
    }

    addMultimeterStatusListener(callback, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 100, () => {
            return this.multimeterStatusListenerService.execute(callback)
        })
    }
}

const multimeterController = new MultimeterController(
    new BluetoothRepository(),
    new SettingRepository(),
    new GeolocationRepository(),
    new PotentialRepository(),
    new PotentialTypeRepository(),
    new Permissions(),
    new UnitConverter()
)

export const startMultimeterScan = async (onError, onSuccess) => await multimeterController.scan(onError, onSuccess)

export const stopMultimeterScan = async (onError, onSuccess) => await multimeterController.stopScan(onError, onSuccess)

export const multimeterScanListener = ({ onDiscovered, pairedId }, onError, onSuccess) => multimeterController.scanListener({ onDiscovered, pairedId }, onError, onSuccess)

export const multimeterStopScanListener = (callback, onError, onSuccess) => multimeterController.stopScanListener(callback, onError, onSuccess)

export const getMultimeterSettings = (onError, onSuccess) => multimeterController.getSettings(onError, onSuccess)

export const updateMultimeterSettings = ({ onTime, offTime, delay, syncMode, firstCycle, multimeterType }, onError, onSuccess) => multimeterController.updateSettings({ onTime, offTime, delay, syncMode, firstCycle, multimeterType }, onError, onSuccess)

export const updateMultimeterOnOffCapture = ({ onOffCaptureActive }, onError, onSuccess) => multimeterController.updateOnOffCaptureSetting({ onOffCaptureActive }, onError, onSuccess)

export const pairMultimeter = ({ id, multimeterType, name }, onError, onSuccess) => multimeterController.pairMultimeter({ id, multimeterType, name }, onError, onSuccess)

export const unpairMultimeter = (onError, onSuccess) => multimeterController.unpairMultimeter(onError, onSuccess)

export const connectMultimeter = (onError, onSuccess) => multimeterController.connectMultimeter(onError, onSuccess)

export const disconnectMultimeter = (onError, onSuccess) => multimeterController.disconnectMultimeter(onError, onSuccess)

export const addMultimeterStatusListener = (callback, onError, onSuccess) => multimeterController.addMultimeterStatusListener(callback, onError, onSuccess)

export const readingCaptureSetup = ({ measurementType, potentialId, subitemId }, onError, onSuccess) => multimeterController.readingCaptureSetup({ measurementType, potentialId, subitemId }, onError, onSuccess)

export const addReadingListener = (onValueChange, onModeChange, onButtonPress, { peripheralId, type, onTime, offTime, syncMode, firstCycle, measurementType }, onError, onSuccess) => multimeterController.addReadingListener(onValueChange, onModeChange, onButtonPress, { peripheralId, type, onTime, offTime, syncMode, firstCycle, measurementType }, onError, onSuccess)

export const stopReadingCapture = ({ id, multimeterType, measurementType }, onError, onSuccess) => multimeterController.stopReadingCapture({ id, multimeterType, measurementType }, onError, onSuccess)