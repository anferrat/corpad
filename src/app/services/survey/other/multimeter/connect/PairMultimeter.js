export class PairMultimeter {
    constructor(permissions, multimeterFactory, updateMultimeterSettingsService) {
        this.permissions = permissions
        this.multimeterFactory = multimeterFactory
        this.updateMultimeterSettingsService = updateMultimeterSettingsService
    }

    async execute(multimeterData) {
        const { id, multimeterType, name } = multimeterData
        await this.permissions.bluetooth()
        await Promise.all([
            this.updateMultimeterSettingsService.executeForPairing({ id, multimeterType, name }),
            this.multimeterFactory.execute(multimeterType).start(id)])
        return
    }
}