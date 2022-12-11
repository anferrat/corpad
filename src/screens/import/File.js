import React from 'react'
import { globalStyle } from '../../styles/styles'
import { View, ScrollView, StatusBar } from 'react-native'
import SelectItem from '../../features/import/file/SelectItem'
import SelectFile from '../../features/import/file/SelectFile'
import NextButton from '../../features/import/file/NextButton'

export default ImportItem = ({ route, navigation }) => {
    const navigateToImportItem = (itemType) => navigation.navigate('ImportItem', { itemType: itemType })
    const navigateToSpreadsheet = (uri, title) => navigation.navigate('Spreadsheet', { uri: uri, title: title })
    return (
        <View style={globalStyle.screen}>
            <StatusBar barStyle={'light-content'} />
            <ScrollView contentContainerStyle={{ paddingBottom: 72, flex: 1 }}>
                <SelectItem />
                <SelectFile
                    navigateToSpreadsheet={navigateToSpreadsheet}
                />
                <NextButton
                    onPress={navigateToImportItem}
                />
            </ScrollView>
        </View>
    )
}