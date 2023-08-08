import { MultimeterMeasurementTypes, MultimeterModes } from "../../../../../../../constants/global"
import { _CyclicalCapture } from "../../_cycle_capture/_CyclicalCapture"
import { _HighLowCapture } from "../../_cycle_capture/_HighLowCapture"
import { _GPSCapture } from "../../_cycle_capture/_GPSCapture"
import { services } from "./constants/services"
import { characteristics } from "./constants/characteristics"
import { MULTIMETER_SETTING_DATA } from "./constants/bytes"
import { PotentialCapture } from "./_services/PotentialCapture"
import { CurrentCapture } from "./_services/CurrentCapture"
import { StatusCapture } from "./_services/StatusCapture"
import { VoltageCapture } from "./_services/VoltageCapture"
import { CouponCurrentCapture } from "./_services/CouponCurrentCapture"
import { VoltageDropCapture } from "./_services/VoltageDropCapture"

export class _PokitMultimeterService {
    constructor(bluetoothRepo, unitConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.cyclicalCaptureProcessor = new _CyclicalCapture()
        this.highLowCaptureProcessor = new _HighLowCapture()
        this.gpsCaptureProcessor = new _GPSCapture()
        this.services = services
        this.characteristics = characteristics
        this.bytes = MULTIMETER_SETTING_DATA
        this.potentialCaptureService = new PotentialCapture(bluetoothRepo, services, characteristics, MULTIMETER_SETTING_DATA, this.cyclicalCaptureProcessor, this.highLowCaptureProcessor, this.gpsCaptureProcessor, unitConverter)
        this.currentCaptureService = new CurrentCapture(bluetoothRepo, services, characteristics, MULTIMETER_SETTING_DATA, unitConverter)
        this.statusCaptureService = new StatusCapture(bluetoothRepo, services, characteristics, MULTIMETER_SETTING_DATA, unitConverter)
        this.voltageCaptureService = new VoltageCapture(bluetoothRepo, services, characteristics, MULTIMETER_SETTING_DATA, unitConverter)
        this.couponCurrentCaptureService = new CouponCurrentCapture(bluetoothRepo, services, characteristics, MULTIMETER_SETTING_DATA, unitConverter)
        this.voltageDropCaptureService = new VoltageDropCapture(bluetoothRepo, services, characteristics, MULTIMETER_SETTING_DATA, unitConverter)
    }

    /*

    START/STOP Multimeter

    */


    async startMultimeter(peripheralId) {
        await this.bluetoothRepo.connect(peripheralId)
        await this.bluetoothRepo.retrieveServices(peripheralId)
        await this.bluetoothRepo.startNotification(peripheralId, this.services.MULTIMETER, this.characteristics.MULTIMETER.READING)
        await this.bluetoothRepo.startNotification(peripheralId, this.services.STATUS, this.characteristics.STATUS.BUTTON_PRESS)
        await this.bluetoothRepo.startNotification(peripheralId, this.services.STATUS, this.characteristics.STATUS.STATUS)
    }

    async stopMultimeter(peripheralId) {
        await this.bluetoothRepo.stopNotification(peripheralId, this.services.MULTIMETER, this.characteristics.MULTIMETER.READING)
        await this.bluetoothRepo.stopNotification(peripheralId, this.services.STATUS, this.characteristics.STATUS.BUTTON_PRESS)
        await this.bluetoothRepo.stopNotification(peripheralId, this.services.STATUS, this.characteristics.STATUS.STATUS)
        await this.bluetoothRepo.disconnect(peripheralId)
    }

    /*

    POTENTIAL CAPTURE

    */

    startPotentialCapture(peripheralId, isAC = false) {
        return this.potentialCaptureService.startPotentialCapture(peripheralId, isAC)
    }

    stopPotentialCapture(peripheralId) {
        return this.potentialCaptureService.stopPotentialCapture(peripheralId)
    }

    realTimePotentialListener(callback, { peripheralId }) {
        return this.potentialCaptureService.realTimePotentialListener(callback, { peripheralId })
    }

    syncedPotentialListener(callback, { peripheralId, onTime, offTime, firstCycle, getTimeAdjustment }) {
        return this.potentialCaptureService.syncedPotentialListener(callback, { peripheralId, onTime, offTime, firstCycle, getTimeAdjustment })
    }

    highLowPotentialListener(callback, { peripheralId, onTime, offTime }) {
        return this.potentialCaptureService.highLowPotentialListener(callback, { peripheralId, onTime, offTime })
    }

    cyclicalPotentialListener(callback, { peripheralId, onTime, offTime }) {
        return this.potentialCaptureService.cyclicalPotentialListener(callback, { peripheralId, onTime, offTime })
    }

    /*

    CURRENT CAPTURE

    */


    startCurrentCapture(peripheralId) {
        return this.currentCaptureService.startCurrentCapture(peripheralId)
    }

    stopCurrentCapture(peripheralId) {
        return this.currentCaptureService.stopCurrentCapture(peripheralId)
    }

    currentListener(callback, { peripheralId }) {
        return this.currentCaptureService.currentListener(callback, { peripheralId })
    }

    /*

    STATUS CAPTURE

    */


    readStatus(peripheralId) {
        return this.statusCaptureService.readStatus(peripheralId)
    }


    buttonPressListener(callback, { peripheralId }) {
        return this.statusCaptureService.buttonPressListener(callback, { peripheralId })
    }

    statusListener(callback, { peripheralId }) {
        return this.statusCaptureService.statusListener(callback, { peripheralId })
    }


    /*

    VOLTAGE CAPTURE

    */

    startVoltageCapture(peripheralId) {
        return this.voltageCaptureService.startVoltageCapture(peripheralId)
    }

    stopVoltageCapture(peripheralId) {
        return this.voltageCaptureService.stopVoltageCapture(peripheralId)
    }

    voltageListener(callback, { peripheralId }) {
        return this.voltageCaptureService.voltageListener(callback, { peripheralId })
    }

    /*

  VOLTAGE DROP CAPTURE

  */

    startVoltageDropCapture(peripheralId) {
        return this.voltageDropCaptureService.startVoltageDropCapture(peripheralId)
    }

    stopVoltageDropCapture(peripheralId) {
        return this.voltageDropCaptureService.stopVoltageDropCapture(peripheralId)
    }

    voltageDropListener(callback, { peripheralId }) {
        return this.voltageDropCaptureService.voltageDropListener(callback, { peripheralId })
    }

    /*

    COUPON CURRENT CAPTURE

    */


    startCouponCurrentCapture(peripheralId) {
        return this.couponCurrentCaptureService.startCouponCurrentCapture(peripheralId)
    }

    stopCouponCurrentCapture(peripheralId) {
        return this.couponCurrentCaptureService.stopCouponCurrentCapture(peripheralId)
    }

    couponCurrentListener(callback, { peripheralId }) {
        return this.couponCurrentCaptureService.couponCurrentListener(callback, { peripheralId })
    }


    measurementTypeSupportedByMode(mode, measurementType) {
        switch (mode) {
            case MultimeterModes.VOLTS:
                return Boolean(~[MultimeterMeasurementTypes.VOLTAGE, MultimeterMeasurementTypes.VOLTAGE_DROP, MultimeterMeasurementTypes.POTENTIALS].indexOf(measurementType))
            case MultimeterModes.SMALL_CURRENT:
                return measurementType === MultimeterMeasurementTypes.COUPON_CURRENT
            case MultimeterModes.CURRENT:
                return measurementType === MultimeterMeasurementTypes.CURRENT
            default: return false
        }
    }
}