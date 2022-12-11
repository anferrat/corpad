import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyle } from '../styles/styles'
import { SpreadsheetViewer } from '../features/spreadsheet_viewer'

export default SpreadsheetScreen = ({ route }) => {
    const { uri } = route.params
    return (
        <SafeAreaView style={globalStyle.screen}>
            <SpreadsheetViewer
                uri={uri} />
        </SafeAreaView>
    )
}