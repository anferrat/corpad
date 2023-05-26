import { Onboarding } from "../../../entities/survey/other/Onboarding"
import { AppSettings } from "../../../entities/survey/other/Settings"
import { PotentialUnits } from "../../../../constants/global"


export class ResetSettings {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute() {
        //Takes settings as argument, creates new settings objects and writes to db. undefined values for settings are replaced with standard ones
        const settings = await this.settingRepo.get()
        const { pipelineNameAsDefault, defaultPotentialUnit, autoCreatePotentials, isSurveyNew, isCloud, originalHash, fileName, cloudId, lastSync, onboarding } = settings
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
            onboarding ?? newOnboarding)
        await this.settingRepo.update(newSettings)
        return newSettings
    }
}