import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { ExportOverview } from '../../features/settings/export'

export default ExportOverviewScreen = ({ navigation, route }) => {
    const navigateToExportItem = () => navigation.navigate('PipelineSurvey')
    return (
        <SafeAreaView
            style={globalStyle.screen}>
            <ExportOverview
                navigateToExportItem={navigateToExportItem} />
        </SafeAreaView>
    )
}