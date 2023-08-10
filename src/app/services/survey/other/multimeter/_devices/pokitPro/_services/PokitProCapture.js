

export class PokitProCapture {
    constructor(bluetoothRepo, serviceUUIDs, characteristicUUIDs, measurementSetting, byteConverter) {
        this.bluetoothRepo = bluetoothRepo
        this.serviceUUIDs = serviceUUIDs
        this.characteristicUUIDs = characteristicUUIDs
        this.measurementSetting = measurementSetting
        this.byteConverter = byteConverter
    }

    start(peripheralId, measurementSetting, range, interval) {
        const settingBytes = this.byteConverter.convertMultimeterServiceSettings(measurementSetting, range, interval)
        this.bluetoothRepo.write(
            peripheralId,
            this.serviceUUIDs.MULTIMETER,
            this.characteristicUUIDs.MULTIMETER.SETTINGS,
            settingBytes,
            settingBytes.length
        )
    }

    stop(peripheralId) {
        const settingBytes = this.byteConverter.convertMultimeterServiceSettings(this.measurementSetting.IDLE)
        this.bluetoothRepo.write(
            peripheralId,
            this.serviceUUIDs.MULTIMETER,
            this.characteristicUUIDs.MULTIMETER.SETTINGS,
            settingBytes,
            settingBytes.length
        )
    }
}