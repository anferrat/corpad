import { MultimeterMeasurementTypes, MultimeterSyncModes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class ReadingCaptureListener {
    constructor(geolocationRepo, multimeterFactory) {
        this.geolocationRepo = geolocationRepo
        this.multimeterFactory = multimeterFactory
    }

    _addPotentialListener({ multimeterService, callback, peripheralId, syncMode, onTime, offTime, firstCycle, getTimeAdjustment }) {
        switch (syncMode) {
            case MultimeterSyncModes.GPS:
                return multimeterService.syncedPotentialListener(callback, { peripheralId, onTime, offTime, firstCycle, getTimeAdjustment })
            case MultimeterSyncModes.HIGH_LOW:
                return multimeterService.highLowPotentialListener(callback, { peripheralId, onTime, offTime })
            case MultimeterSyncModes.REAL_TIME:
                return multimeterService.realTimePotentialListener(callback, { peripheralId })
            case MultimeterSyncModes.CYCLED:
                return multimeterService.cyclicalPotentialListener(callback, { peripheralId, onTime, offTime })
            default:
                throw new Error(errors.GENERAL, 'Unable to start service with selected syncronization mode', 'No such sync mode')
        }
    }

    _addReadingListener({ multimeterService, callback, measurementType, peripheralId, syncMode, onTime, offTime, firstCycle, getTimeAdjustment }) {
        switch (measurementType) {
            case MultimeterMeasurementTypes.POTENTIALS:
                return this._addPotentialListener({ multimeterService, callback, peripheralId, syncMode, onTime, offTime, firstCycle, getTimeAdjustment })
            case MultimeterMeasurementTypes.CURRENT:
                return multimeterService.currentListener(callback, { peripheralId })
            case MultimeterMeasurementTypes.COUPON_CURRENT:
                return multimeterService.couponCurrentListener(callback, { peripheralId })
            case MultimeterMeasurementTypes.VOLTAGE:
                return multimeterService.voltageListener(callback, { peripheralId })
            case MultimeterMeasurementTypes.VOLTAGE_DROP:
                return multimeterService.voltageDropListener(callback, { peripheralId })
            default:
                throw new Error(errors.GENERAL, 'Measurement type is not supported', 'No such measurement type')
        }
    }

    addListener(onValueChange, onModeChange, onButtonPress, { peripheralId, type, onTime, offTime, syncMode, firstCycle, measurementType }) {
        const multimeterService = this.multimeterFactory.execute(type)

        const getTimeAdjustment = () => {
            const { gnss, device } = this.geolocationRepo.getTimeFix()
            return gnss && device ? gnss - device : 0
        }

        const readingListener = this._addReadingListener({ multimeterService, callback: onValueChange, measurementType, peripheralId, syncMode, onTime, offTime, firstCycle, getTimeAdjustment })

        const modeListener = multimeterService.statusListener(({ mode }) => {
            onModeChange(multimeterService.measurementTypeSupportedByMode(mode, measurementType))
        }, { peripheralId })

        const buttonPressListener = multimeterService.buttonPressListener(() => onButtonPress(true), { peripheralId })

        return () => {
            readingListener()
            modeListener()
            buttonPressListener()
        }
    }

}