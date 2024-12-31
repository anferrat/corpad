import { Onboarding } from "../../../entities/survey/other/Onboarding"
import { AppSettings } from "../../../entities/survey/other/Settings"
import { MultimeterCaptureRate, MultimeterCycles, MultimeterSyncModes, PotentialUnits, TimeSyncSources } from "../../../../constants/global"
import { MultimeterSettings } from "../../../entities/survey/other/MultimeterSettings"


export class SettingInitialization {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
        this.DEFAULT_MULTIMETER_SETTINGS = new MultimeterSettings(null, null, null, 4000, 1000, null, MultimeterSyncModes.HIGH_LOW, MultimeterCycles.ON, true, TimeSyncSources.MIXED, 100, 200, MultimeterCaptureRate._60Hz)
    }

    _verifyMultimeterSettings(multimeter) {
        if (!multimeter)
            return this.DEFAULT_MULTIMETER_SETTINGS
        const { peripheralId, name, type, onTime, offTime, delay, syncMode, firstCycle, onOffCaptureActive, offDelay, onSetup, timeSyncMode, captureRate } = multimeter
        return new MultimeterSettings(
            peripheralId ?? this.DEFAULT_MULTIMETER_SETTINGS.peripheralId,
            name ?? this.DEFAULT_MULTIMETER_SETTINGS.name,
            type ?? this.DEFAULT_MULTIMETER_SETTINGS.type,
            onTime ?? this.DEFAULT_MULTIMETER_SETTINGS.onTime,
            offTime ?? this.DEFAULT_MULTIMETER_SETTINGS.offTime,
            delay ?? this.DEFAULT_MULTIMETER_SETTINGS.delay,
            syncMode ?? this.DEFAULT_MULTIMETER_SETTINGS.syncMode,
            firstCycle ?? this.DEFAULT_MULTIMETER_SETTINGS.firstCycle,
            onOffCaptureActive ?? this.DEFAULT_MULTIMETER_SETTINGS.onOffCaptureActive,
            timeSyncMode ?? this.DEFAULT_MULTIMETER_SETTINGS.timeSyncMode,
            offDelay ?? this.DEFAULT_MULTIMETER_SETTINGS.offDelay,
            onSetup ?? this.DEFAULT_MULTIMETER_SETTINGS.onSetup,
            captureRate ?? this.DEFAULT_MULTIMETER_SETTINGS.captureRate
        )
    }

    async execute() {
        //Takes settings as argument, creates new settings objects and writes to db. undefined values for settings are replaced with standard ones
        const settings = await this.settingRepo.get()

        const { pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, onboarding, multimeter } = settings
        const newOnboarding = new Onboarding(null, true, true, true, true, true, true)
        const newSettings = new AppSettings(
            pipelineNameAsDefault ?? true,
            defaultPotentialUnit ?? PotentialUnits.MILIVOLTS,
            autoCreatePotentials ?? true,
            isSurveyNew ?? null,
            isCloud ?? null,
            originalHash ?? null,
            fileName ?? null,
            cloudId ?? null,
            lastSync ?? null,
            onboarding ?? newOnboarding,
            this._verifyMultimeterSettings(multimeter))
        await this.settingRepo.update(newSettings)
        return newSettings
    }
}