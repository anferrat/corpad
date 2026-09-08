import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ExportSubitems } from '../../features/settings/export'

export default ExportSubitemsScreen = ({ navigation, route }) => {
    const navigateToExportOverview = () => navigation.navigate('ExportOverview')
    return (
        <SafeAreaView style={globalStyle.screen} edges={['left', 'right', 'bottom']}>
            <ExportSubitems
                navigateToExportOverview={navigateToExportOverview} />
        </SafeAreaView>
    )
}
