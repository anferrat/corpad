import { MeasurementPropertyTypes, MultimeterModes } from "../../../../../../constants/global"

export class PropertyFieldCaptureSetup {
    constructor(settingRepo, multimeterFactory, multimeterPropertyCaptureParameters, getOnOffPairService, permissions) {
        this.settingRepo = settingRepo
        this.multimeterFactory = multimeterFactory
        this.params = multimeterPropertyCaptureParameters.params
        this.getOnOffPairService = getOnOffPairService
        this.permissions = permissions
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

    async onStart(measurementPropertyType, potentialId, subitemId) {
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

    async onStop() {
        const { multimeter: { type, peripheralId } } = await this.settingRepo.get()
        const multimeterService = this.multimeterFactory.execute(type)
        await multimeterService.setSettings(peripheralId, MultimeterModes[type].IDLE)
    }
}