import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {resetCurrentSurveySettings, updateLoader} from '../../../../store/actions/settings'
import {resetSurvey} from '../../../../app/controllers/survey/SurveyController'
import {errorHandler, warningHandler} from '../../../../helpers/error_handler'
import {hapticMedium} from '../../../../native_libs/haptics'
import {translateSettings} from '../../../../localization'

const useSettings = () => {
    const savingInProgress = useSelector(state => state.settings.currentSurvey.savingInProgress)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const onExit = async () => {
        if (!savingInProgress) {
            hapticMedium()
            const confirm = await warningHandler(12, translateSettings('exit'), translateSettings('cancel'))
            if (confirm) {
                dispatch(updateLoader(translateSettings('exitingSurvey')))
                await resetSurvey(er => errorHandler(er))
                dispatch(resetCurrentSurveySettings())
            }
        }
        else errorHandler(113)
    }

    const navigateToDetails = screen => {
        navigation.navigate('SettingDetails', {setting: screen})
    }

    const navigateToExport = () => navigation.navigate('ExportItem')
    const navigateToAbout = () => navigateToDetails('about')
    const navigateToLocalization = () => navigateToDetails('localization')
    const navigateToPotentials = () => navigateToDetails('potentials')
    const navigateToDefaultNames = () => navigateToDetails('defaultNames')
    const navigateToExportedFiles = () => navigateToDetails('exportedFiles')
    const navigateToCalculator = () => navigation.navigate('CalculatorList')
    const navigateToInfo = () => navigateToDetails('info')
    const navigateToMultimeter = () => navigateToDetails('multimeter')
    const navigateToReferenceCells = () => navigateToDetails('refCells')
    const navigateToExternalLinks = () => navigateToDetails('externalLinks')
    const navigateToImages = () => navigateToDetails('photos')

    return {
        onExit,
        navigateToDetails,
        navigateToExport,
        navigateToAbout,
        navigateToLocalization,
        navigateToPotentials,
        navigateToDefaultNames,
        navigateToExportedFiles,
        navigateToInfo,
        navigateToReferenceCells,
        navigateToMultimeter,
        navigateToCalculator,
        navigateToExternalLinks,
        navigateToImages
    }
}

export default useSettings
