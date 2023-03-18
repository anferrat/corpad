import React from 'react'
import SearchBar from '../features/survey_search/SearchBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyle } from '../styles/styles'

export default SearchModalScreen = ({ navigation }) => {
    const navigateToItemView = (id, itemType) => navigation.navigate('ViewItem', { itemId: id, itemType: itemType })
    const goBack = () => navigation.goBack()
    return (
        <SafeAreaView style={globalStyle.screen}>
            <SearchBar
                navigateToItemView={navigateToItemView}
                goBack={goBack}
            />
        </SafeAreaView>
    )
}