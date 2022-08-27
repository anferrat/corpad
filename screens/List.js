import React from 'react'
import { androidStyle } from '../styles/GlobalStyle'
import { View } from 'react-native'
import DataLoaderList from '../components/List/DataLoaderList'
import ListHeader from '../components/List/ListHeader'

export default TestPointsScreen = ({ route, navigation }) => {
    const { dataType } = route.params
    const navigateToView = (id) => navigation.navigate('ViewItem', { itemId: id, dataTypeItem: dataType })
    return (
        <View style={androidStyle.AndroidSafeArea}>
            <ListHeader dataType={dataType} />
            <DataLoaderList
                dataType={dataType}
                navigateToView={navigateToView} />
        </View>
    )
}