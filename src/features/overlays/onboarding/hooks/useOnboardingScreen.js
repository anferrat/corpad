import { useDispatch, useSelector } from "react-redux"
import { markOnboardingCompleted, getOnboardingVersion } from "../../../../app/controllers/survey/other/OnboardingController"
import { useCallback } from "react"
import { updateOnboarding } from "../../../../store/actions/settings"
import { primary } from "../../../../styles/colors"

const useOnboardingScreen = () => {
    const dispatch = useDispatch()
    const visible = useSelector(state => state.settings.onboarding.main)
    const version = useSelector(state => state.settings.onboarding.versionOnboarding)
    const currentVersion = getOnboardingVersion()

    const markVisited = useCallback(async () => {
        await markOnboardingCompleted()
        dispatch(updateOnboarding('main', currentVersion))
    }, [])

    return {
        visible: visible || version !== currentVersion,
        primary: visible,
        markVisited
    }
}

export default useOnboardingScreen