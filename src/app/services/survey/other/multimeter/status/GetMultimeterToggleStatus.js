export class GetMultimeterToggleStatus {
    constructor(multimeterFactory, permissions) {
        this.multimeterFactory = multimeterFactory
        this.permissions = permissions
    }

    async execute(peripheralId, multimeterType) {
        await this.permissions.bluetooth()
        const multimeterService = this.multimeterFactory.execute(multimeterType)
        return await multimeterService.getToggleStatus(peripheralId)
    }
}