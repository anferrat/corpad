import { sendRequest } from "../../../database/db";

export const markAsVisited = async (onboarding) => {
    const settings = await sendRequest('SELECT', 'SETTINGS')
    if (settings.status === 200) {
        const onBoardingData = JSON.parse(settings.result.onboarding)
        const updatedData = JSON.stringify({ ...onBoardingData, [onboarding]: false })
        await sendRequest('UPDATE', 'SETTING', { setting: 'onboarding', value: updatedData })
    }
}