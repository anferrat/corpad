export class UnpairMultimeter {
    constructor(permissions, multimeterFactory, updateMultimeterSettingsService) {
        this.permissions = permissions
        this.multimeterFactory = multimeterFactory
        this.updateMultimeterSettingsService = updateMultimeterSettingsService
    }

    async execute() {
        await this.updateMultimeterSettingsService.executeForUnpairing()
        if (peripheralId) {
            try {
                await this.permissions.bluetooth()
                this.multimeterFactory.execute(type).stopMultimeter(peripheralId)
            }
            catch { }
        }

    }
}