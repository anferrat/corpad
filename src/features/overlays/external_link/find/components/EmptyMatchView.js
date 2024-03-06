import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'


const EmptyMatchView = () => {
    return (
        <View style={styles.container}>
            <Text
                category='s2'
                appearance='hint'>
                No mathes found.
            </Text>
        </View>
    )
}

export default EmptyMatchView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 24
    },
})