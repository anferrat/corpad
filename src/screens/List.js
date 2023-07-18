import React from 'react'
import { globalStyle } from '../styles/styles'
import { View, StyleSheet } from 'react-native'
import DataLoaderList from '../features/list/body/DataLoaderList'
import { control } from '../styles/colors'

export default TestPointsScreen = ({ route, navigation }) => {
    const { itemType } = route.params
    const navigateToView = (id) => navigation.navigate('ViewItem', { itemId: id, itemType: itemType })
    return (
        <View style={globalStyle.screen}>
            <View style={styles.filler} />
            <DataLoaderList
                itemType={itemType}
                navigateToView={navigateToView} />
        </View>
    )
}

const styles = StyleSheet.create({
    filler: { //fills the gap of sticky header when pushed down
        position: 'absolute',
        height: 40,
        width: '100%',
        backgroundColor: control
    }
})