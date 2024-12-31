export class PokitProAddDSOMetadataListener {
    constructor(bluetoothRepo, uuids, dataConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.uuids = uuids
        this.dataConverter = dataConverter
        this.listener
    }

    addListener(id, callback) {
        const charListener = this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, service, characteristic, value }) => {
            if (id === peripheral && service === this.uuids.services.DSO && characteristic === this.uuids.characteristics.DSO.METADATA) {
                const meta = this.dataConverter.DSOMetadataResponse(value)
                callback(meta)
            }
        })
        return charListener.remove
    }
}