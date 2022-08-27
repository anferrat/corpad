import React from 'react'
import { androidStyle } from '../styles/GlobalStyle'
import { View } from 'react-native'
import TopBar from '../components/Import/TopBar'
import ItemView from '../components/Import/Details/item/ItemView'
import ImportButton from '../components/Import/Details/item/ImportButton'
import { ScrollView } from 'react-native-gesture-handler'


export default ImportDetails = ({ route, navigation }) => {
    const navigateToList = (itemType) => {
        navigation.navigate('PipelineSurvey', { screen: itemType === 'TEST_POINT' ? 'TestPoints' : (itemType === 'RECTIFIER' ? 'Rectifiers' : 'Pipelines') })
    }
    return (
        <View style={androidStyle.AndroidSafeArea}>
            <TopBar goBack={navigation.goBack} />
            <ScrollView contentContainerStyle={{ paddingBottom: 72 }}>
                <ItemView />
            </ScrollView>
            <ImportButton
                navigateToList={navigateToList} />
        </View>
    )
}