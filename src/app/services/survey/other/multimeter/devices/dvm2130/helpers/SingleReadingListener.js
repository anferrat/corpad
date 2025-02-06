import { MultimeterListenerEvents } from "../../../../../../../../constants/global"

export class SingleReadingListener {
    constructor(bluetoothRepo, uuids, dataConverter,) {
        this.bluetoothRepo = bluetoothRepo
        this.uuids = uuids
        this.dataConverter = dataConverter
    }

    addListener(callback, id, mode, getCurrentRange) {
        const listener = this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, service, characteristic, value }) => {
            if (peripheral === id && service === this.uuids.services.MAIN && characteristic === this.uuids.characteristics.DMM) {
                const range = getCurrentRange()
                const val = this.dataConverter.execute(value, mode, range)
                if (val)
                    callback(MultimeterListenerEvents.SINGLE_READ, val, range)
            }
        })
        return {
            remove: listener.remove
        }
    }
}