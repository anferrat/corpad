export class GetMultimeterToggleStatus {
    constructor(multimeterFactory) {
        this.multimeterFactory = multimeterFactory
    }

    async execute(peripheralId, multimeterType) {
        const multimeterService = this.multimeterFactory.execute(multimeterType)
        return await multimeterService.getToggleStatus(peripheralId)
    }
}