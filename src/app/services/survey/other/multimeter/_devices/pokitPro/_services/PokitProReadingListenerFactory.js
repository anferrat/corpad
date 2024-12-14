import { MultimeterMeasurementTypes, MultimeterSyncModes } from "../../../../../../../../constants/global"
import { Error, errors } from "../../../../../../../utils/Error"

export class PokitProReadingListenerFactory {
    constructor(listenerService, maxRangeDetectorService) {
        this.listenerService = listenerService
        this.maxRangeDetectorService = maxRangeDetectorService
    }

    _readingCallback(onCapture, measurementType) {
        return (data) => onCapture({
            ...data,
            isOverRange: this.maxRangeDetectorService.execute(measurementType, data.value)
        })
    }

    execute(onCapture, peripheralId, measurementType, syncMode, onTime, offTime, firstCycle, getTimeDelta) {
        switch (measurementType) {
            case MultimeterMeasurementTypes.COUPON_CURRENT:
            case MultimeterMeasurementTypes.COUPON_CURRENT_AC:
            case MultimeterMeasurementTypes.CURRENT:
            case MultimeterMeasurementTypes.POTENTIALS_AC:
            case MultimeterMeasurementTypes.VOLTAGE:
            case MultimeterMeasurementTypes.VOLTAGE_DROP:
                return this.listenerService.addReadingListener(this._readingCallback(onCapture, measurementType), peripheralId)
            case MultimeterMeasurementTypes.POTENTIALS:
                switch (syncMode) {
                    case MultimeterSyncModes.REAL_TIME:
                        return this.listenerService.addReadingListener(this._readingCallback(onCapture, measurementType), peripheralId)
                    case MultimeterSyncModes.CYCLED:
                        return this.listenerService.addCyclicReadingListener(this._readingCallback(onCapture, measurementType), peripheralId, onTime, offTime)
                    case MultimeterSyncModes.GPS:
                        return this.listenerService.addTimeSyncedReadingListener(this._readingCallback(onCapture, measurementType), peripheralId, onTime, offTime, firstCycle, getTimeDelta)
                    case MultimeterSyncModes.HIGH_LOW:
                        return this.listenerService.addHighLowReadingListener(this._readingCallback(onCapture, measurementType), peripheralId, onTime, offTime)
                    default: throw new Error(errors.GENERAL, 'Unable to start reading listener', 'Sync mode is not supported by this multimeter')
                }
            default: throw new Error(errors.GENERAL, 'Unable to start reading listener', 'Measurement type is not supported by this multimeter')
        }
    }
}
