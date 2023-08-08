
import { MultimeterMeasurementTypes } from "../../../../../../../../constants/global"
import { ByteConverter } from "../_helpers/ByteConverter"
import { OverRangeChecker } from "../_helpers/OverRangeChecker"
import { ValueConverter } from "../_helpers/ValueConverter"

export class CouponCurrentCapture {
    constructor(bluetoothRepo, services, characteristics, bytes, unitConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.services = services
        this.characteristics = characteristics
        this.bytes = bytes
        this.byteConverter = new ByteConverter()
        this.valueConverter = new ValueConverter(unitConverter)
        this.rangeChecker = new OverRangeChecker()
    }

    startCouponCurrentCapture(peripheralId, isAC = false) {
        const setting = isAC ? this.bytes.AC_CURRENT : this.bytes.DC_CURRENT
        this.bluetoothRepo.write(
            peripheralId,
            this.services.MULTIMETER,
            this.characteristics.MULTIMETER.SETTINGS,
            this.byteConverter.convertDataToWrite(setting),
            setting.length)
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
                const overRange = this.rangeChecker.executeForRaw(this.bytes.AC_CURRENT, value)
                const convertedValue = this.valueConverter.execute(MultimeterMeasurementTypes.COUPON_CURRENT, reading.value)
                callback({
                    value: convertedValue,
                    overRange: overRange || this.rangeChecker.executeForConverted(convertedValue)
                })
            }
        }).remove
    }
}