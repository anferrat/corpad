import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ExportOverview } from '../../features/settings/export'

export default ExportOverviewScreen = ({ navigation, route }) => {
    const navigateToExportItem = () => navigation.navigate('PipelineSurvey')
    return (
        <SafeAreaView
            style={globalStyle.screen}
            edges={['left', 'right', 'bottom']}>
            <ExportOverview
                navigateToExportItem={navigateToExportItem} />
        </SafeAreaView>
    )
}
