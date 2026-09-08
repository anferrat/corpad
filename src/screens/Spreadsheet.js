import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyle } from '../styles/styles'
import { SpreadsheetViewer } from '../features/spreadsheet_viewer'

export default SpreadsheetScreen = ({ route }) => {
    const { uri } = route.params
    return (
        <SafeAreaView style={globalStyle.screen} edges={['left', 'right', 'bottom']}>
            <SpreadsheetViewer
                uri={uri} />
        </SafeAreaView>
    )
}
