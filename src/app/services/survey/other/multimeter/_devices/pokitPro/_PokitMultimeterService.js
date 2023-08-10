import { MultimeterMeasurementTypes } from "../../../../../../../constants/global"
import { _CyclicCapture } from "../../_cycle_capture/_CyclicCapture"
import { _HighLowCapture } from "../../_cycle_capture/_HighLowCapture"
import { _TimeSyncedCapture } from "../../_cycle_capture/_TimeSyncedCapture"
import { PokitProServices } from "./constants/pokit_pro_services"
import { PokitProCharacteristics } from "./constants/pokit_pro_characteristics"
import { PokitProCurrentRanges, PokitProMaxRangeValues, PokitProMeasurementModes, PokitProMeasurementSettings, PokitProVoltageRanges } from "./constants/pokit_pro_constants"
import { PokitProCapture } from "./_services/PokitProCapture"
import { ByteConverter } from "./_helpers/ByteConverter"
import { PokitProListeners } from "./_services/PokitProListeners"
import { MaxRangeDetector } from "./_helpers/MaxRangeDetector"
import { Error, errors } from "../../../../../../utils/Error"
import { PokitProReadingListenerFactory } from "./_services/PokitProReadingListenerFactory"

export class _PokitMultimeterService {
    constructor(bluetoothRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.serviceUUIDs = new PokitProServices()
        this.characteristicUUIDs = new PokitProCharacteristics()
        this.measurementSettings = new PokitProMeasurementSettings()
        this.currentRanges = new PokitProCurrentRanges()
        this.voltageRanges = new PokitProVoltageRanges()
        this.cyclicCaptureService = new _CyclicCapture()
        this.highLowCaptureService = new _HighLowCapture()
        this.timeSyncedCaptureService = new _TimeSyncedCapture()
        this.byteConverter = new ByteConverter(this.measurementSettings)
        this.captureService = new PokitProCapture(bluetoothRepo, this.serviceUUIDs, this.characteristicUUIDs, this.measurementSettings, this.byteConverter)
        this.listenerService = new PokitProListeners(bluetoothRepo, this.serviceUUIDs, this.characteristicUUIDs, this.measurementSettings, this.byteConverter, this.timeSyncedCaptureService, this.highLowCaptureService, this.cyclicCaptureService)
        this.maxRangeValues = new PokitProMaxRangeValues()
        this.maxRangeDetectorService = new MaxRangeDetector(this.maxRangeValues)
        this.multimeterMeasurementModes = new PokitProMeasurementModes()

        this.readingListenerFactory = new PokitProReadingListenerFactory(this.listenerService, this.maxRangeDetectorService)
    }

    /*

    START/STOP Multimeter

    */


    async startMultimeter(peripheralId) {
        await this.bluetoothRepo.connect(peripheralId)
        await this.bluetoothRepo.retrieveServices(peripheralId)
        await this.bluetoothRepo.startNotification(peripheralId, this.serviceUUIDs.MULTIMETER, this.characteristicUUIDs.MULTIMETER.READING)
        await this.bluetoothRepo.startNotification(peripheralId, this.serviceUUIDs.STATUS, this.characteristicUUIDs.STATUS.BUTTON_PRESS)
        await this.bluetoothRepo.startNotification(peripheralId, this.serviceUUIDs.STATUS, this.characteristicUUIDs.STATUS.STATUS)
    }

    async stopMultimeter(peripheralId) {
        await this.bluetoothRepo.stopNotification(peripheralId, this.serviceUUIDs.MULTIMETER, this.characteristicUUIDs.MULTIMETER.READING)
        await this.bluetoothRepo.stopNotification(peripheralId, this.serviceUUIDs.STATUS, this.characteristicUUIDs.STATUS.BUTTON_PRESS)
        await this.bluetoothRepo.stopNotification(peripheralId, this.serviceUUIDs.STATUS, this.characteristicUUIDs.STATUS.STATUS)
        await this.bluetoothRepo.disconnect(peripheralId)
    }


