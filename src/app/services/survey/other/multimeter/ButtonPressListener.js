export class ButtonPressListener {
    constructor(multimeterFactory) {
        this.multimeterFactory = multimeterFactory
    }

    addListener(callback, { peripheralId, type }) {
        const multimeterService = this.multimeterFactory.execute(type)
        return multimeterService.buttonPressListener(callback, { peripheralId })
    }
}