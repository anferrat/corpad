import { ONBOARDING_VERSION } from "../../../../config/Onboarding"

export class MarkOnboardingVisited {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute() {
        const { onboarding } = await this.settingRepo.get()
        onboarding.versionOnboarding = ONBOARDING_VERSION
        onboarding.main = false
        await this.settingRepo.updateOnboarding(onboarding)
        return ONBOARDING_VERSION
    }
}