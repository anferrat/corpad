import { UnitConverter } from "../../../services/other/UnitConverter"
import { Controller } from "../../../utils/Controller"

class ConverterController extends Controller {
    constructor() {
        super()
        this.converterService = new UnitConverter()
    }

    convertVolts({ value, inputUnit, outputUnit }, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 622, () => {
            return this.converterService.convertVolts(value, inputUnit, outputUnit)
        })
    }

    convertAmps({ value, inputUnit, outputUnit }, onError = null, onSuccess = null) {
        return super.callbackHandler(onSuccess, onError, 622, () => {
            return this.converterService.convertAmps(value, inputUnit, outputUnit)
        })
    }
}

const converterController = new ConverterController()

export const convertAmps = ({ value, inputUnit, outputUnit }, onError, onSuccess) => converterController.convertAmps({ value, inputUnit, outputUnit }, onError, onSuccess)

export const convertVolts = ({ value, inputUnit, outputUnit }, onError, onSuccess) => converterController.convertVolts({ value, inputUnit, outputUnit }, onError, onSuccess)