import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text } from '@ui-kitten/components'


const EmptyHistoryReadingListComponent = () => {
    return (
        <View
            style={styles.container}>
            <Text
                appearance='hint'
                category='p1'>No saved readings
            </Text>
        </View>
    )
}


export default EmptyHistoryReadingListComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Dimensions.get('screen').height / 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
})