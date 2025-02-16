import { MultimeterCaptureRate, MultimeterListenerEvents } from "../../../../../../../../constants/global"
import { Reading } from "../../../../../../../entities/survey/multimeter/Reading"
import { ReadingSet } from "../../../../../../../entities/survey/multimeter/ReadingSet"

export class PokitProAddReadingListener {
    constructor(bluetoothRepo, uuids, dataConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.uuids = uuids
        this.dataConverter = dataConverter
    }

    _getEdgeNumber(readings, rate, cycleTime) {
        const numberOfReadings = (cycleTime / 1000) * (rate === MultimeterCaptureRate._50Hz ? 50 : 60)
        return Math.round((readings.length - numberOfReadings) / 2)
    }

    _averageReadings(readings, samplingRate, rate) {
        const freq = rate === MultimeterCaptureRate._50Hz ? 50 : 60
        const windowSize = Math.round(samplingRate / freq)
        const filtered = []
        for (let i = 0; i < readings.length; i += windowSize) {
            const window = readings.slice(i, i + windowSize)
            const sum = window.reduce((acc, val) => acc + val, 0)
            const average = sum / window.length
            filtered.push(average)
        }
        return filtered
    }

    _lowPassFilter(readings, samplingRate) {
        const rc = 1 / (2 * Math.PI * 5) //cut-off frquency 5Hz
        const dt = 1 / samplingRate
        const alpha = dt / (rc + dt)
        let y = new Array(readings.length).fill(0)
        y[0] = readings[0]
        for (let i = 1; i < readings.length; i++) {
            y[i] = alpha * readings[i] + (1 - alpha) * y[i - 1]
        }
        return y
    }

    _mergeSets(sets) {
        if (!sets || sets.length === 0)
            return []
        const { id, deviceTimestamp, offset, unit, type, isAc, flag, deviceType } = sets[0]
        return new ReadingSet(id, sets.map(set => set.readings).flat(), deviceTimestamp, offset, type, unit, flag, isAc, deviceType)
    }

    _getMetaData(getMetaData) {
        const meta = getMetaData()
        if (!meta)
            return {
                scalingFactor: 0,
                numberOfReadings: 0,
                batchIndex: 0
            }
        else
            return meta
    }

    addListener(callback, id, mode, rate, getMetaData, cycleTime, isSingleRead) {
        const sets = []
        let i = null
        const listener = this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, service, characteristic, value }) => {
            if (peripheral === id && service === this.uuids.services.DSO && characteristic === this.uuids.characteristics.DSO.READING) {
                const metaData = getMetaData()
                if (metaData) {
                    const { scalingFactor, numberOfReadings, batchIndex, samplingRate } = getMetaData()
                    const readingSet = this.dataConverter.DSOResponse(value, scalingFactor, mode, rate)
                    if (i !== batchIndex)
                        sets.length = 0
                    sets.push(readingSet)
                    i = batchIndex
                    if (sets.reduce((prev, next) => prev + next.readings.length, 0) >= numberOfReadings) {
                        const newSet = this._mergeSets(sets)
                        if (isSingleRead) {
                            const avgReadings = this._averageReadings(newSet.readings, samplingRate, rate)
                            const avgValue = avgReadings.reduce((prev, next) => prev + next, 0) / avgReadings.length
                            const reading = new Reading(null, avgValue, newSet.deviceTimestamp, newSet.type, newSet.unit, newSet.flag, newSet.isAc, newSet.deviceType)
                            callback(MultimeterListenerEvents.SINGLE_READ, reading)
                        }
                        else {
                            const lowPassFileterd = this._lowPassFilter(newSet.readings, samplingRate)
                            const avgReadings = this._averageReadings(lowPassFileterd, samplingRate, rate)
                            const edgeNumber = this._getEdgeNumber(avgReadings, rate, cycleTime)
                            avgReadings.splice(0, edgeNumber)
                            avgReadings.splice(-avgReadings.length, edgeNumber)
                            const adjustedTimestamp = Math.round(newSet.deviceTimestamp - edgeNumber * newSet.offset)
                            newSet.setReadings(avgReadings)
                            newSet.setTime(adjustedTimestamp)
                            callback(MultimeterListenerEvents.READING_SET, newSet)
                        }
                        sets.length = 0
                    }
                }
            }
            if (peripheral === id && service === this.uuids.services.MULTIMETER && characteristic === this.uuids.characteristics.MULTIMETER.READING) {
                const reading = this.dataConverter.DMMResponse(value, mode)
                callback(MultimeterListenerEvents.SINGLE_READ, reading)
            }
        })
        return () => {
            listener.remove()
            sets.length = 0
            i = null
        }
    }
}