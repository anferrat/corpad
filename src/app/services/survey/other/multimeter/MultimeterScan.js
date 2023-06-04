import { MultimeterServices, MultimeterTypes } from "../../../../../constants/global"

export class MultimeterScan {
    constructor(bluetoothRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.ACCEPTED_SERVICES = Object.values(MultimeterServices[MultimeterTypes.POKIT])
    }

    async execute(seconds) {
        return await this.bluetoothRepo.scan([], seconds, false)
    }
}