import { ByteConverter } from "../_helpers/ByteConverter"
import { ValueConverter } from "../_helpers/ValueConverter"

export class StatusCapture {
    constructor(bluetoothRepo, services, characteristics, bytes, unitConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.services = services
        this.characteristics = characteristics
        this.bytes = bytes
        this.byteConverter = new ByteConverter()
        this.valueConverter = new ValueConverter(unitConverter)
    }

    async readStatus(peripheralId) {
        const value = await this.bluetoothRepo.read(peripheralId, this.services.STATUS, this.characteristics.STATUS.STATUS)
        return this.byteConverter.convertStatus(value)
    }

    buttonPressListener(callback, { peripheralId }) {
        return this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, characteristic, service, value }) => {
            if (
                peripheral === peripheralId &&
                characteristic === this.characteristics.STATUS.BUTTON_PRESS &&
                service === this.services.STATUS) {
                //need to remove long press detection by converting byte data
                //console.log(value)
                callback(true)
            }
        }).remove
    }

    statusListener(callback, { peripheralId }) {
        return this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, characteristic, service, value }) => {
            if (
                peripheral === peripheralId &&
                characteristic === this.characteristics.STATUS.STATUS &&
                service === this.services.STATUS) {
                callback(this.byteConverter.convertStatus(value))
            }
        }).remove
    }

}