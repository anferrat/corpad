import React from 'react'
import { globalStyle } from '../../styles/styles'
import { View, ScrollView } from 'react-native'
import TopBar from '../../features/import/TopBar'
import SelectItem from '../../features/import/SelectItem'
import SelectFile from '../../features/import/file/SelectFile'
import MainActionButton from '../../components/ActionButton'



export default ImportItem = ({ route, navigation }) => {
    const goBack = () => navigation.goBack()
    const navigateToImportItem = () => navigation.navigate('ImportItem')
    return (
        <View style={globalStyle.screen}>
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