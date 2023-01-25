import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { FilePickerImport } from '../../features/import/file'

export default ImportFilePicker = ({ navigation, route }) => {
    const navigateToImportItem = (itemType) => navigation.navigate('ImportItem', { itemType: itemType, subitemIndex: null, subitemType: null }) // itemtype for header 
    const navigateToSpreadsheet = (uri, title) => navigation.navigate('Spreadsheet', { uri: uri, title: title })
    
    return (
        <SafeAreaView style={globalStyle.screen}>
            <FilePickerImport
                navigateToImportItem={navigateToImportItem}
                navigateToSpreadsheet={navigateToSpreadsheet} />
        </SafeAreaView>
    )
}