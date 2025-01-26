import { MultimeterListenerEvents } from "../../../../../../../../constants/global"
import { ReadingSet } from "../../../../../../../entities/survey/multimeter/ReadingSet"

export class PokitProAddReadingListener {
    constructor(bluetoothRepo, uuids, dataConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.uuids = uuids
        this.dataConverter = dataConverter
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

    addListener(callback, id, mode, rate, getMetaData) {
        const sets = []
        let i = null
        const listener = this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, service, characteristic, value }) => {
            if (peripheral === id && service === this.uuids.services.DSO && characteristic === this.uuids.characteristics.DSO.READING) {
                const { scalingFactor, numberOfReadings, batchIndex } = getMetaData()
                const readingSet = this.dataConverter.DSOResponse(value, scalingFactor, mode, rate)
                if (i !== batchIndex)
                    sets.length = 0
                sets.push(readingSet)
                i = batchIndex
                if (sets.reduce((prev, next) => prev + next.readings.length, 0) >= numberOfReadings) {
                    callback(MultimeterListenerEvents.READING_SET, this._mergeSets(sets))
                    sets.length = 0
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