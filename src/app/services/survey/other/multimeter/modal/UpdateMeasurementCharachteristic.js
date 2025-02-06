export class UpdateMeasurementCharacteristic {
    constructor(multimeterFactory, settingRepo, permissions) {
        this.multimeterFactory = multimeterFactory
        this.settingRepo = settingRepo
        this.permissions = permissions
    }


    async execute({ range, mode }) {
        const [{ multimeter: { peripheralId, type, captureRate } }] = await Promise.all(
            [
                this.settingRepo.get(),
                this.permissions.bluetooth()
            ])
        const multimeterService = this.multimeterFactory.execute(type)
        await multimeterService.setSettings(peripheralId, mode, range, true, captureRate)
    }
}