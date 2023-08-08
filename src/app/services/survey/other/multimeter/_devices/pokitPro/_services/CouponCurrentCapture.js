
import { MultimeterMeasurementTypes } from "../../../../../../../../constants/global"
import { ByteConverter } from "../_helpers/ByteConverter"
import { ValueConverter } from "../_helpers/ValueConverter"

export class CouponCurrentCapture {
    constructor(bluetoothRepo, services, characteristics, bytes, unitConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.services = services
        this.characteristics = characteristics
        this.bytes = bytes
        this.byteConverter = new ByteConverter()
        this.valueConverter = new ValueConverter(unitConverter)
    }

    startCouponCurrentCapture(peripheralId) {
        this.bluetoothRepo.write(
            peripheralId,
            this.services.MULTIMETER,
            this.characteristics.MULTIMETER.SETTINGS,
            this.byteConverter.convertDataToWrite(this.bytes.DC_CURRENT),
            this.bytes.DC_CURRENT.length)
    }

    stopCouponCurrentCapture(peripheralId) {
        this.bluetoothRepo.write(
            peripheralId,
            this.services.MULTIMETER,
            this.characteristics.MULTIMETER.SETTINGS,
            this.byteConverter.convertDataToWrite(this.bytes.IDLE),
            this.bytes.IDLE.length)
    }

    couponCurrentListener(callback, { peripheralId }) {
        return this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, characteristic, service, value }) => {
            if (
                peripheral === peripheralId &&
                characteristic === this.characteristics.MULTIMETER.READING &&
                service === this.services.MULTIMETER) {
                const reading = this.byteConverter.convertReading(value)
                console.log(reading)
                callback({ value: this.valueConverter.execute(MultimeterMeasurementTypes.COUPON_CURRENT, reading.value) })
            }
        }).remove
    }
}