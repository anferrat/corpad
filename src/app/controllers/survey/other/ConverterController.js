import { Controller } from "../../../utils/Controller"
import { unitConverter } from "../../_instances/general_services"

class ConverterController extends Controller {
    constructor(unitConverter) {
        super()
        this.converterService = unitConverter
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

const converterController = new ConverterController(unitConverter)

export const convertAmps = ({ value, inputUnit, outputUnit }, onError, onSuccess) => converterController.convertAmps({ value, inputUnit, outputUnit }, onError, onSuccess)

export const convertVolts = ({ value, inputUnit, outputUnit }, onError, onSuccess) => converterController.convertVolts({ value, inputUnit, outputUnit }, onError, onSuccess)