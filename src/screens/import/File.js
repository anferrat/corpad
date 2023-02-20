import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { FilePickerImport } from '../../features/import/file'

export default ImportFilePicker = ({ navigation, route }) => {
    const navigateToImportItem = (itemType) => navigation.navigate('ImportItem', { itemType: itemType, subitemIndex: null, subitemType: null }) // itemtype for header 
    const navigateToSpreadsheet = (uri, title) => navigation.navigate('Spreadsheet', { uri: uri, title: title })
    const navigateToList = (itemType) =>
        navigation.navigate('PipelineSurvey',
            { screen: itemType === 'TEST_POINT' ? 'TestPoints' : (itemType === 'RECTIFIER' ? 'Rectifiers' : 'Pipelines') })
    return (
        <SafeAreaView style={globalStyle.screen}>
            <FilePickerImport
                navigateToList={navigateToList}
                navigateToImportItem={navigateToImportItem}
                navigateToSpreadsheet={navigateToSpreadsheet} />
        </SafeAreaView>
    )
}