import { MultimeterMeasurementTypes } from "../../../../../constants/global"

export class ReadingCaptureSetup {
    constructor(settingRepo, permissions, multimeterFactory, getOnOffPairService) {
        this.settingRepo = settingRepo
        this.multimeterFactoryService = multimeterFactory
        this.permissions = permissions
        this.getOnOffPairService = getOnOffPairService
    }

    async execute({ measurementType, subitemId, potentialId }) {
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId, type } = multimeter
        if (peripheralId && type) {
            const multimeterService = this.multimeterFactoryService.execute(type)
            await this.permissions.bluetooth()
            //add is device connected check here
            await multimeterService.startCapture(peripheralId, measurementType)
            if (measurementType === MultimeterMeasurementTypes.POTENTIALS)
                return {
                    potentialFields: await this.getOnOffPairService.execute({ subitemId, potentialId })
                }
            else return {
                potentialFields: null
            }
        }
    }
}