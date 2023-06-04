import { BluetoothRepository } from "../repository/bluetooth/BluetoothRepository"
import { PokitMultimeterService } from "../services/other/PokitMultimeterService"
import { MultimeterScan } from "../services/survey/other/multimeter/MultimeterScan"
import { MultimeterScanListener } from "../services/survey/other/multimeter/MultimeterScanListener"
import { MultimeterStopScan } from "../services/survey/other/multimeter/MultimeterStopScan"
import { MultimeterStopScanListener } from "../services/survey/other/multimeter/MultimeterStopScanListener"
import { Controller } from "../utils/Controller"


class MultimeterController extends Controller {
    constructor(bluetoothRepo) {
        super()
        this.miltimeterService = new PokitMultimeterService(bluetoothRepo)
        this.multimeterScanService = new MultimeterScan(bluetoothRepo)
        this.multimeterStopScanService = new MultimeterStopScan(bluetoothRepo)
        this.multimeterStopScanListenerService = new MultimeterStopScanListener(bluetoothRepo)
        this.multimeterScanListenerService = new MultimeterScanListener(bluetoothRepo)
    }

    init(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            return await this.miltimeterService.init()
        })
    }

    test(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            return await this.miltimeterService.test()
        })
    }

    scan(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            return await this.multimeterScanService.execute(10)
        })
    }

    stopScan(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 100, async () => {
            return await this.multimeterStopScanService.execute()
        })
    }

    stopScanListener(callback, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 100, () => {
            return this.multimeterStopScanListenerService.execute(callback)
        })
    }

    scanListener(callback, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 100, () => {
            return this.multimeterScanListenerService.execute(callback)
        })
    }

}

const multimeterController = new MultimeterController(
    new BluetoothRepository()
)

export const testMultimeter = async (onError, onSuccess) => await multimeterController.test(onError, onSuccess)

export const initBluetooth = async (onError, onSuccess) => await multimeterController.init(onError, onSuccess)

export const startMultimeterScan = async (onError, onSuccess) => await multimeterController.scan(onError, onSuccess)

export const stopMultimeterScan = async (onError, onSuccess) => await multimeterController.stopScan(onError, onSuccess)

export const multimeterScanListener = (callback, onError, onSuccess) => multimeterController.scanListener(callback, onError, onSuccess)

export const multimeterStopScanListener = (callback, onError, onSuccess) => multimeterController.stopScanListener(callback, onError, onSuccess)