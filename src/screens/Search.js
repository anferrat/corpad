import React from 'react'
import SearchBar from '../features/survey_search/SearchBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyle } from '../styles/styles'

export default SearchModalScreen = ({ navigation }) => {
    const navigateToItemView = (id, dataType) => navigation.navigate('ViewItem', { itemId: id, dataTypeItem: dataType })
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