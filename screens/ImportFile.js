import React from 'react'
import { androidStyle } from '../styles/GlobalStyle'
import { View, ScrollView } from 'react-native'
import TopBar from '../components/Import/TopBar'
import SelectItem from '../components/Import/SelectItem'
import SelectFile from '../components/Import/file/SelectFile'
import MainActionButton from '../components/_Stateless/MainActionButton'



export default ImportItem = ({ route, navigation }) => {
    const goBack = () => navigation.goBack()
    const navigateToImportItem = () => navigation.navigate('ImportItem')
    return (
        <View style={androidStyle.AndroidSafeArea}>
            <TopBar goBack={goBack} />
            <ScrollView contentContainerStyle={{ paddingBottom: 72 }}>
                <SelectItem />
                <SelectFile />
                <MainActionButton
                    disabled={false}
                    title='Next'
                    valid={true}
                    onPress={navigateToImportItem} />
            </ScrollView>
        </View>
    )
}