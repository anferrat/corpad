import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import DefaultNames from '../../features/settings/default_names/DefaultNames'
import RefCells from '../../features/settings/reference_cells/RefCells'
import Potentials from '../../features/settings/potentials/Potentials'
import ExportSurvey from '../../features/settings/export/ExportSurvey'
import SurveyInfo from '../../features/settings/info/SurveyInfo'
import OnboardingOverlay from '../../features/overlays/onboarding/OnboardingOverlay'
import ExportedFilesList from '../../features/settings/exported_files/ExportedFilesList'

const Setting = (props) => {
    switch (props.setting) {
        case 'defaultNames':
            return <DefaultNames {...props} />
        case 'refCells':
            return <RefCells {...props} />
        case 'potentials':
            return <Potentials {...props} />
        case 'export':
            return <ExportSurvey {...props} />
        case 'info':
            return <SurveyInfo {...props} />
        case 'exportedFiles':
            return <ExportedFilesList {...props} />
        default:
            return null
    }
}


export default SettingDetails = ({ navigation, route }) => {
    const { setting } = route.params
    const goBack = () => navigation.goBack()
    return (
        <SafeAreaView style={globalStyle.screen}>
            {setting === 'potentials' ? <OnboardingOverlay onboarding='potentialTypes' icon={'onboarding-stars'} pack='cp' /> : null}
            <Setting
                goBack={goBack}
                setting={setting} />
        </SafeAreaView>
    )
}