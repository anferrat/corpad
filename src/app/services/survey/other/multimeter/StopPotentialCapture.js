export class StopPotentialCapture {
    constructor(multimeterFactory) {
        this.multimeterFactory = multimeterFactory
    }

    async execute(peripheralId, multimeterType) {
        const multimeterService = this.multimeterFactory.execute(multimeterType)
        await multimeterService.stopPotentialCapture(peripheralId)
    }
}