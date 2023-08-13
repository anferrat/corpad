import { SettingRepository } from "../../../repository/sqlite/SettingRepository"
import { GetVersion } from "../../../services/survey/other/onboarding/GetVersion"
import { MarkOnboardingOverlayVisited } from "../../../services/survey/other/onboarding/MarkOnboardingOverlayVisited"
import { MarkOnboardingVisited } from "../../../services/survey/other/onboarding/MarkOnboardingVisited"
import { Controller } from "../../../utils/Controller"
import { ONBOARDING_VERSION } from "../../../config/Onboarding"
import { MultimeterInitialization } from "../../../services/survey/other/multimeter/MultimeterInitialization"
import { BluetoothRepository } from "../../../repository/bluetooth/BluetoothRepository"
import { MultimeterFactory } from "../../../services/survey/other/multimeter/_devices/MultimeterFactory"

class OnboardingController extends Controller {
    constructor(settingRepo, bluetoothRepo) {
        super()
        this.multimeterFactory = new MultimeterFactory(bluetoothRepo)
        this.multimeterInitializationService = new MultimeterInitialization(bluetoothRepo, settingRepo, this.multimeterFactory)
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
    new SettingRepository(),
    new BluetoothRepository()
)

export const markOnboardingCompleted = (onError, onSuccess) => onboardingController.markOnboardingCompleted(onError, onSuccess)

export const getOnboardingVersion = () => onboardingController.getVersion()

export const markOnboardingOverlayVisited = ({ onboardingScreen }, onError, onSuccess) => onboardingController.markOnboardingOverlayVisited({ onboardingScreen }, onError, onSuccess)