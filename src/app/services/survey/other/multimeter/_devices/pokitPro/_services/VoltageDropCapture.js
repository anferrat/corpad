import { MultimeterMeasurementTypes } from "../../../../../../../../constants/global"
import { ByteConverter } from "../_helpers/ByteConverter"
import { OverRangeChecker } from "../_helpers/OverRangeChecker"
import { ValueConverter } from "../_helpers/ValueConverter"

export class VoltageDropCapture {
    constructor(bluetoothRepo, services, characteristics, bytes, unitConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.services = services
        this.characteristics = characteristics
        this.bytes = bytes
        this.byteConverter = new ByteConverter()
        this.valueConverter = new ValueConverter(unitConverter)
        this.rangeChecker = new OverRangeChecker()
    }

    startVoltageDropCapture(peripheralId, isAC = false) {
        const settingBytes = isAC ? this.bytes.AC_VOLTAGE : this.bytes.DC_VOLTAGE
        this.bluetoothRepo.write(
            peripheralId,
            this.services.MULTIMETER,
            this.characteristics.MULTIMETER.SETTINGS,
            this.byteConverter.convertDataToWrite(settingBytes),
            settingBytes.length)
    }

    stopVoltageDropCapture(peripheralId) {
        this.bluetoothRepo.write(
            peripheralId,
            this.services.MULTIMETER,
            this.characteristics.MULTIMETER.SETTINGS,
            this.byteConverter.convertDataToWrite(this.bytes.IDLE),
            this.bytes.IDLE.length)
    }

    voltageDropListener(callback, { peripheralId }) {
        return this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, characteristic, service, value }) => {
            if (
                peripheral === peripheralId &&
                characteristic === this.characteristics.MULTIMETER.READING &&
                service === this.services.MULTIMETER) {
                const reading = this.byteConverter.convertReading(value)
                const convertedValue = this.valueConverter.execute(MultimeterMeasurementTypes.VOLTAGE_DROP, reading.value)
                const overRange = this.rangeChecker(this.bytes.DC_VOLTS, value)
                callback({
                    value: convertedValue,
                    overRange: overRange || this.rangeChecker.executeForConverted(convertedValue)
                })
            }
        }).remove
    }
}