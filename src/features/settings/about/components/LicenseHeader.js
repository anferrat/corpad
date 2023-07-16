import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'


const ListHeader = () => {
    return (
        <View
            style={styles.container}>
            <Text
                category='h3'
                style={styles.header}>
                Third Party Notices
            </Text>
        </View>
    )
}

export default ListHeader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingBottom: 12,
        paddingTop: 12
    },
})