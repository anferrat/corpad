import { SettingRepository } from "../../../repository/sqlite/SettingRepository"
import { GetVersion } from "../../../services/survey/other/onboarding/GetVersion"
import { MarkOnboardingOverlayVisited } from "../../../services/survey/other/onboarding/MarkOnboardingOverlayVisited"
import { MarkOnboardingVisited } from "../../../services/survey/other/onboarding/MarkOnboardingVisited"
import { Controller } from "../../../utils/Controller"
import { ONBOARDING_VERSION } from "../../../config/Onboarding"

class OnboardingController extends Controller {
    constructor(settingRepo) {
        super()
        this.markOnboardingVisitedService = new MarkOnboardingVisited(settingRepo)
        this.markOnboardingOverlayVisitedService = new MarkOnboardingOverlayVisited(settingRepo)
    }

    markOnboardingCompleted(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 633, async () => {
            return this.markOnboardingVisitedService.execute()
        })
    }

    markOnboardingOverlayVisited(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 633, async () => {
            const { onboardingScreen } = params
            return this.markOnboardingOverlayVisitedService.execute(onboardingScreen)
        })
    }

    getVersion() {
        return ONBOARDING_VERSION
    }
}

const onboardingController = new OnboardingController(
    new SettingRepository()
)

export const markOnboardingCompleted = (onError, onSuccess) => onboardingController.markOnboardingCompleted(onError, onSuccess)

export const getOnboardingVersion = () => onboardingController.getVersion()

export const markOnboardingOverlayVisited = ({ onboardingScreen }, onError, onSuccess) => onboardingController.markOnboardingOverlayVisited({ onboardingScreen }, onError, onSuccess)