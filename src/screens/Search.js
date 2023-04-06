import React from 'react'
import { SearchBar } from '../features/survey_search/index'
import { SafeAreaView } from 'react-native'
import { globalStyle } from '../styles/styles'

export default SearchModalScreen = ({ navigation }) => {
    const navigateToView = (id, itemType) => navigation.navigate('ViewItem', { itemId: id, itemType: itemType })
    return (
        <SafeAreaView style={globalStyle.screen}>
            <SearchBar
                navigateToView={navigateToView} />
        </SafeAreaView>
    )
}