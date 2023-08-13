import { ONBOARDING_VERSION } from "../../../../config/Onboarding"

export class MarkOnboardingVisited {
    constructor(settingRepo, multimeterInitializationService) {
        this.settingRepo = settingRepo
        this.multimeterInitializationService = multimeterInitializationService
    }

    async execute() {
        const { onboarding } = await this.settingRepo.get()
        onboarding.versionOnboarding = ONBOARDING_VERSION
        onboarding.main = false
        await Promise.all([
            this.settingRepo.updateOnboarding(onboarding),
            this.multimeterInitializationService.execute()
        ])
        return ONBOARDING_VERSION
    }
}