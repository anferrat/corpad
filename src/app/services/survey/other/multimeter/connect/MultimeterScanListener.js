import { MultimeterTypes } from "../../../../../../constants/global"

export class MultimeterScanListener {
    constructor(bluetoothRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.MULTIMETER_SERVICES = ['57d3a771-267c-4394-8872-78223e92aec5', '22f2']
    }

    execute(callback, idFilter = []) {
        //no need for BLE permissions here
        return this.bluetoothRepo.discoverPeripheralListener((id, name, rssi, serviceUUIDs, isConnectable) => {
            const filtered = ~idFilter.indexOf(id)
            const isPokitService = serviceUUIDs && Array.isArray(serviceUUIDs) && ~serviceUUIDs.indexOf(this.MULTIMETER_SERVICES[0])
            const isDvm2130Service = serviceUUIDs && Array.isArray(serviceUUIDs) && ~serviceUUIDs.indexOf(this.MULTIMETER_SERVICES[1])
            if (isConnectable && ~filtered && (isPokitService || isDvm2130Service))
                callback(id, name, isPokitService ? MultimeterTypes.POKIT : MultimeterTypes.DVM2130, rssi)
        })
    }
}