import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { markOnboardingOverlayVisited } from "../../../../app/controllers/survey/other/OnboardingController"
import { updateOnboarding } from "../../../../store/actions/settings"


const useOnboardingOverlay = (onboardingScreen) => {
    const visible = useSelector(state => state.settings.onboarding[onboardingScreen])
    const dispatch = useDispatch()
    const markVisited = useCallback(() => {
        //Dont await to speed up
        markOnboardingOverlayVisited({ onboardingScreen })
        dispatch(updateOnboarding(onboardingScreen))
    }, [onboardingScreen])

    return {
        visible,
        markVisited
    }
}

export default useOnboardingOverlay