export class MultimeterToggleStatusListener {
    constructor(multimeterFactory) {
        this.multimeterFactory = multimeterFactory
    }

    addListener(onUpdate, multimeterType, peripheralId) {
        const multimeterService = this.multimeterFactory.execute(multimeterType)
        return multimeterService.addToggleStatusListener(onUpdate, peripheralId)
    }
}