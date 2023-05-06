import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { ExportOverview } from '../../features/settings/export'

export default ExportOverviewScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView
            style={globalStyle.screen}>
            <ExportOverview />
        </SafeAreaView>
    )
}