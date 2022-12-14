import OnboardingOverlay from "./OnboardingOverlay"
import OnboardingScreenDefault from "./OnboardingScreen"
import { ONBOARDING_VERSION as version } from "./onboardingRequests"
import { verifyTypes } from "../../../helpers/functions"

export const OnboardingScreen = OnboardingScreenDefault
export const ONBOARDING_VERSION = version

export const Onboarding = ({ screen, params }) => {
    switch (screen) {
        case 'EditItem':
            if (params.dataTypeItem === 'TEST_POINT')
                return <OnboardingOverlay onboarding='editTestPoint' icon='onboarding-comment' pack='cp' />
            else return null
        case 'EditSubitem':
            if (verifyTypes(params.subitemType, ['BD', 'SH', 'IK']))
                return <OnboardingOverlay onboarding={'editBond'} icon={'onboarding-settings'} pack={'cp'} />
            else if (params.subitemType === 'RE')
                return <OnboardingOverlay onboarding={'editReferenceCell'} icon={'onboarding-info'} pack={'cp'} />
            else return null
        case 'Map':
            return <OnboardingOverlay onboarding='map' icon='onboarding-navigate' pack='cp' />
        case 'SettingDetails':
            if (params.setting === 'potentials')
                return <OnboardingOverlay onboarding='potentialTypes' icon={'onboarding-stars'} pack='cp' />
            else return null
        default:
            return null
    }
}