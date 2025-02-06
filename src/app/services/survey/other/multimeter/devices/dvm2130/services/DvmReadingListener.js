import { MultimeterCaptureRate, MultimeterListenerEvents, MultimeterModes, MultimeterReadingFlags, MultimeterReadingTypes, MultimeterTypes, MultimeterVoltageRanges, PotentialUnits } from "../../../../../../../../constants/global"
import { ReadingSet } from "../../../../../../../entities/survey/multimeter/ReadingSet"
import { ReadingSetListener } from "../helpers/ReadingSetListener"
import { SingleReadingListener } from "../helpers/SingleReadingListener"

export class DvmReadingListener {
    constructor(bluetoothRepo, uuids, dataConverter, autoRangeService) {
        this.autoRangeService = autoRangeService
        this.singleReadingListener = new SingleReadingListener(bluetoothRepo, uuids, dataConverter)
        this.readingSetListener = new ReadingSetListener(bluetoothRepo, uuids, dataConverter)
    }

    addListener(callback, id, mode, getCurrentRange, rate, isSingleRead, cycleTime, onRangeUpdate, onOverLimit) {
        const onReadingCapture = (event, reading, range) => {
            this.autoRangeService.execute(reading, mode, range, onRangeUpdate, onOverLimit)
            callback(event, reading)
        }
        const listener = isSingleRead ? this.singleReadingListener.addListener(onReadingCapture, id, mode, getCurrentRange) :
            this.readingSetListener.addListener(onReadingCapture, id, getCurrentRange, cycleTime, rate, mode)
        /*
        this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, service, characteristic, value }) => {
            if (peripheral === id && service === this.uuids.services.MAIN && characteristic === this.uuids.characteristics.DMM) {
                const range = getCurrentRange()
                if (isSingleRead) {
                    const val = this.dataConverter.execute(value, mode, range)
                    if (val) {
                        console.log(val.value, range)
                        onReadingCapture(MultimeterListenerEvents.SINGLE_READ, val, range)
                    }
                }
                else {
                    const date = new Date()
                    const sec = date.getSeconds() * 1000 + date.getMilliseconds()
                    const [val1, val2] = this.dataConverter.executeForSet(value, range, mode)
                    console.log(val1.dvmTimestamp, val2.dvmTimestamp, sec - sec2, sec)
                    sec2 = sec
                    if (!startTimestamp)
                        startTimestamp = val1.dvmTimestamp
                    if (val2.dvmTimestamp - cycleTime > startTimestamp) {
                        startTimestamp = undefined
                        onReadingCapture(MultimeterListenerEvents.READING_SET, new ReadingSet(null, readings, lastTimestamp ?? Date.now(), this._getOffset(rate), MultimeterReadingTypes.VOLTAGE, PotentialUnits.VOLTS, flag, MultimeterModes.DVM2130.AC_VOLTS === mode, MultimeterTypes.DVM2130), range)
                        readings.length = 0
                        lastTimestamp = undefined
                        flag = null
                    }
                    else {
                        if (val1.value && val2.value) {
                            flag = flag || val1.flag || val2.flag
                            readings.push(val1.value)
                            readings.push(val2.value)
                            lastTimestamp = Date.now()
                        }
                    }
                }
            }
        })
*/
        return {
            remove: listener.remove
        }
    }
}