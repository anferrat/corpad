import React from 'react'
import { androidStyle } from '../styles/GlobalStyle'
import { SafeAreaView } from 'react-native'
import DefaultNames from '../components/Settings/DefaultNames/DefaultNames'
import RefCells from '../components/Settings/ReferenceCells/RefCells'
import Potentials from '../components/Settings/PotentialFields/Potentials'
import ExportSurvey from '../components/Settings/ExportSurvey/ExportSurvey'
import SurveyInfo from '../components/Settings/SurveyInfo/SurveyInfo'
import OnboardingOverlay from '../components/Modals/Onboarding/OnboardingOverlay'
import ExportedFilesList from '../components/Settings/ExportedFiles/ExportedFilesList'

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
            return <ExportedFilesList {...props}/>
        default:
            return null
    }
}


export default SettingDetails = ({ navigation, route }) => {
    const { setting } = route.params
    const goBack = () => navigation.goBack()
    return (
        <SafeAreaView style={androidStyle.AndroidSafeArea}>
            {setting === 'potentials' ? <OnboardingOverlay onboarding='potentialTypes' icon={'onboarding-stars'} pack='cp' /> : null}
            <Setting
                goBack={goBack}
                setting={setting} />
        </SafeAreaView>
    )
}