export class PotentialCaptureSetup {
    constructor(settingRepo, permissions, multimeterFactory) {
        this.settingRepo = settingRepo
        this.multimeterFactoryService = multimeterFactory
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