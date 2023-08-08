import { ByteConverter } from "../_helpers/ByteConverter"
import { MultimeterCycles, MultimeterMeasurementTypes } from "../../../../../../../../constants/global"
import { ValueConverter } from "../_helpers/ValueConverter"
import { OverRangeChecker } from "../_helpers/OverRangeChecker"

export class PotentialCapture {
    constructor(bluetoothRepo, services, characteristics, bytes, cyclicalCaptureProcessor, highLowCaptureProcessor, gpsCaptureProcessor, unitConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.services = services
        this.characteristics = characteristics
        this.bytes = bytes
        this.byteConverter = new ByteConverter()
        this.valueConverter = new ValueConverter(unitConverter)
        this.rangeChecker = new OverRangeChecker()
        this.cyclicalCapture = cyclicalCaptureProcessor
        this.highLowCapture = highLowCaptureProcessor
        this.gpsCapture = gpsCaptureProcessor
    }

    startPotentialCapture(peripheralId, isAC = false) {
        const settingBytes = isAC ? this.bytes.AC_VOLTAGE : this.bytes.DC_VOLTAGE
        this.bluetoothRepo.write(
            peripheralId,
            this.services.MULTIMETER,
            this.characteristics.MULTIMETER.SETTINGS,
            this.byteConverter.convertDataToWrite(settingBytes),
            settingBytes.length)
    }

    stopPotentialCapture(peripheralId) {
        this.bluetoothRepo.write(
            peripheralId,
            this.services.MULTIMETER,
            this.characteristics.MULTIMETER.SETTINGS,
            this.byteConverter.convertDataToWrite(this.bytes.IDLE),
            this.bytes.IDLE.length)
    }

    realTimePotentialListener(callback, { peripheralId }) {
        return this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, characteristic, service, value }) => {
            if (
                peripheral === peripheralId &&
                characteristic === this.characteristics.MULTIMETER.READING &&
                service === this.services.MULTIMETER) {
                const reading = this.byteConverter.convertReading(value)
                const convertedValue = this.valueConverter.execute(MultimeterMeasurementTypes.POTENTIALS, reading.value)
                const overRange = this.rangeChecker.executeForRaw(this.bytes.DC_VOLTAGE, value)
                callback({
                    overRange: overRange || this.rangeChecker.executeForConverted(convertedValue),
                    cycle: null,
                    value: convertedValue
                })
            }
        }).remove
    }

    syncedPotentialListener(callback, { peripheralId, onTime, offTime, firstCycle, getTimeAdjustment }) {
        let values = []
        let timestamps = []
        const removeListener = this.realTimePotentialListener(({ value, overRange }) => {
            timestamps.push(Date.now())
            values.push(value)
            callback({ cycle: null, value, overRange })
        }, { peripheralId })

        const timer = setInterval(() => {
            const timeAdjustment = getTimeAdjustment()
            const [[cycle1, value1], [cycle2, value2]] = this.gpsCapture.execute(values, timestamps, timeAdjustment, firstCycle, onTime, offTime)
            callback({ cycle: cycle1, value: value1 })
            callback({ cycle: cycle2, value: value2 })
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
        const removeListener = this.realTimePotentialListener(({ value, overRange }) => {
            values.push(value)
            callback({ cycle: null, value: value, overRange })
        }, { peripheralId })

        const timer = setInterval(() => {
            const { on, off } = this.highLowCapture.execute(values)
            callback({ cycle: MultimeterCycles.ON, value: on })
            callback({ cycle: MultimeterCycles.OFF, value: off })
            values = []
        }, onTime + offTime)
        return () => {
            removeListener()
            clearInterval(timer)
        }
    }

    cyclicalPotentialListener(callback, { peripheralId, onTime, offTime }) {
        let values = []
        const removeListener = this.realTimePotentialListener(({ value, overRange }) => {
            values.push(value)
            callback({ cycle: null, value, overRange })
        }, { peripheralId })

        const timer = setInterval(() => {
            const { on, off } = this.cyclicalCapture.execute(values, onTime, offTime)
            callback({ cycle: MultimeterCycles.ON, value: on })
            callback({ cycle: MultimeterCycles.OFF, value: off })
            values = []
        }, onTime + offTime)

        return () => {
            removeListener()
            clearInterval(timer)
        }
    }

}