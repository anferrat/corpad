import { MultimeterTypes } from "../../../../../../constants/global"
import { Error, errors } from "../../../../../utils/Error"
import { MultimeterScanServiceUuids } from "../utils/MultimeterScanServiceUuids"

export class CheckConnectedDevices {
    constructor(bluetoothRepo, permissions) {
        this.bluetoothRepo = bluetoothRepo
        this.permissions = permissions
        this.list = new MultimeterScanServiceUuids().list
    }

    async execute() {
        await this.permissions.bluetooth()
        const [info] = await this.bluetoothRepo.getConnectedDevices(this.list)
        if (info)
            return [{
                peripheralId: info.id,
                name: info.name,
                type: MultimeterTypes.POKIT
            }]
        else return []
    }
}