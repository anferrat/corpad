export class DvmStartService {
    constructor(bluetoothRepo, serviceUUIDs, characteristicUUIDs) {
        this.bluetoothRepo = bluetoothRepo
        this.serviceUUIDs = serviceUUIDs
        this.characteristicUUIDs = characteristicUUIDs
    }

    async execute(peripheralId) {
        await this.bluetoothRepo.connect(peripheralId)
        await this.bluetoothRepo.retrieveServices(peripheralId)
        await this.bluetoothRepo.startNotification(peripheralId, this.serviceUUIDs.SERVICE, this.characteristicUUIDs.MEASUREMENT)
        await this.bluetoothRepo.startNotification(peripheralId, this.serviceUUIDs.SERVICE, this.characteristicUUIDs.NOTIFY)
        
    }
}