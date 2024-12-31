export class PokitProAddToggleListener {
    constructor(bluetoothRepo, uuids, dataConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.uuids = uuids
        this.dataConverter = dataConverter
    }

    addListener(callback, id) {
        const listener = this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, service, characteristic, value }) => {
            if (id === peripheral && service === this.uuids.services.STATUS && characteristic === this.uuids.characteristics.STATUS.STATUS) {
                const { toggleStatus } = this.dataConverter.statusResponse(value)
                callback(toggleStatus)
            }
        })
        return listener.remove
    }

}
