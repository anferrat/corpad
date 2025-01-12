export class UnpairMultimeter {
    constructor(permissions, multimeterFactory, updateMultimeterSettingsService) {
        this.permissions = permissions
        this.multimeterFactory = multimeterFactory
        this.updateMultimeterSettingsService = updateMultimeterSettingsService
    }

    async execute(isConnected) {
        const { peripheralId, type } = await this.updateMultimeterSettingsService.executeForUnpairing()
        if (peripheralId && isConnected) {
            await this.permissions.bluetooth()
            await this.multimeterFactory.execute(type).stop(peripheralId)
        }

    }
}