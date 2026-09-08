import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ExportItem } from '../../features/settings/export'

export default ExportItemScreen = ({ navigation, route }) => {
    const navigateToExportPotentials = () => navigation.navigate('ExportPotentials')
    const navigateToExportSubitems = () => navigation.navigate('ExportSubitems')
    const navigateToExportOverview = () => navigation.navigate('ExportOverview')
    return (
        <SafeAreaView style={globalStyle.screen} edges={['left', 'right', 'bottom']}>
            <ExportItem
                navigateToExportPotentials={navigateToExportPotentials}
                navigateToExportOverview={navigateToExportOverview}
                navigateToExportSubitems={navigateToExportSubitems} />
        </SafeAreaView>
    )
}
