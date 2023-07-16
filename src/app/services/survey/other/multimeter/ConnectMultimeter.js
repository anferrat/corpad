import { _MultimeterFactory } from "./_devices/MultimeterFactory"

export class ConnectMultimeter {
    constructor(settingRepo, permissions, multimeterFactory) {
        this.settingRepo = settingRepo
        this.permissions = permissions
        this.multimeterFactory = multimeterFactory
    }

    async execute() {
        const [{ multimeter }] = await Promise.all([
            this.settingRepo.get(),
            this.permissions.bluetooth()
        ])
        const { peripheralId, type } = multimeter
        if (peripheralId !== null && peripheralId) {
            const multimeterService = this.multimeterFactory.execute(type)
            await multimeterService.startMultimeter(peripheralId)
            return {
                isConnected: true
            }
        }
        return {
            isConnected: false
        }
    }
}