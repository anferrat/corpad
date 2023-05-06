import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { DefaultNames } from '../../features/settings/default_names/index'
import { ReferenceCells } from '../../features/settings/reference_cells/index'
import { PotentialTypes } from '../../features/settings/potentials/index'
import { SurveyOverview } from '../../features/settings/info/index'
import { ExportedFilesList } from '../../features/settings/exported_files/'
import About from '../../features/settings/about/About'
import { OnboardingOverlayPotentialtypes } from '../../features/overlays/onboarding'

const Setting = (props) => {
    switch (props.setting) {
        case 'defaultNames':
            return <DefaultNames {...props} />
        case 'refCells':
            return <ReferenceCells {...props} />
        case 'potentials':
            return <PotentialTypes {...props} />
        case 'info':
            return <SurveyOverview {...props} />
        case 'exportedFiles':
            return <ExportedFilesList {...props} />
        case 'about':
            return <About {...props} />
        default:
            return null
    }
}


export default SettingDetails = ({ navigation, route }) => {
    const { setting } = route.params
    const goBack = () => navigation.goBack()
    const navigateToLicenses = () => navigation.navigate('Licenses')
    const navigateToSpreadsheet = (uri, title) => navigation.navigate('Spreadsheet', { title: title, uri: uri })
    return (
        <SafeAreaView style={globalStyle.screen}>
            <OnboardingOverlayPotentialtypes
                visible={setting === 'potentials'} />
            <Setting
                navigateToSpreadsheet={navigateToSpreadsheet}
                navigateToLicenses={navigateToLicenses}
                goBack={goBack}
                setting={setting} />
        </SafeAreaView>
    )
}