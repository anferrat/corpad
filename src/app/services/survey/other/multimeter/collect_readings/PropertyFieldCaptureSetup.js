import { MeasurementPropertyTypes, MultimeterModes } from "../../../../../../constants/global"
import { Error, errors } from "../../../../../utils/Error"
import { MultimeterPropertyCaptureWarnings } from "../utils/MultimeterPropertyCaptureWarnings"

export class PropertyFieldCaptureSetup {
    constructor(settingRepo, multimeterFactory, multimeterPropertyCaptureParameters, getOnOffPairService, permissions, warningHandler) {
        this.settingRepo = settingRepo
        this.multimeterFactory = multimeterFactory
        this.params = multimeterPropertyCaptureParameters.params
        this.getOnOffPairService = getOnOffPairService
        this.permissions = permissions
        this.warnings = new MultimeterPropertyCaptureWarnings(warningHandler)
    }

    _isSingleRead(measurementPropertyType, onOffCaptureActive, forceSingleRead) {
        const isPotentialCapture = (measurementPropertyType === MeasurementPropertyTypes.POTENTIAL || measurementPropertyType === MeasurementPropertyTypes.POTENTIAL_AC)
        return forceSingleRead || !isPotentialCapture || isPotentialCapture && !onOffCaptureActive
    }

    async _getOnOffPotentialPair(potentialId, subitemId) { //If potentialId is mentioned, we should locate on/off pair for given potential
        try {
            return await this.getOnOffPairService.execute({ potentialId, subitemId })
        }
        catch (er) {
            return {
                on: null,
                off: null
            }
        }
    }

    async onStart(measurementPropertyType, potentialId, subitemId, toggleStatus) {
        const [{ multimeter }, { on, off }] = await Promise.all(
            [
                this.settingRepo.get(),
                this._getOnOffPotentialPair(potentialId, subitemId),
                this.permissions.bluetooth()

            ])

        const forceSingleRead = on === null || off === null //when pair is not found, setup as single read capture

        const { peripheralId, type, onTime, offTime, onOffCaptureActive, captureRate, firstCycle, onSetup, offDelay, syncMode } = multimeter
        const { mode, range } = this.params[measurementPropertyType][type]
        const multimeterService = this.multimeterFactory.execute(type)
        const isSingleRead = this._isSingleRead(measurementPropertyType, onOffCaptureActive, forceSingleRead)
        const { isValid, isSupported } = multimeterService.isSupported(toggleStatus, mode, range)
        if (!isValid)
            throw new Error(errors.MULTIMETER, `Unable to set ${mode} and ${range} settings`, 'Invalid input parameters', 852)
        if (!isSupported)
            throw new Error(errors.MULTIMETER, 'Unable to set capture mode', 'Measurement is not supported by selected toggle. Please adjust the toggle', 824)
        await this.warnings.execute(toggleStatus, mode)
        await multimeterService.setSettings(peripheralId, mode, range, isSingleRead, captureRate, onTime + offTime)
        return {
            peripheralId,
            type,
            onTime,
            offTime,
            onPotentialId: isSingleRead ? null : on,
            offPotentialId: isSingleRead ? null : off,
            isSingleRead,
            firstCycle,
            onSetup,
            offDelay,
            syncMode,
            mode,
            range,
            captureRate
        }
    }

    async onStop(isSingleRead) {
        const { multimeter: { type, peripheralId } } = await this.settingRepo.get()
        const multimeterService = this.multimeterFactory.execute(type)
        await multimeterService.setSettings(peripheralId, MultimeterModes[type].IDLE, null, isSingleRead, null, null)
    }
}