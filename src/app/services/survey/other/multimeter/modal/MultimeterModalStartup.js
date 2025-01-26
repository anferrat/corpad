import { Error, errors } from "../../../../../utils/Error"
import { MultimeterModalDefaultParams } from "../utils/MultimeterModalDefaultParams"

export class MultimeterModalStartup {
    constructor(settingRepo, multimeterFactory) {
        this.settingRepo = settingRepo
        this.defaultParamService = new MultimeterModalDefaultParams()
        this.multimeterFactory = multimeterFactory
    }

    async execute(toggleStatus) {
        const { multimeter: { captureRate, type, peripheralId } } = await this.settingRepo.get()
        if (!type)
            throw new Error(errors.MULTIMETER, 'Unable to get multimeter type', 'No paired multimeter found')

        const multimeterService = this.multimeterFactory.execute(type)
        const { range, mode } = this.defaultParamService.getDefaultParameters(type, toggleStatus)
        const { modes, ranges } = this.defaultParamService.getAvailableParameters(type, toggleStatus)
        if (!range || !mode)
            throw new Error(errors.MULTIMETER, 'Unable to get default parameters', `Parameters for this multimiter type weren't initialized`)
        await multimeterService.setSettings(peripheralId, mode, range, true, captureRate)
        return {
            mode,
            range,
            modes,
            ranges,
            captureRate,
            peripheralId,
            multimeterType: type,
        }
    }
}