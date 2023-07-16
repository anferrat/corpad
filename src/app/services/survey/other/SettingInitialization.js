import { Onboarding } from "../../../entities/survey/other/Onboarding"
import { AppSettings } from "../../../entities/survey/other/Settings"
import { MultimeterCycles, MultimeterSyncModes, PotentialUnits } from "../../../../constants/global"
import { MultimeterSettings } from "../../../entities/survey/other/MultimeterSettings"


export class SettingInitialization {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute() {
        //Takes settings as argument, creates new settings objects and writes to db. undefined values for settings are replaced with standard ones
        const settings = await this.settingRepo.get()

        const { pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, onboarding, multimeter } = settings
        const newOnboarding = new Onboarding(null, true, true, true, true, true, true)
        const newMultimeter = new MultimeterSettings(null, null, null, 4000, 1000, 100, MultimeterSyncModes.HIGH_LOW, MultimeterCycles.OFF, true)
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
            multimeter ?? newMultimeter)
        await this.settingRepo.update(newSettings)
        return newSettings
    }
}