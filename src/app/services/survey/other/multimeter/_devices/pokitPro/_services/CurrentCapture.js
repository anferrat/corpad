
import { MultimeterMeasurementTypes } from "../../../../../../../../constants/global"
import { ByteConverter } from "../_helpers/ByteConverter"
import { OverRangeChecker } from "../_helpers/OverRangeChecker"
import { ValueConverter } from "../_helpers/ValueConverter"

export class CurrentCapture {
    constructor(bluetoothRepo, services, characteristics, bytes, unitConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.services = services
        this.characteristics = characteristics
        this.bytes = bytes
        this.byteConverter = new ByteConverter()
        this.valueConverter = new ValueConverter(unitConverter)
        this.rangeChecker = new OverRangeChecker()
    }

    startCurrentCapture(peripheralId) {
        this.bluetoothRepo.write(
            peripheralId,
            this.services.MULTIMETER,
            this.characteristics.MULTIMETER.SETTINGS,
            this.byteConverter.convertDataToWrite(this.bytes.DC_CURRENT),
            this.bytes.DC_CURRENT.length)
    }

    stopCurrentCapture(peripheralId) {
        this.bluetoothRepo.write(
            peripheralId,
            this.services.MULTIMETER,
            this.characteristics.MULTIMETER.SETTINGS,
            this.byteConverter.convertDataToWrite(this.bytes.IDLE),
            this.bytes.IDLE.length)
    }

    currentListener(callback, { peripheralId }) {
        return this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, characteristic, service, value }) => {
            if (
                peripheral === peripheralId &&
                characteristic === this.characteristics.MULTIMETER.READING &&
                service === this.services.MULTIMETER) {
                const reading = this.byteConverter.convertReading(value)
                const overRange = this.rangeChecker.executeForRaw(this.bytes.DC_CURRENT)
                const convertedValue = this.valueConverter.execute(MultimeterMeasurementTypes.CURRENT, reading.value)
                callback({
                    value: convertedValue,
                    overRange: overRange || this.rangeChecker.executeForConverted(convertedValue)
                })
            }
        }).remove
    }
}