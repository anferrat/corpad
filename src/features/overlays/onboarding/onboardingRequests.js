import { sendRequest } from "../../../api/database/index"

// after big updates displays onboarding with the features, in order to request new onboarding - change version to +1 and change the onboarding Screen
export const ONBOARDING_VERSION = 2

export const markAsVisited = async (onboarding) => {
    const settings = await sendRequest('SELECT', 'SETTINGS')
    if (settings.status === 200) {
        const onBoardingData = JSON.parse(settings.result.onboarding)
        const updatedData = JSON.stringify({ ...onBoardingData, [onboarding]: false })
        await sendRequest('UPDATE', 'SETTING', { setting: 'onboarding', value: updatedData })
    }
}

export const onboardingCompleted = async () => {
    const settings = await sendRequest('SELECT', 'SETTINGS')
    if (settings.status === 200) {
        const onBoardingData = JSON.parse(settings.result.onboarding)
        const updatedData = JSON.stringify({ ...onBoardingData, versionOnboarding: ONBOARDING_VERSION })
        await sendRequest('UPDATE', 'SETTING', { setting: 'onboarding', value: updatedData })
    }
}