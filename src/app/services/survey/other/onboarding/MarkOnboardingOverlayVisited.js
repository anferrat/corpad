import { OnboardingScreens } from "../../../../entities/survey/other/Onboarding"
import { Error, errors } from "../../../../utils/Error"

export class MarkOnboardingOverlayVisited {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute(onboardingScreen) {
        const { onboarding } = await this.settingRepo.get()

        switch (onboardingScreen) {
            case OnboardingScreens.MAIN:
                onboarding.main = false
                break
            case OnboardingScreens.MAP:
                onboarding.map = false
                break
            case OnboardingScreens.POTENTIAL_TYPES:
                onboarding.potentialTypes = false
                break
            case OnboardingScreens.REFERENCE_CELL_EDIT:
                onboarding.editReferenceCell = false
                break
            case OnboardingScreens.SIDES_EDIT:
                onboarding.editBond = false
                break
            case OnboardingScreens.TEST_POINT_EDIT:
                onboarding.editTestPoint = false
                break
            default:
                throw new Error(errors.GENERAL, 'Uknown onboarding type', 'Unable to update uknwon type')
        }
        return await this.settingRepo.updateOnboarding(onboarding)
    }
}