import { MultimeterMeasurementTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class StopReadingCapture {
    constructor(multimeterFactory) {
        this.multimeterFactory = multimeterFactory
    }

    async execute(peripheralId, multimeterType, measurementType) {
        const multimeterService = this.multimeterFactory.execute(multimeterType)
        switch (measurementType) {
            case MultimeterMeasurementTypes.POTENTIALS:
                return multimeterService.stopPotentialCapture(peripheralId)
            case MultimeterMeasurementTypes.VOLTAGE:
                return multimeterService.stopVoltageCapture(peripheralId)
            case MultimeterMeasurementTypes.VOLTAGE_DROP:
                return multimeterService.stopVoltageDropCapture(peripheralId)
            case MultimeterMeasurementTypes.CURRENT:
                return multimeterService.stopCurrentCapture(peripheralId)
            case MultimeterMeasurementTypes.COUPON_CURRENT:
                return multimeterService.stopCurrentCapture(peripheralId)
            case MultimeterMeasurementTypes.COUPON_CURRENT_AC:
                return multimeterService.stopAcCouponCurrentCapture(peripheralId)
            case MultimeterMeasurementTypes.POTENTIALS_AC:
                return multimeterService.stopAcPotentialCapture(peripheralId)
            default: throw new Error(errors.GENERAL, 'No such measurement type')
        }
    }
}