import { CycleListener } from "../utils/CycleListener"
import { ReadingConverter } from "../utils/ReadingConverter"

export class PropertyFieldCapture {
    constructor(multimeterFactory, timeService, unitConverter) {
        this.multimeterFactory = multimeterFactory
        this.cycleListener = new CycleListener(timeService)
        this.readingConverter = new ReadingConverter(unitConverter)
    }


    _listenerFactory(multimeterService, toggleStatus, isSingleRead, onUpdate, onError, peripheralId, syncMode, onTime, offTime, firstCycle, onSetup, offDelay, mode, range, captureRate) {
        if (isSingleRead && !isNaN(onTime + offTime))
            return multimeterService.addListener(peripheralId, toggleStatus, mode, range, captureRate, isSingleRead, onTime + offTime, onUpdate, onError)
        else
            return this.cycleListener.addListener(multimeterService, toggleStatus, peripheralId, onUpdate, onError, syncMode, onTime, offTime, firstCycle, onSetup, offDelay, mode, range, captureRate)
    }

    addListener(onUpdate, onError, peripheralId, type, onTime, offTime, isSingleRead, firstCycle, onSetup, offDelay, syncMode, unit, mode, range, captureRate, measurementType, toggleStatus) {
        const multimeterService = this.multimeterFactory.execute(type)
        const onUpdateConverted = (eventType, reading) => onUpdate(eventType, this.readingConverter.execute(reading, unit, measurementType))
        return this._listenerFactory(multimeterService, toggleStatus, isSingleRead, onUpdateConverted, onError, peripheralId, syncMode, onTime, offTime, firstCycle, onSetup, offDelay, mode, range, captureRate)
    }

}