export class DisconnectMultimeter {
    constructor(settingRepo, permissions, multimeterFactory) {
        this.multimeterFactory = multimeterFactory
        this.settingRepo = settingRepo
        this.permissions = permissions
    }

    async execute() {
        const [{ multimeter }] = await Promise.all([
            this.settingRepo.get(),
            this.permissions.bluetooth()
        ])
        const { peripheralId, type } = multimeter
        if (peripheralId !== null && peripheralId) {
            const multimeterService = this.multimeterFactory.execute(type)
            await multimeterService.stopMultimeter(peripheralId)
        }
    }
}