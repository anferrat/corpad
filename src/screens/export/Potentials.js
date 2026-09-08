import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ExportPotentials } from '../../features/settings/export'

export default ExportPotentialsScreen = ({ navigation, route }) => {
    const navigateToExportSubitems = () => navigation.navigate('ExportSubitems')
    return (
        <SafeAreaView style={globalStyle.screen} edges={['left', 'right', 'bottom']}>
            <ExportPotentials
                navigateToExportSubitems={navigateToExportSubitems} />
        </SafeAreaView>
    )
}
