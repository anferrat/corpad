import { _MultimeterFactory } from "./_devices/_MultimeterFactory"

export class PotentialCaptureSetup {
    constructor(settingRepo, bluetoothRepo, permissions) {
        this.settingRepo = settingRepo
        this.multimeterFactoryService = new _MultimeterFactory(bluetoothRepo)
        this.permissions = permissions
    }

    async execute() {
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId, type } = multimeter
        await this.permissions.bluetooth()
        await this.multimeterFactoryService.execute(type).startPotentialCapture(peripheralId)
        return multimeter
    }
}