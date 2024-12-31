export class PokitProGetDeviceStatus {
    constructor(bluetoothRepo, constants, uuids, dataConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.constants = constants
        this.uuids = uuids
        this.dataConverter = dataConverter
    }

    async execute(peripheralId) {
        const bytes = await this.bluetoothRepo.read(peripheralId, this.uuids.services.STATUS, this.uuids.characteristics.STATUS.STATUS)
        return this.dataConverter.statusResponse(bytes)
    }
}