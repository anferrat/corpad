import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'


const ListItem = ({ title, value }) => {
    return (
        <View
            style={styles.container}>
            <Text
                style={styles.title}
                appearance='hint'
                category='s2'>
                {title}
            </Text>
            <Text
                style={styles.value}
                catgory={'p1'}>
                {value}
            </Text>
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 35,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        textTransform: 'uppercase',
    },
    value: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})