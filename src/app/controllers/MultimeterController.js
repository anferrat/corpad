import { Controller } from "../utils/Controller"
import { MultimeterValidation } from "../validation/MultimeterValidation"
import { bluetoothRepo, potentialRepo, potentialTypeRepo, settingRepo } from "./_instances/repositories"
import { appStateListener, permissions, timeService, unitConverter } from "./_instances/general_services"
import { MultimeterScan } from "../services/survey/other/multimeter/connect/MultimeterScan"
import { MultimeterStopScan } from "../services/survey/other/multimeter/connect/MultimeterStopScan"
import { MultimeterStopScanListener } from "../services/survey/other/multimeter/connect/MultimeterStopScanListener"
import { MultimeterScanListener } from "../services/survey/other/multimeter/connect/MultimeterScanListener"
import { GetMultimeterSettings } from "../services/survey/other/multimeter/settings/GetMultimeterSettings"
import { UpdateMultimeterSettings } from "../services/survey/other/multimeter/settings/UpdateMultimeterSettings"
import { PairMultimeter } from "../services/survey/other/multimeter/connect/PairMultimeter"
import { UnpairMultimeter } from "../services/survey/other/multimeter/connect/UnpairMultimeter"
import { DisconnectMultimeter } from "../services/survey/other/multimeter/connect/DisconnectMultimeter"
import { MultimeterStatusListener } from "../services/survey/other/multimeter/status/MultimeterStatusListener"
import { GetOnOffPotentialPair } from "../services/survey/other/multimeter/collect_readings/GetOnOffPotentialPair"
import { CheckBleState } from "../services/survey/other/multimeter/status/CheckBleState"
import { PropertyFieldCapture } from "../services/survey/other/multimeter/collect_readings/PropertyFieldCapture"
import { PropertyFieldCaptureSetup } from "../services/survey/other/multimeter/collect_readings/PropertyFieldCaptureSetup"
import { connectMultimeterService, multimeterFactory, multimeterPropertyCaptureParameters } from "./_instances/multimeter"
import { CheckConnectedDevices } from "../services/survey/other/multimeter/connect/CheckConnectedDevices"


class MultimeterController extends Controller {
    constructor(multimeterFactory, bluetoothRepo, settingRepo, potentialRepo, potentialTypeRepo, permissions, unitConverter, appStateListener, timeService, multimeterPropertyCaptureParameters, connectMultimeterService) {
        super()
        this.multimeterFactory = multimeterFactory


        this.multimeterScanService = new MultimeterScan(bluetoothRepo, permissions)
        this.multimeterStopScanService = new MultimeterStopScan(bluetoothRepo, permissions)
        this.multimeterStopScanListenerService = new MultimeterStopScanListener(bluetoothRepo)
        this.multimeterScanListenerService = new MultimeterScanListener(bluetoothRepo)

        this.getMultimeterSettingsService = new GetMultimeterSettings(settingRepo)
        this.updateMultimeterSettingService = new UpdateMultimeterSettings(settingRepo)

        this.pairMultimeterService = new PairMultimeter(permissions, this.multimeterFactory, this.updateMultimeterSettingService)
        this.unpairMultimeterService = new UnpairMultimeter(permissions, this.multimeterFactory, this.updateMultimeterSettingService)

        this.connectMultimeterService = connectMultimeterService
        this.disconnectMultimeterService = new DisconnectMultimeter(settingRepo, permissions, this.multimeterFactory)


        this.multimeterStatusListenerService = new MultimeterStatusListener(bluetoothRepo, settingRepo, appStateListener, connectMultimeterService)

        this.getOnOffPotentialService = new GetOnOffPotentialPair(potentialRepo, potentialTypeRepo)

        this.propertyFieldCaptureSetupService = new PropertyFieldCaptureSetup(settingRepo, multimeterFactory, multimeterPropertyCaptureParameters, this.getOnOffPotentialService, permissions)

        this.propertyFieldCaptureService = new PropertyFieldCapture(settingRepo, this.multimeterFactory, timeService, unitConverter)

        this.checkBleStateService = new CheckBleState(bluetoothRepo)

        this.checkConnectedDeviceService = new CheckConnectedDevices(bluetoothRepo, permissions)

        this.validation = new MultimeterValidation()
    }

