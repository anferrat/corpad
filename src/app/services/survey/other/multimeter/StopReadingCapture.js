export class StopReadingCapture {
    constructor(multimeterFactory) {
        this.multimeterFactory = multimeterFactory
    }

    async execute(peripheralId, multimeterType, measurementType) {
        const multimeterService = this.multimeterFactory.execute(multimeterType)
        return multimeterService.stopCapture(peripheralId, measurementType)
    }
}