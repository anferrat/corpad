import React from 'react'
import { SearchBar } from '../features/survey_search/index'
import { SafeAreaProvider } from 'react-native-safe-area-context'


export default SearchModalScreen = ({ navigation }) => {
    const navigateToView = (id, itemType) => navigation.navigate('ViewItem', { itemId: id, itemType: itemType })
    return (
        <SafeAreaProvider>
            <SearchBar
                navigateToView={navigateToView} />
        </SafeAreaProvider>
    )
}