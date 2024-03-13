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
import Multimeter from '../../features/settings/multimeter/scan'
import MultimeterSettings from '../../features/settings/multimeter/cycle_settings'
import ExternalLinkSettings from '../../features/settings/external_links'

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
        case 'multimeter':
            return <Multimeter {...props} />
        case 'multimeter_cycle':
            return <MultimeterSettings {...props} />
        case 'externalLinks':
            return <ExternalLinkSettings {...props} />
        default:
            return null
    }
}


export default SettingDetails = ({ navigation, route }) => {
    const { setting } = route.params
    const goBack = () => navigation.goBack()
    const navigateToLicenses = () => navigation.navigate('Licenses')
    const navigateToMultimeterCycleSettings = () => navigation.navigate('CycleSettings')
    const navigateToSpreadsheet = (uri, title) => navigation.navigate('Spreadsheet', { title: title, uri: uri })
    const navigateToExternalLink = (link, shouldLog) => navigation.navigate('ExternalLink', { link, shouldLog })
    return (
        <SafeAreaView style={globalStyle.screen}>
            <OnboardingOverlayPotentialtypes
                visible={setting === 'potentials'} />
            <Setting
                navigateToMultimeterCycleSettings={navigateToMultimeterCycleSettings}
                navigateToSpreadsheet={navigateToSpreadsheet}
                navigateToLicenses={navigateToLicenses}
                navigateToExternalLink={navigateToExternalLink}
                goBack={goBack}
                setting={setting} />
        </SafeAreaView>
    )
}