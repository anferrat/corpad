export class PairMultimeter {
    constructor(updateMultimeterSettingsService) {
        this.updateMultimeterSettingsService = updateMultimeterSettingsService
    }

    async execute(multimeterData) {
        const { id, multimeterType, name } = multimeterData
        await this.updateMultimeterSettingsService.executeForPairing({ id, multimeterType, name })
        return
    }
}