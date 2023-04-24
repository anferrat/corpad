import { useSelector } from "react-redux"
import { getOnboardingVersion } from "../../app/controllers/survey/other/OnboardingController"

const useOnboardingScreen = () => {
    const visible = useSelector(state => state.settings.onboarding.main)
    const version = useSelector(state => state.settings.onboarding.versionOnboarding)
    const currentVersion = getOnboardingVersion()
    return visible || version !== currentVersion
}

export default useOnboardingScreen