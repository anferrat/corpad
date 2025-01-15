export class UpdateMeasurementCharacteristic {
    constructor(multimeterFactory, settingRepo) {
        this.multimeterFactory = multimeterFactory
        this.settingRepo = settingRepo
    }


    async execute({ range, mode }) {
        const { multimeter: { peripheralId, type, captureRate } } = await this.settingRepo.get()
        const multimeterService = this.multimeterFactory.execute(type)
        await multimeterService.setSettings(peripheralId, mode, range, true, captureRate)
    }
}