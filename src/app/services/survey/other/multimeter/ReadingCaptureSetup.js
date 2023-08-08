import { MultimeterMeasurementTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class ReadingCaptureSetup {
    constructor(settingRepo, permissions, multimeterFactory, getOnOffPairService) {
        this.settingRepo = settingRepo
        this.multimeterFactoryService = multimeterFactory
        this.permissions = permissions
        this.getOnOffPairService = getOnOffPairService
    }

    _measurementSetupFactory(multimeterService, measurementType, peripheralId) {
        switch (measurementType) {
            case MultimeterMeasurementTypes.POTENTIALS:
                return multimeterService.startPotentialCapture(peripheralId)
            case MultimeterMeasurementTypes.VOLTAGE:
                return multimeterService.startVoltageCapture(peripheralId)
            case MultimeterMeasurementTypes.VOLTAGE_DROP:
                return multimeterService.startVoltageDropCapture(peripheralId)
            case MultimeterMeasurementTypes.COUPON_CURRENT:
                return multimeterService.startCouponCurrentCapture(peripheralId)
            case MultimeterMeasurementTypes.CURRENT:
                return multimeterService.startCurrentCapture(peripheralId)
            case MultimeterMeasurementTypes.COUPON_CURRENT_AC:
                return multimeterService.startAcCouponCurrentCapture(peripheralId)
            case MultimeterMeasurementTypes.POTENTIALS_AC:
                return multimeterService.startAcPotentialCapture(peripheralId)
            default: throw new Error(errors.GENERAL, 'No such measurement type for multimeter service')
        }
    }

    async execute({ measurementType, subitemId, potentialId }) {
        const { multimeter } = await this.settingRepo.get()
        const { peripheralId, type } = multimeter
        if (peripheralId && type) {
            const multimeterService = this.multimeterFactoryService.execute(type)
            await this.permissions.bluetooth()
            //add is device connected check here

            const { mode } = await multimeterService.readStatus(peripheralId)
            const isMeasurementTypeSupported = multimeterService.measurementTypeSupportedByMode(mode, measurementType)
            if (!isMeasurementTypeSupported)
                throw new Error(errors.GENERAL, 'Multimeter mode is not supporting this measurement', 'Measurement is not supporrted', 824)
            else {
                await this._measurementSetupFactory(multimeterService, measurementType, peripheralId)
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
}