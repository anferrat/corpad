import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ItemView from '../../features/import/item/item/Item'
import ImportButton from '../../features/import/ImportButton'
import { globalStyle } from '../../styles/styles'
import FileData from '../../features/import/item/item/FileData'

export default ImportDetails = ({ route, navigation }) => {
    const navigateToList = (itemType) => {
        navigation.navigate('PipelineSurvey', { screen: itemType === 'TEST_POINT' ? 'TestPoints' : (itemType === 'RECTIFIER' ? 'Rectifiers' : 'Pipelines') })
    }
    const navigateToSpreadsheet = (uri, title) => navigation.navigate('Spreadsheet', { uri: uri, title: title })
    return (
        <View style={globalStyle.screen}>
            <ScrollView contentContainerStyle={{ paddingBottom: 72 }}>
                <FileData
                    navigateToSpreadsheet={navigateToSpreadsheet}
                />
                <ItemView />
            </ScrollView>
            <ImportButton
                navigateToList={navigateToList} />
        </View>
    )
}