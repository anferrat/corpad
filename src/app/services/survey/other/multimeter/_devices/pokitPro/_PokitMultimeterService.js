import { MultimeterCharacteristics, MultimeterCycles, MultimeterServices, MultimeterTypes } from "../../../../../../../constants/global"
import { Buffer } from "buffer"
import { _CyclicalCapture } from "../../_cycle_capture/_CyclicalCapture"
import { _HighLowCapture } from "../../_cycle_capture/_HighLowCapture"
import { _GPSCapture } from "../../_cycle_capture/_GPSCapture"

export class _PokitMultimeterService {
    constructor(bluetoothRepo) {
        this.SAMPLING_RATE = 100
        this.bluetoothRepo = bluetoothRepo
        this._cyclicalCapture = new _CyclicalCapture()
        this._highLowCapture = new _HighLowCapture()
        this._gpsCapture = new _GPSCapture()
        this.multimeterServices = MultimeterServices[MultimeterTypes.POKIT]
        this.multimeterCharacteristics = MultimeterCharacteristics[MultimeterTypes.POKIT]
        this.BYTE_DATA = {
            MULTIMETER_SERVICE: {
                SETTING_SETUP: { //6 bytes
                    IDLE: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                    DC_VOLTAGE: [0x1, 0xFF, 0xC8, 0x00, 0x00, 0x00],
                }
            }
        }
    }

    _getTimeOut(deviceTime, cycleTime, timeAdjustment) {
        const date = !timeAdjustment ? new Date(deviceTime) : new Date(deviceTime - timeAdjustment)
        const cycleStartAdjustment = date.getSeconds() * 1000 % cycleTime
        const milisecondAdjustment = 1000 - date.getMilliseconds()
        return cycleStartAdjustment + milisecondAdjustment
    }

    _convertFloat(value) {
        //Converts MM reading value to float
        const buf = Buffer.from(value)
        return Number(buf.readFloatLE(1).toFixed(3))
    }

    async _getMMReading(id) {
        const value = await this.bluetoothRepo.read(
            id,
            this.multimeterServices.MULTIMETER,
            this.multimeterCharacteristics.MULTIMETER.READING)
        return this._convertFloat(value)
    }

    _convertBytes(hexArray) {
        return Buffer.from(hexArray).toJSON().data
    }

    async startPotentialCapture(peripheralId) {
        await this.bluetoothRepo.connect(peripheralId)
        await this.bluetoothRepo.retrieveServices(peripheralId)
        await this.bluetoothRepo.write(
            peripheralId,
            this.multimeterServices.MULTIMETER,
            this.multimeterCharacteristics.MULTIMETER.SETTINGS,
            this._convertBytes(this.BYTE_DATA.MULTIMETER_SERVICE.SETTING_SETUP.DC_VOLTAGE),
            this.BYTE_DATA.MULTIMETER_SERVICE.SETTING_SETUP.DC_VOLTAGE.length)
        await this.bluetoothRepo.startNotification(peripheralId, this.multimeterServices.MULTIMETER, this.multimeterCharacteristics.MULTIMETER.READING)
    }

    async stopPotentialCapture(peripheralId) {
        await this.bluetoothRepo.stopNotification(peripheralId, this.multimeterServices.MULTIMETER, this.multimeterCharacteristics.MULTIMETER.READING)
        await this.bluetoothRepo.write(
            peripheralId,
            this.multimeterServices.MULTIMETER,
            this.multimeterCharacteristics.MULTIMETER.SETTINGS,
            this._convertBytes(this.BYTE_DATA.MULTIMETER_SERVICE.SETTING_SETUP.IDLE),
            this.BYTE_DATA.MULTIMETER_SERVICE.SETTING_SETUP.IDLE.length)
    }

    realTimePotentialListener(callback, { peripheralId }) {
        return this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, characteristic, service, value }) => {
            if (
                peripheral === peripheralId &&
                characteristic === this.multimeterCharacteristics.MULTIMETER.READING &&
                service === this.multimeterServices.MULTIMETER)
                callback(null, this._convertFloat(value))
        }).remove
    }

    syncedPotentialListener(callback, { peripheralId, onTime, offTime, firstCycle, getTimeAdjustment }) {
        let values = []
        let timestamps = []
        const removeListener = this.realTimePotentialListener((_, value) => {
            timestamps.push(Date.now())
            values.push(value)
        }, { peripheralId })

        const timer = setInterval(() => {
            const timeAdjustment = getTimeAdjustment()
            const [[cycle1, value1], [cycle2, value2]] = this._gpsCapture.execute(values, timestamps, timeAdjustment, firstCycle, onTime, offTime)
            callback(cycle1, value1)
            callback(cycle2, value2)
            values = []
            timestamps = []
        }, onTime + offTime)
        return () => {
            removeListener()
            clearInterval(timer)
        }
    }




    highLowPotentialListener(callback, { peripheralId, onTime, offTime }) {
        let values = []
        const removeListener = this.realTimePotentialListener((_, value) => values.push(value), { peripheralId })

        const timer = setInterval(() => {
            const { on, off } = this._highLowCapture.execute(values)
            callback(MultimeterCycles.ON, on)
            callback(MultimeterCycles.OFF, off)
            values = []
        }, onTime + offTime)
        return () => {
            removeListener()
            clearInterval(timer)
        }
    }

    cyclicalPotentialListener(callback, { peripheralId, onTime, offTime }) {
        let values = []
        const removeListener = this.realTimePotentialListener((_, value) => values.push(value), { peripheralId })

        const timer = setInterval(() => {
            const { on, off } = this._cyclicalCapture.execute(values, onTime, offTime)
            callback(MultimeterCycles.ON, on)
            callback(MultimeterCycles.OFF, off)
            values = []
        }, onTime + offTime)

        return () => {
            removeListener()
            clearInterval(timer)
        }
    }
}