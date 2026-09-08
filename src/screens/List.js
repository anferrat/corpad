import React from 'react'
import { globalStyle } from '../styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import DataLoaderList from '../features/list/body/DataLoaderList'

export default TestPointsScreen = ({ route, navigation }) => {
    const { itemType } = route.params
    const navigateToView = (id) => navigation.navigate('ViewItem', { itemId: id, itemType: itemType })
    return (
        <SafeAreaView style={globalStyle.screen} edges={['left', 'right']}>
            <DataLoaderList
                itemType={itemType}
                navigateToView={navigateToView} />
        </SafeAreaView>
    )
}
