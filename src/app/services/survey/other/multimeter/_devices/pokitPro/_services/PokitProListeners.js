export class PokitProListeners {
    constructor(bluetoothRepo, serviceUUIDs, characteristicUUIDs, settings, byteConverter, timeSyncedCaptureService, highLowCaptureService, cyclicCaptureService) {
        this.bluetoothRepo = bluetoothRepo
        this.serviceUUIDs = serviceUUIDs
        this.characteristicUUIDs = characteristicUUIDs
        this.settings = settings
        this.byteConverter = byteConverter
        this.timeSyncedCaptureService = timeSyncedCaptureService
        this.highLowCaptureService = highLowCaptureService
        this.cyclicCaptureService = cyclicCaptureService
    }

    addReadingListener(callback, peripheralId) {
        return this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, characteristic, service, value }) => {
            if (
                peripheral === peripheralId &&
                characteristic === this.characteristicUUIDs.MULTIMETER.READING &&
                service === this.serviceUUIDs.MULTIMETER) {
                const reading = this.byteConverter.convertReading(value)
                callback({ cycle: null, value: reading.value })
            }
        }).remove
    }

    addButtonPressListener(callback, peripheralId) {
        return this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, characteristic, service }) => {
            if (
                peripheral === peripheralId &&
                characteristic === this.characteristicUUIDs.STATUS.BUTTON_PRESS &&
                service === this.serviceUUIDs.STATUS) {
                //need to remove long press detection by converting byte data
                callback(true)
            }
        }).remove
    }

    addStatusListener(callback, peripheralId) {
        return this.bluetoothRepo.newCharacteristicValueListener(({ peripheral, characteristic, service, value }) => {
            if (
                peripheral === peripheralId &&
                characteristic === this.characteristicUUIDs.STATUS.STATUS &&
                service === this.serviceUUIDs.STATUS) {
                callback(this.byteConverter.convertStatus(value))
            }
        }).remove
    }

    addTimeSyncedReadingListener(callback, peripheralId, onTime, offTime, firstCycle, getTimeDelta) {
        let values = []
        let timestamps = []
        const removeListener = this.addReadingListener(({ value }) => {
            timestamps.push(Date.now())
            values.push(value)
        }, peripheralId)

        const timer = setInterval(() => {
            const timeDelta = getTimeDelta()
            const [[cycle1, value1], [cycle2, value2]] = this.timeSyncedCaptureService.execute(values, timestamps, timeDelta, firstCycle, onTime, offTime)
            callback({ cycle: cycle1, value: value1 })
            callback({ cycle: cycle2, value: value2 })
            values = []
            timestamps = []
        }, onTime + offTime)
        return () => {
            removeListener()
            clearInterval(timer)
        }
    }

    addHighLowReadingListener(callback, peripheralId, onTime, offTime) {
        let values = []
        const removeListener = this.addReadingListener(({ value }) => {
            values.push(value)
        }, peripheralId)

        const timer = setInterval(() => {
            const [[cycle1, value1], [cycle2, value2]] = this.highLowCaptureService.execute(values)
            callback({ cycle: cycle1, value: value1 })
            callback({ cycle: cycle2, value: value2 })
            values = []
        }, onTime + offTime)
        return () => {
            removeListener()
            clearInterval(timer)
        }
    }

    addCyclicReadingListener(callback, peripheralId, onTime, offTime) {
        let values = []
        const removeListener = this.addReadingListener(({ value }) => {
            values.push(value)
        }, peripheralId)

        const timer = setInterval(() => {
            const [[cycle1, value1], [cycle2, value2]] = this.cyclicCaptureService.execute(values, onTime, offTime)
            callback({ cycle: cycle1, value: value1 })
            callback({ cycle: cycle2, value: value2 })
            values = []
        }, onTime + offTime)

        return () => {
            removeListener()
            clearInterval(timer)
        }
    }

}