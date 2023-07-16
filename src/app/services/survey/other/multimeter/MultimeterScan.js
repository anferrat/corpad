import { MultimeterServices, MultimeterTypes } from "../../../../../constants/global"

export class MultimeterScan {
    constructor(bluetoothRepo, permissions) {
        this.bluetoothRepo = bluetoothRepo
        this.permissions = permissions
        this.ACCEPTED_SERVICES = Object.values(MultimeterServices[MultimeterTypes.POKIT]) //don't use it here, filter services at listener
    }

    async execute(seconds) {
        await this.permissions.bluetooth()
        return await this.bluetoothRepo.scan([], seconds, false)
    }
}