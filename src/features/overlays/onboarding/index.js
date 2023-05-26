import { useIsFocused } from "@react-navigation/native"
import OnboardingOverlay from "./components/OnboardingOverlay"
import OnboardingScreenDefault from "./components/OnboardingScreen"

export const OnboardingScreen = OnboardingScreenDefault

export const OnboradingOverlayEditTestPoint = ({ visible }) => {
    if (visible)
        return <OnboardingOverlay
            onboarding='editTestPoint'
            icon='onboarding-comment'
            pack='cp' />
    else return null
}

export const OnboardingOverlayEditSides = ({ visible }) => {
    if (visible)
        return <OnboardingOverlay
            onboarding={'editBond'}
            icon={'onboarding-settings'}
            pack={'cp'} />
    else return null
}

export const OnboardingOverlayEditReferenceCell = ({ visible }) => {
    if (visible)
        return <OnboardingOverlay
            onboarding={'editReferenceCell'}
            icon={'onboarding-info'}
            pack={'cp'} />
    else return null
}

export const OnboardingOverlayEditMap = ({ visible }) => {
    const isFocused = useIsFocused()
    if (visible && isFocused)
        return <OnboardingOverlay
            onboarding='map'
            icon='onboarding-navigate'
            pack='cp' />
    else return null
}

export const OnboardingOverlayPotentialtypes = ({ visible }) => {
    if (visible)
        return <OnboardingOverlay
            onboarding='potentialTypes'
            icon={'onboarding-stars'}
            pack='cp' />
    else return null
}