    checkConnectedDevices(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, () => {
            return this.checkConnectedDeviceService.execute()
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

    scanListener(callback, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 100, () => {
            return this.multimeterScanListenerService.execute(callback, [])
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

    unpairMultimeter(connected, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 653, async () => {
            return await this.unpairMultimeterService.execute(connected)
        })
    }

    connectMultimeter(delay, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 651, async () => {
            return await this.connectMultimeterService.execute(delay)
        })
    }


    disconnectMultimeter(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 651, async () => {
            return await this.disconnectMultimeterService.execute()
        })
    }

    checkState(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            return await this.checkBleStateService.execute()
        })
    }

    addMultimeterStatusListener(callback, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 100, () => {
            return this.multimeterStatusListenerService.execute(callback)
        })
    }

    addPropertyFieldListener(onUpdate, onError, peripheralId, type, onTime, offTime, isSingleRead, firstCycle, onSetup, offDelay, syncMode, unit, mode, range, captureRate, measurementType) {
        return this.propertyFieldCaptureService.addListener(onUpdate, onError, peripheralId, type, onTime, offTime, isSingleRead, firstCycle, onSetup, offDelay, syncMode, unit, mode, range, captureRate, measurementType)
    }

    startPropertyFieldCapture(measurementType, potentialId, subitemId, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 851, async () => {
            return this.propertyFieldCaptureSetupService.onStart(measurementType, potentialId, subitemId)
        })
    }

    stopPropertyFieldCapture(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 851, async () => {
            return this.propertyFieldCaptureSetupService.onStop()
        })
    }
}

const multimeterController = new MultimeterController(
    multimeterFactory,
    bluetoothRepo,
    settingRepo,
    potentialRepo,
    potentialTypeRepo,
    permissions,
    unitConverter,
    appStateListener,
    timeService,
    multimeterPropertyCaptureParameters,
    connectMultimeterService

)

export const checkConnectedDevices = (onError, onSuccess) => multimeterController.checkConnectedDevices(onError, onSuccess)

export const startMultimeterScan = async (onError, onSuccess) => await multimeterController.scan(onError, onSuccess)

export const stopMultimeterScan = async (onError, onSuccess) => await multimeterController.stopScan(onError, onSuccess)

export const multimeterScanListener = (callback, onError, onSuccess) => multimeterController.scanListener(callback, onError, onSuccess)

export const multimeterStopScanListener = (callback, onError, onSuccess) => multimeterController.stopScanListener(callback, onError, onSuccess)

export const getMultimeterSettings = (onError, onSuccess) => multimeterController.getSettings(onError, onSuccess)

export const updateMultimeterSettings = ({ onTime, offTime, syncMode, firstCycle, onOffCaptureActive, timeSyncMode, onSetup, offDelay, captureRate }, onError, onSuccess) => multimeterController.updateSettings({ onTime, offTime, syncMode, firstCycle, onOffCaptureActive, timeSyncMode, onSetup, offDelay, captureRate }, onError, onSuccess)

export const updateMultimeterOnOffCapture = ({ onOffCaptureActive }, onError, onSuccess) => multimeterController.updateOnOffCaptureSetting({ onOffCaptureActive }, onError, onSuccess)

export const pairMultimeter = ({ id, multimeterType, name }, onError, onSuccess) => multimeterController.pairMultimeter({ id, multimeterType, name }, onError, onSuccess)

export const unpairMultimeter = (connected, onError, onSuccess) => multimeterController.unpairMultimeter(connected, onError, onSuccess)

export const connectMultimeter = (delay, onError, onSuccess) => multimeterController.connectMultimeter(delay, onError, onSuccess)

export const disconnectMultimeter = (onError, onSuccess) => multimeterController.disconnectMultimeter(onError, onSuccess)

export const addMultimeterStatusListener = (callback, onError, onSuccess) => multimeterController.addMultimeterStatusListener(callback, onError, onSuccess)

export const checkBleState = (onError, onSuccess) => multimeterController.checkState(onError, onSuccess)

export const addPropertyFieldListener = (onUpdate, onError, peripheralId, type, onTime, offTime, isSingleRead, firstCycle, onSetup, offDelay, syncMode, unit, mode, range, captureRate, measurementType) => multimeterController.addPropertyFieldListener(onUpdate, onError, peripheralId, type, onTime, offTime, isSingleRead, firstCycle, onSetup, offDelay, syncMode, unit, mode, range, captureRate, measurementType)

export const startPropertyFieldCapture = (measurementType, potentialId, subitemId, onError, onSuccess) => multimeterController.startPropertyFieldCapture(measurementType, potentialId, subitemId, onError, onSuccess)

export const stopPropertyFieldCapture = (onError, onSuccess) => multimeterController.stopPropertyFieldCapture(onError, onSuccess)