import { MultimeterButtonEvents } from "../../../../../../../../constants/global"

export class PokitProAddButtonPressListener {
    constructor(bluetoothRepo, uuids, dataConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.uuids = uuids
        this.dataConverter = dataConverter
    }

    addListener(callback, id) {
        return this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, characteristic, service, value }) => {
            if (id === peripheral && service === this.uuids.services.STATUS && characteristic === this.uuids.characteristics.STATUS.BUTTON_PRESS) {
                const { event } = this.dataConverter.buttonStatusResponse(value)
                callback(event ?? MultimeterButtonEvents.UNKNOWN)
            }
        }).remove
    }
}