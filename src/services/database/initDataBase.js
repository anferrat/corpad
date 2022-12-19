import { sendRequest, sendCombinedRequest } from "../../api/database"
import { defaultNames } from "../../constants/constants"
/*

Database initiation:
 - Create tables
 - check defaultNames, insert new ones if not found,
 - Check settings, set default ones if not found
 - check onboarding setting, if not found, set default one
 - return onboarding setting for app state
*/

export const initDataBase = async () => {
    //create tables if not exists
    await sendRequest('INIT', '', [
        { table: 'testPoints' },
        { table: 'survey' },
        { table: 'pipelines' },
        { table: 'cards' },
        { table: 'potentials' },
        { table: 'referenceCells' },
        { table: 'circuits' },
        { table: 'rectifiers' },
        { table: 'defaultNames' },
        { table: 'settings' },
        { table: 'calculators' },
        { table: 'potentialTypes' },
        { table: 'sides' }])

    const defaultOnboarding = {
        main: true,
        editTestPoint: true,
        map: true, editBond: true,
        editReferenceCell: true,
        potentialTypes: true,
        versionUpdating: null
    }

    //check if defaults names are presented and 
    const defaultNamesFromDb = await sendRequest('SELECT', 'DEFAULT_NAME_TYPES')
    if (defaultNamesFromDb.status === 200) {
        const isRefreshNeeded = defaultNames.some(defName => defaultNamesFromDb.result.indexOf(defName.property) === -1)
        if (isRefreshNeeded) {
            await sendCombinedRequest([
                ['DROP', '', { table: 'defaultNames' }],
                ['INIT', '', { table: 'defaultNames' }],
                ...defaultNames.map(d => ['INSERT', 'DEFAULT_NAME', { type: d.property, name: d.name }])
            ])
        }
    }

    const settings = await sendRequest('SELECT', 'SETTINGS')
    const onboardingString = JSON.stringify(defaultOnboarding)
    if (settings.status !== 200) {
        const update = await sendRequest('INSERT', 'SETTINGS', { pipelineNameAsDefault: true, defaultPotentialUnit: 0, autoCreatePotentials: 1, onboarding: onboardingString })
        if (update.status === 200)
            return onboardingString
        else return null
    }
    return settings.result.onboarding
}