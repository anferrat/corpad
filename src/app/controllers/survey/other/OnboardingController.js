import { MarkOnboardingOverlayVisited } from "../../../services/survey/other/onboarding/MarkOnboardingOverlayVisited"
import { MarkOnboardingVisited } from "../../../services/survey/other/onboarding/MarkOnboardingVisited"
import { Controller } from "../../../utils/Controller"
import { ONBOARDING_VERSION } from "../../../config/Onboarding"
import { MultimeterInitialization } from "../../../services/survey/other/multimeter/initialization/MultimeterInitialization"
import { bluetoothRepo, settingRepo } from "../../_instances/repositories"
import { connectMultimeterService, multimeterFactory } from "../../_instances/multimeter"

class OnboardingController extends Controller {
    constructor(settingRepo, bluetoothRepo, multimeterFactory, connectMultimeterService) {
        super()
        this.multimeterFactory = multimeterFactory
        this.multimeterInitializationService = new MultimeterInitialization(bluetoothRepo, connectMultimeterService)
        this.markOnboardingVisitedService = new MarkOnboardingVisited(settingRepo, this.multimeterInitializationService)
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
    settingRepo,
    bluetoothRepo,
    multimeterFactory,
    connectMultimeterService
)

export const markOnboardingCompleted = (onError, onSuccess) => onboardingController.markOnboardingCompleted(onError, onSuccess)

export const getOnboardingVersion = () => onboardingController.getVersion()

export const markOnboardingOverlayVisited = ({ onboardingScreen }, onError, onSuccess) => onboardingController.markOnboardingOverlayVisited({ onboardingScreen }, onError, onSuccess)