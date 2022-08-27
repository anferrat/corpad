import React from 'react'
import { androidStyle } from '../styles/GlobalStyle'
import { View, ScrollView } from 'react-native'
import TopBar from '../components/Import/TopBar'
import SelectItem from '../components/Import/SelectItem'
import SelectFile from '../components/Import/SelectFile'
import NextButton from '../components/Import/NextButton'



export default ImportItem = ({ route, navigation }) => {
    const goBack = () => navigation.goBack()
    const navigateToDetails = () => navigation.navigate('ImportDetails')
    return (
        <View style={androidStyle.AndroidSafeArea}>
            <TopBar goBack={goBack} />
            <ScrollView contentContainerStyle={{paddingBottom: 72}}>
                <SelectItem />
                <SelectFile />

            </ScrollView>
            <NextButton
                onPress={navigateToDetails}
            />
        </View>
    )
}