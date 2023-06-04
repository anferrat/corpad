import { MultimeterServices, MultimeterTypes } from "../../../../../constants/global"

export class MultimeterScanListener {
    constructor(bluetoothRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.MULTIMETER_SERVICES = [MultimeterServices[MultimeterTypes.POKIT].STATUS]
    }

    execute(callback, idFilter=[]) {
        return this.bluetoothRepo.discoverPeripheralListener((id, name, rssi, serviceUUIDs, isConnectable) => {
            const filtered = ~idFilter.indexOf(id)
            const isMultimeterService = serviceUUIDs && Array.isArray(serviceUUIDs) && ~serviceUUIDs.indexOf(this.MULTIMETER_SERVICES[0])
            if (isMultimeterService && isConnectable && ~filtered)
                callback(id, name, MultimeterTypes.POKIT, rssi)
        })
    }
}