    async startCapture(peripheralId, measurementType) {
        const { mode } = await this._getStatus(peripheralId)
        const supported = this._measurementTypeSupportedByMode(mode, measurementType)
        if (!supported)
            throw new Error(errors.GENERAL, 'Unable to start reading capture', 'Measurement is not supported by selected mode. Need to adjust the toggle', 824)
        switch (measurementType) {
            case MultimeterMeasurementTypes.COUPON_CURRENT:
                return this.captureService.start(peripheralId, this.measurementSettings.DC_CURRENT, this.currentRanges.auto, 200)
            case MultimeterMeasurementTypes.COUPON_CURRENT_AC:
                return this.captureService.start(peripheralId, this.measurementSettings.AC_CURRENT, this.currentRanges.auto, 200)
            case MultimeterMeasurementTypes.CURRENT:
                return this.captureService.start(peripheralId, this.measurementSettings.DC_CURRENT, this.currentRanges.auto, 200)
            case MultimeterMeasurementTypes.POTENTIALS:
            case MultimeterMeasurementTypes.VOLTAGE:
            case MultimeterMeasurementTypes.VOLTAGE_DROP:
                return this.captureService.start(peripheralId, this.measurementSettings.DC_VOLTAGE, this.voltageRanges.auto, 100)
            case MultimeterMeasurementTypes.POTENTIALS_AC:
                return this.captureService.start(peripheralId, this.measurementSettings.AC_VOLTAGE, this.voltageRanges.auto, 100)
            default: throw new Error(errors.GENERAL, 'Unable to start cature service', 'No such measurement type')
        }
    }

    stopCapture(peripheralId) {
        return this.captureService.stop(peripheralId)
    }

    addReadingListener(onCapture, onError, { peripheralId, measurementType, syncMode, onTime, offTime, firstCycle, getTimeAdjustment }) {
        //add listener for supported measurement type here
        const readingListener = this.readingListenerFactory.execute((data) => {
            if (data.isOverRange)
                onError(new Error(errors.GENERAL, 'Unable to continue measurement', 'Reading is out of range for selected measurement type and multimeter', 825))
            else
                onCapture(data)
        }, peripheralId, measurementType, syncMode, onTime, offTime, firstCycle, getTimeAdjustment)

        //add listener for mode swicthing (status service). if mode is not supported stop listening
        const statusListener = this.listenerService.addStatusListener(({ mode }) => {
            const supported = this._measurementTypeSupportedByMode(mode, measurementType)
            if (!supported)
                onError(new Error(errors.GENERAL, 'Unable to continue reading listening', 'Measurement is not supported by selected mode. Need to adjust the toggle', 824))
        }, peripheralId)

        return () => {
            readingListener()
            statusListener()
        }
    }

    addButtonPressListener(onButtonPress, { peripheralId }) {
        return this.listenerService.addButtonPressListener(onButtonPress, peripheralId)
    }

    getSupportedMeasurementTypes() {
        return [
            MultimeterMeasurementTypes.COUPON_CURRENT,
            MultimeterMeasurementTypes.COUPON_CURRENT_AC,
            MultimeterMeasurementTypes.CURRENT,
            MultimeterMeasurementTypes.POTENTIALS,
            MultimeterMeasurementTypes.POTENTIALS_AC,
            MultimeterMeasurementTypes.VOLTAGE,
            MultimeterMeasurementTypes.VOLTAGE_DROP
        ]
    }

    async _getStatus(peripheralId) {
        const value = await this.bluetoothRepo.read(peripheralId, this.serviceUUIDs.STATUS, this.characteristicUUIDs.STATUS.STATUS)
        return this.byteConverter.convertStatus(value)
    }

    _measurementTypeSupportedByMode(mode, measurementType) {
        switch (mode) {
            case this.multimeterMeasurementModes.VOLTAGE:
                return Boolean(~[MultimeterMeasurementTypes.VOLTAGE, MultimeterMeasurementTypes.VOLTAGE_DROP, MultimeterMeasurementTypes.POTENTIALS, MultimeterMeasurementTypes.POTENTIALS_AC].indexOf(measurementType))
            case this.multimeterMeasurementModes.SMALL_CURRENT:
                return measurementType === MultimeterMeasurementTypes.COUPON_CURRENT || measurementType === MultimeterMeasurementTypes.COUPON_CURRENT_AC
            case this.multimeterMeasurementModes.LARGE_CURRENT:
                return measurementType === MultimeterMeasurementTypes.CURRENT
            default: return false
        }
    }
}