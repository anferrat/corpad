import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import TopBar from '../../features/import/TopBar'
import ItemView from '../../features/import/item/Item'
import ImportButton from '../../features/import/ImportButton'
import { globalStyle } from '../../styles/styles'

export default ImportDetails = ({ route, navigation }) => {
    const navigateToList = (itemType) => {
        navigation.navigate('PipelineSurvey', { screen: itemType === 'TEST_POINT' ? 'TestPoints' : (itemType === 'RECTIFIER' ? 'Rectifiers' : 'Pipelines') })
    }

    return (
        <View style={globalStyle.screen}>
            <TopBar goBack={navigation.goBack} />
            <ScrollView contentContainerStyle={{ paddingBottom: 72 }}>
                <ItemView />
            </ScrollView>
            <ImportButton
                navigateToList={navigateToList} />
        </View>
    )
}