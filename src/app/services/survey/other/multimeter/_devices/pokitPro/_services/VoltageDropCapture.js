import { MultimeterMeasurementTypes } from "../../../../../../../../constants/global"
import { ByteConverter } from "../_helpers/ByteConverter"
import { ValueConverter } from "../_helpers/ValueConverter"

export class VoltageDropCapture {
    constructor(bluetoothRepo, services, characteristics, bytes, unitConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.services = services
        this.characteristics = characteristics
        this.bytes = bytes
        this.byteConverter = new ByteConverter()
        this.valueConverter = new ValueConverter(unitConverter)
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
                callback({ value: this.valueConverter.execute(MultimeterMeasurementTypes.VOLTAGE_DROP, reading.value) })
            }
        }).remove
    }
}