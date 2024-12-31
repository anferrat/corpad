import { MultimeterMeasurementTypes } from "../../../../../../../constants/global"
import { DvmCharacteristics } from "./constants/dvm_characteristics"
import { DvmServices } from "./constants/dvm_services"

export class _Dvm2130MultimeterService {
    constructor(bluetoothRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.servicesUUIDs = new DvmServices()
        this.characteristicUUIDs = new DvmCharacteristics()
    }

    startMultimeter() {

    }

    stopMultimeter() {

    }

    startCapture() {

    }

    stopCapture() {

    }

    addReadingListener() {

    }

    addButtonPressListener() {

    }

    getSupportedMeasurementTypes() {
        return [
            MultimeterMeasurementTypes.POTENTIALS,
            MultimeterMeasurementTypes.POTENTIALS_AC,
            MultimeterMeasurementTypes.VOLTAGE,
            MultimeterMeasurementTypes.VOLTAGE_DROP
        ]
    }
}