import { MultimeterCaptureRate, MultimeterListenerEvents, MultimeterModes, MultimeterReadingTypes, MultimeterTypes, PotentialUnits } from "../../../../../../../../constants/global"
import { ReadingSet } from "../../../../../../../entities/survey/multimeter/ReadingSet"

export class ReadingSetListener {
    constructor(bluetoothRepo, uuids, dataConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.uuids = uuids
        this.dataConverter = dataConverter
        this.ERROR = 4 //number of readings that DVM is ahead of. Empiracl value, get from running on/off tests
    }

    _getOffset(rate) {
        switch (rate) {
            case MultimeterCaptureRate._50Hz:
                return 20
            case MultimeterCaptureRate._60Hz:
                return 16.667
            default:
                return 0
        }
    }

    _isLowDelta(delta) {
        return Math.abs(delta) < 8
    }

    _isHighDelta(delta) {
        return Math.abs(delta) > 80
    }

    _generateSet(readings, delta, mode, rate, range) {
        let readingArray = []
        let timestamp
        let flag = null
        readings.forEach((r, i) => {
            const [r1, r2] = this.dataConverter.executeForSet(r.value, range)
            readingArray.push(r1.value)
            readingArray.push(r2.value)
            flag = flag || r1.flag || r2.flag
            if (i === readings.length - 1)
                timestamp = r2.dvmTimestamp + delta
        })
        return new ReadingSet(null, readingArray, timestamp, this._getOffset(rate), MultimeterReadingTypes.VOLTAGE, PotentialUnits.VOLTS, flag, mode === MultimeterModes.DVM2130.AC_VOLTS, MultimeterTypes.DVM2130)
    }

    _generateDeltaArray = (readings) => {
        return readings.map(({ timestamp }, i) => {
            if (i === 0)
                return Infinity
            else return timestamp - readings[i - 1].timestamp
        })
    }

    _getAverageDelta(readings, indexes, rate) {
        const sum = indexes.reduce((s, i) => {
            const delta = readings[i].timestamp - this.dataConverter.getDvmTimestamp(readings[i].value) - this.ERROR * this._getOffset(rate)
            return s + delta
        }, 0)
        return Math.floor(sum / indexes.length)
    }

    async _extractValues(callback, id, getCurrentRange, numberOfReadings, mode, rate, getIsListenerActive, removeListener) {

        while (getIsListenerActive()) {
            const range = getCurrentRange()
            try {
                const readings = await this._runListener(id, numberOfReadings, getIsListenerActive)
                const deltas = this._generateDeltaArray(readings)
                const reliableIndexes = [] //indexes where delay was low for the last aqquired dataset and was hign for the next dataset. We assume that time between measurement aqqusition for these readinsg equals device timestamp when these values were recieved 
                const INDEX_LIMIT = 5 //there is no point to get them all, even one could be enough 
                for (let i = 0; i < deltas.length; i++) {
                    if (i === 0 || i === deltas.length - 1)
                        continue
                    if (this._isLowDelta(deltas[i]) && this._isHighDelta(deltas[i + 1]))
                        reliableIndexes.push(i)
                    if (reliableIndexes.length >= INDEX_LIMIT)
                        break
                }
                const delta = this._getAverageDelta(readings, reliableIndexes, rate)
                const readingSet = this._generateSet(readings, delta, mode, rate, range)
                callback(MultimeterListenerEvents.READING_SET, readingSet, range)
            }
            catch (er) {
                removeListener()
            }
        }
    }

    _runListener(id, numberOfReadings, getIsListenerActive) {
        let readings = []
        let isCapturing = true
        const halfNumberOfReadings = Math.ceil(numberOfReadings / 2)
        let safetyCounter = 0
        return new Promise((resolve, reject) => {
            if (!numberOfReadings || !id)
                reject('Invalid input parameters')
            let listener = this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, service, characteristic, value }) => {
                const isListenerActive = getIsListenerActive()
                if (!isListenerActive) {
                    listener?.remove ? listener.remove() : null
                    reject('listener was deactiveated')
                }

                if (safetyCounter >= 4000) {
                    listener?.remove ? listener.remove() : null
                    reject('Too many readings in a set')
                }
                if (peripheral === id && service === this.uuids.services.MAIN && characteristic === this.uuids.characteristics.DMM) {
                    safetyCounter++
                    isCapturing = readings.length < halfNumberOfReadings //each value contains two measurements
                    if (isCapturing) {
                        const timestamp = Date.now()
                        readings.push({
                            timestamp, value
                        })
                    }
                    else {
                        listener?.remove ? listener.remove() : null
                        resolve(readings)
                    }
                }
            })
        })

    }



    addListener(callback, id, getCurrentRange, cycleTime, rate, mode) {
        const numberOfReadings = Math.ceil(cycleTime / this._getOffset(rate))
        let isListenerActive = true
        let remove = () => isListenerActive = false
        let getIsListenerActive = () => isListenerActive
        try {
            this._extractValues(callback, id, getCurrentRange, numberOfReadings, mode, rate, getIsListenerActive, remove)
        }
        catch (er) {
        }
        return { remove }
    }
}