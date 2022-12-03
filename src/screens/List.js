import React from 'react'
import { globalStyle } from '../styles/styles'
import { View } from 'react-native'
import DataLoaderList from '../features/list/body/DataLoaderList'
import ListHeader from '../features/list/header/header/ListHeader'

export default TestPointsScreen = ({ route, navigation }) => {
    const { dataType } = route.params
    const navigateToView = (id) => navigation.navigate('ViewItem', { itemId: id, dataTypeItem: dataType })
    return (
        <View style={globalStyle.screen}>
            <ListHeader dataType={dataType} />
            <DataLoaderList
                dataType={dataType}
                navigateToView={navigateToView} />
        </View>
    )
}